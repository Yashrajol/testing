import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { CreateAssessmentCommand } from '../commands/create-assessment.command';
import { AssessmentResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';

@Injectable()
export class CreateAssessmentHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(command: CreateAssessmentCommand): Promise<AssessmentResponseDto> {
    const entity = await this.repo.createAssessment(command.dto);
    return AssessmentMapper.toAssessmentDto(entity);
  }
}
