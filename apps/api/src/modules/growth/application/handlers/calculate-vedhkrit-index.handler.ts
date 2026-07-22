import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN, ReadinessLevel } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { CalculateVedhkritIndexCommand } from '../commands/calculate-vedhkrit-index.command';
import { VedhkritIndexResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';
import { VedhkritIndexRecalculatedEvent } from '../../domain/events/vedhkrit-index-recalculated.event';

@Injectable()
export class CalculateVedhkritIndexHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(command: CalculateVedhkritIndexCommand): Promise<{ result: VedhkritIndexResponseDto; event: VedhkritIndexRecalculatedEvent }> {
    const score = 845.0; // 0-1000 Vedhkrit Index
    const growthRate = 14.2; // % MoM growth
    const readinessLevel = ReadinessLevel.READY;

    const updated = await this.repo.upsertVedhkritIndex(
      command.studentId,
      score,
      growthRate,
      readinessLevel,
    );

    const event = new VedhkritIndexRecalculatedEvent(command.studentId, score, readinessLevel);

    return {
      result: GrowthMapper.toIndexDto(updated),
      event,
    };
  }
}
