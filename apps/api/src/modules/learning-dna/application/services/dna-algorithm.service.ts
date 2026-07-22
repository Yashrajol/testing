import { Injectable } from '@nestjs/common';

@Injectable()
export class DnaAlgorithmService {
  calculateMasteryScore(quizScores: number[], assignmentScores: number[]): number {
    const avgQuiz = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 70;
    const avgAssign = assignmentScores.length > 0 ? assignmentScores.reduce((a, b) => a + b, 0) / assignmentScores.length : 75;
    return Math.round(avgQuiz * 0.6 + avgAssign * 0.4);
  }

  calculateRetentionScore(daysSinceLastAttempt: number, baseAccuracy: number): number {
    const decayFactor = Math.exp(-0.03 * daysSinceLastAttempt);
    return Math.round(Math.min(100, Math.max(0, baseAccuracy * decayFactor)));
  }

  predictRiskScore(masteryScore: number, attendancePercentage: number, lateAssignmentsCount: number): { riskScore: number; riskLevel: string; reasons: string[] } {
    let riskScore = 0;
    const reasons: string[] = [];

    if (masteryScore < 60) {
      riskScore += 40;
      reasons.push('Low overall subject mastery (<60%)');
    }
    if (attendancePercentage < 75) {
      riskScore += 40;
      reasons.push('Below threshold attendance (<75%)');
    }
    if (lateAssignmentsCount > 2) {
      riskScore += 20;
      reasons.push('Multiple late assignment submissions');
    }

    const riskLevel = riskScore >= 50 ? 'HIGH' : riskScore >= 20 ? 'MEDIUM' : 'LOW';
    return { riskScore, riskLevel, reasons };
  }

  detectLearningStyle(interactiveAttempts: number, videoViews: number, textReads: number): { primaryStyle: string; preferredMode: string } {
    if (videoViews >= interactiveAttempts && videoViews >= textReads) {
      return { primaryStyle: 'VISUAL', preferredMode: 'CONCEPT_VIDEOS' };
    }
    if (interactiveAttempts >= textReads) {
      return { primaryStyle: 'KINESTHETIC', preferredMode: 'INTERACTIVE_PRACTICE' };
    }
    return { primaryStyle: 'READING_WRITING', preferredMode: 'TEXT_DOCUMENTATION' };
  }

  detectCompetencyGaps(competencyScores: Record<string, number>): Array<{ competencyName: string; level: string; score: number; gapAnalysis: string }> {
    return Object.entries(competencyScores).map(([name, score]) => {
      const level = score >= 90 ? 'EXPERT' : score >= 75 ? 'ADVANCED' : score >= 60 ? 'INTERMEDIATE' : 'NOVICE';
      const gapAnalysis = score < 75 ? `Requires focused remediation in ${name} fundamentals.` : `Competency target met for ${name}.`;
      return { competencyName: name, level, score, gapAnalysis };
    });
  }

  generateRecommendations(weakTopics: string[], riskLevel: string): Array<{ title: string; description: string; actionType: string; priority: string }> {
    const list: Array<{ title: string; description: string; actionType: string; priority: string }> = [];

    weakTopics.forEach((topic) => {
      list.push({
        title: `Remediate ${topic}`,
        description: `Review fundamental concepts and attempt 5 practice problems for ${topic}.`,
        actionType: 'REVISION',
        priority: riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM',
      });
    });

    if (list.length === 0) {
      list.push({
        title: 'Advance to Master Class',
        description: 'Excellent performance! Attempt higher difficulty challenge quizzes.',
        actionType: 'ADVANCED_LESSON',
        priority: 'LOW',
      });
    }

    return list;
  }
}
