import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { ListGoalsQuery } from '../queries/list-goals.query';
import { GoalResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';

@Injectable()
export class ListGoalsHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(query: ListGoalsQuery): Promise<GoalResponseDto[]> {
    const items = await this.repo.findGoalsByStudentId(query.studentId);
    return items.map((g) => GrowthMapper.toGoalDto(g));
  }
}
