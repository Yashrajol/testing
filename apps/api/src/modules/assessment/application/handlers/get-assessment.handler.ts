import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { GetAssessmentQuery } from '../queries/get-assessment.query';
import { AssessmentResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';
import { AssessmentNotFoundException } from '../../domain/exceptions/assessment-not-found.exception';

@Injectable()
export class GetAssessmentHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(query: GetAssessmentQuery): Promise<AssessmentResponseDto> {
    const entity = await this.repo.findAssessmentById(query.id);
    if (!entity) {
      throw new AssessmentNotFoundException(query.id);
    }
    return AssessmentMapper.toAssessmentDto(entity);
  }
}
