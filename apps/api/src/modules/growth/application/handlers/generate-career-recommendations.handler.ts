import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { GenerateCareerRecommendationsCommand } from '../commands/generate-career-recommendations.command';
import { CareerProfileResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';
import { CareerRecommendationsUpdatedEvent } from '../../domain/events/career-recommendations-updated.event';

@Injectable()
export class GenerateCareerRecommendationsHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(command: GenerateCareerRecommendationsCommand): Promise<{ result: CareerProfileResponseDto; event: CareerRecommendationsUpdatedEvent }> {
    const topMatches = [
      {
        role: 'Full Stack Engineer',
        matchPercentage: 94,
        requiredSkills: ['TypeScript', 'Node.js', 'System Design', 'SQL'],
        matchingSkills: ['TypeScript', 'Node.js', 'SQL'],
        suggestedCourses: ['Advanced System Design', 'Distributed Systems'],
      },
      {
        role: 'Data Scientist',
        matchPercentage: 88,
        requiredSkills: ['Python', 'Machine Learning', 'Linear Algebra', 'Statistics'],
        matchingSkills: ['Python', 'Statistics'],
        suggestedCourses: ['Applied Machine Learning', 'Data Pipelines'],
      },
    ];

    const skillRadar = {
      Coding: 88,
      ProblemSolving: 92,
      SystemDesign: 80,
      Communication: 78,
      Mathematics: 86,
    };

    const competencyRadar = {
      Algorithms: 90,
      DataStructures: 94,
      DatabaseOptimization: 85,
      CleanArchitecture: 88,
    };

    const updated = await this.repo.upsertCareerProfile(command.studentId, {
      topMatches,
      skillRadar,
      competencyRadar,
      careerReadiness: 91.0,
    });

    const event = new CareerRecommendationsUpdatedEvent(
      command.studentId,
      topMatches[0].role,
      topMatches[0].matchPercentage,
    );

    return {
      result: GrowthMapper.toCareerDto(updated),
      event,
    };
  }
}
