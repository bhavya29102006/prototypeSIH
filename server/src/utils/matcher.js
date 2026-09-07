// Server-side Skill Fit Matching Algorithm

export const calculateMatchScore = (candidateSkills = {}, requiredSkills = {}) => {
  if (!requiredSkills || Object.keys(requiredSkills).length === 0) return 100;

  let totalWeight = 0;
  let earnedWeight = 0;

  Object.entries(requiredSkills).forEach(([skillName, requiredLevel]) => {
    totalWeight += requiredLevel;
    const candidateLevel = candidateSkills[skillName] || 0;
    earnedWeight += Math.min(candidateLevel, requiredLevel);
  });

  if (totalWeight === 0) return 100;
  return Math.round((earnedWeight / totalWeight) * 100);
};
