import { InsightTargetAudience } from '../constants/growth.constants';

export interface CareerMatch {
  role: string;
  matchPercentage: number;
  requiredSkills: string[];
  matchingSkills: string[];
  suggestedCourses: string[];
}

export interface SkillRadarItem {
  skillName: string;
  score: number; // 0-100
}

export interface CompetencyRadarItem {
  competencyName: string;
  score: number; // 0-100
}

export interface GrowthInsight {
  audience: InsightTargetAudience;
  headline: string;
  summary: string;
  actionItems: string[];
}
