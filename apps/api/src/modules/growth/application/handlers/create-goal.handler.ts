import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN, GoalStatus } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { CreateGoalCommand } from '../commands/create-goal.command';
import { GoalResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';

@Injectable()
export class CreateGoalHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(command: CreateGoalCommand): Promise<GoalResponseDto> {
    const created = await this.repo.createGoal({
      studentId: command.dto.studentId,
      title: command.dto.title,
      description: command.dto.description,
      targetDate: command.dto.targetDate ? new Date(command.dto.targetDate) : undefined,
      progress: 0,
      status: GoalStatus.ON_TRACK,
    });
    return GrowthMapper.toGoalDto(created);
  }
}
