import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { ListAssessmentsQuery } from '../queries/list-assessments.query';
import { AssessmentResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';

@Injectable()
export class ListAssessmentsHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(query: ListAssessmentsQuery): Promise<{ items: AssessmentResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findAssessments(query.options);
    return {
      items: items.map((entity) => AssessmentMapper.toAssessmentDto(entity)),
      total,
    };
  }
}
