export class AssessmentNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Assessment entity not found for identifier: ${identifier}`);
    this.name = 'AssessmentNotFoundException';
  }
}
