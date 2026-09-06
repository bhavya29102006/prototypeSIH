import React from 'react';

export const SkillRadarChart = ({
  skills = {},
  targetSkills = null,
  size = 440,
  className = ''
}) => {
  const keys = Object.keys(skills);
  const totalAxes = keys.length;
  if (totalAxes < 3) return <div className="p-4 text-slate-400">Need at least 3 skills to render radar chart.</div>;

  const center = size / 2;
  const radius = (size / 2) - 50;

  // Helper to compute (x, y) coordinates for an angle and distance
  const getCoordinates = (index, value) => {
    // angle in radians: start at top (-PI/2)
    const angle = (Math.PI * 2 / totalAxes) * index - (Math.PI / 2);
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate points string for polygon
  const studentPoints = keys.map((key, i) => {
    const val = skills[key] || 0;
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ');

  const targetPoints = targetSkills ? keys.map((key, i) => {
    const val = targetSkills[key] || 0;
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ') : null;

  // Concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [20, 40, 60, 80, 100];

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center subtle glow */}
        <circle cx={center} cy={center} r={radius} fill="url(#radarCenterGlow)" />

        {/* Concentric Grid Polygons */}
        {levels.map((lvl) => {
          const ringPoints = keys.map((_, i) => {
            const { x, y } = getCoordinates(i, lvl);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={lvl}>
              <polygon
                points={ringPoints}
                fill="none"
                stroke={lvl === 100 ? "#cbd5e1" : "#e2e8f0"}
                strokeWidth={lvl === 100 ? "1.5" : "1"}
                strokeDasharray={lvl === 100 ? "none" : "3,3"}
              />
              <text
                x={center + 4}
                y={center - (lvl / 100) * radius + 12}
                fontSize="10"
                fill="#94a3b8"
                className="select-none font-mono"
              >
                {lvl}%
              </text>
            </g>
          );
        })}

        {/* Spoke Axes */}
        {keys.map((key, i) => {
          const outer = getCoordinates(i, 100);
          const labelPos = getCoordinates(i, 118);

          let textAnchor = 'middle';
          if (labelPos.x > center + 20) textAnchor = 'start';
          if (labelPos.x < center - 20) textAnchor = 'end';

          return (
            <g key={key}>
              <line
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="#e2e8f0"
                strokeWidth="1.2"
              />
              <text
                x={labelPos.x}
                y={labelPos.y + 4}
                textAnchor={textAnchor}
                fontSize="11"
                fontWeight="600"
                fill="#334155"
                className="select-none"
              >
                {key.length > 20 ? key.slice(0, 18) + '...' : key}
              </text>
            </g>
          );
        })}

        {/* Target Benchmark Polygon (if provided) */}
        {targetPoints && (
          <polygon
            points={targetPoints}
            fill="rgba(245, 158, 11, 0.08)"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            className="transition-all duration-500"
          />
        )}

        {/* Student Verified Profile Polygon */}
        <polygon
          points={studentPoints}
          fill="url(#studentGradient)"
          stroke="#4f46e5"
          strokeWidth="2.5"
          className="transition-all duration-500"
        />

        {/* Student Data Nodes */}
        {keys.map((key, i) => {
          const val = skills[key] || 0;
          const { x, y } = getCoordinates(i, val);
          return (
            <g key={key} className="group">
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#4f46e5"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-300 hover:r-6 cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Chart Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 inline-block shadow-sm"></span>
          <span className="text-slate-700">Your Verified Skill Score</span>
        </div>
        {targetSkills && (
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-amber-500 inline-block"></span>
            <span className="text-amber-700">Industry Role Benchmark</span>
          </div>
        )}
      </div>
    </div>
  );
};
