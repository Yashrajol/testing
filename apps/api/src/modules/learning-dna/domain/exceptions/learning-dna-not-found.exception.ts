export class LearningDnaNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Learning DNA profile not found for identifier: ${identifier}`);
    this.name = 'LearningDnaNotFoundException';
  }
}
