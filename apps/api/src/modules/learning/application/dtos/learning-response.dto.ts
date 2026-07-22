import { LearningEntityType } from '../../constants/learning.constants';

export class LearningEntityResponseDto {
  id!: string;
  entityType!: LearningEntityType;
  title!: string;
  details?: Record<string, any>;
  createdAt!: Date;
  updatedAt!: Date;
}
