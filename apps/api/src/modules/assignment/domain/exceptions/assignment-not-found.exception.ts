export class AssignmentNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Assignment entity not found for identifier: ${identifier}`);
    this.name = 'AssignmentNotFoundException';
  }
}
