export interface KnowledgeNode {
  topicId: string;
  topicTitle: string;
  masteryLevel: number; // 0-100
  prerequisitesMet: boolean;
}

export interface SkillItem {
  skillName: string;
  proficiencyScore: number; // 0-100
  evidenceCount: number;
}

export interface CompetencyItem {
  competencyName: string;
  level: 'NOVICE' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  verifiedAt: Date;
}

export interface PersonalizedRecommendation {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}
