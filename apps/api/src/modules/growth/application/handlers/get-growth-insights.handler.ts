import { Injectable } from '@nestjs/common';
import { GetGrowthInsightsQuery } from '../queries/get-growth-insights.query';
import { GrowthInsightsResponseDto } from '../dtos/growth-response.dto';
import { InsightTargetAudience } from '../../constants/growth.constants';

@Injectable()
export class GetGrowthInsightsHandler {
  async execute(query: GetGrowthInsightsQuery): Promise<GrowthInsightsResponseDto> {
    const allInsights = [
      {
        audience: InsightTargetAudience.STUDENT,
        headline: 'Strong Acceleration in Data Structures',
        summary: 'Your quiz accuracy increased by 18% over the past month. Focus next on Dynamic Programming.',
        actionItems: ['Complete 3 DP challenges', 'Review Graph Traversal video'],
      },
      {
        audience: InsightTargetAudience.PARENT,
        headline: 'Consistently High Academic Engagement',
        summary: 'Your child maintained a 94% attendance rate and completed all 4 homework assignments on schedule.',
        actionItems: ['Encourage practice for upcoming Mid-Term Assessment'],
      },
      {
        audience: InsightTargetAudience.TEACHER,
        headline: 'Batch Mastery Exceeds 85%',
        summary: 'Grade 10 Section A shows high competency in Object-Oriented Programming principles.',
        actionItems: ['Schedule advanced workshop on Software Patterns'],
      },
      {
        audience: InsightTargetAudience.ORGANIZATION,
        headline: 'Institutional Growth Rate +14.2%',
        summary: 'Platform adoption across all campuses increased by 14.2% MoM with strong learner retention.',
        actionItems: ['Expand digital curriculum licensing to Campus B'],
      },
    ];

    const filtered = query.targetAudience
      ? allInsights.filter((i) => i.audience === query.targetAudience)
      : allInsights;

    return {
      studentId: query.studentId,
      insights: filtered,
      generatedAt: new Date(),
    };
  }
}
