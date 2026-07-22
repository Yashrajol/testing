import { LearningEntityType } from '../../constants/learning.constants';

export class LearningNotFoundException extends Error {
  constructor(entityType: LearningEntityType, identifier: string) {
    super(`${entityType} not found for identifier: ${identifier}`);
    this.name = 'LearningNotFoundException';
  }
}
