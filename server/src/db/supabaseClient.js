// Supabase PostgreSQL Client for Node.js / Express
// Uses native fetch to connect to Supabase PostgREST API with auto-fallback & circuit breaker

import dotenv from 'dotenv';
import dns from 'dns';
dotenv.config();

// Force IPv4 lookup first on Windows to avoid synthetic NAT64/IPv6 ENOTFOUND lookup glitches
if (dns.setDefaultResultOrder) {
  try {
    dns.setDefaultResultOrder('ipv4first');
  } catch (_) {}
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

let isTemporarilyOffline = false;
let offlineUntil = 0;
let lastOfflineLogTime = 0;

export const isSupabaseConfigured = () => {
  const hasCreds = Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.includes('supabase.co'));
  if (!hasCreds) return false;

  // If in circuit-breaker cooldown, check if time has elapsed
  if (isTemporarilyOffline) {
    if (Date.now() < offlineUntil) {
      return false; // Seamlessly use local fallback without blocking
    }
    // Cooldown ended; allow retry
    isTemporarilyOffline = false;
  }

  return true;
};

const handleNetworkFailure = (action, tableName, err) => {
  isTemporarilyOffline = true;
  offlineUntil = Date.now() + 20000; // 20s circuit-breaker to keep app fast & prevent terminal spam

  const now = Date.now();
  if (now - lastOfflineLogTime > 10000) {
    lastOfflineLogTime = now;
    const reason = err?.cause?.code || err?.code || (err?.name === 'TimeoutError' ? 'Timeout' : 'Network Offline');
    console.warn(`⚡ [Offline Fallback] Supabase unreachable (${reason}). Seamlessly using local database cache.`);
  }
};

const getHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
});

export const supabaseDb = {
  // Query table
  async select(tableName, queryParams = '') {
    if (!isSupabaseConfigured()) return null;
    try {
      const url = `${SUPABASE_URL}/rest/v1/${tableName}${queryParams ? `?${queryParams}` : ''}`;
      const res = await fetch(url, {
        headers: getHeaders(),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) {
        console.warn(`Supabase SELECT warning on ${tableName}: HTTP ${res.status}`);
        return null;
      }
      return await res.json();
    } catch (err) {
      handleNetworkFailure('select', tableName, err);
      return null;
    }
  },

  // Insert row into table
  async insert(tableName, record) {
    if (!isSupabaseConfigured()) return null;
    try {
      const url = `${SUPABASE_URL}/rest/v1/${tableName}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) {
        console.warn(`Supabase INSERT warning on ${tableName}: HTTP ${res.status}`);
        return null;
      }
      const data = await res.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      handleNetworkFailure('insert', tableName, err);
      return null;
    }
  },

  // Update row in table by filter
  async update(tableName, filterQuery, updates) {
    if (!isSupabaseConfigured()) return null;
    try {
      const url = `${SUPABASE_URL}/rest/v1/${tableName}?${filterQuery}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) {
        console.warn(`Supabase UPDATE warning on ${tableName}: HTTP ${res.status}`);
        return null;
      }
      const data = await res.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      handleNetworkFailure('update', tableName, err);
      return null;
    }
  }
};
