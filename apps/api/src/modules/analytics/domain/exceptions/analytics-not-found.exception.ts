export class AnalyticsNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Analytics data not found for identifier: ${identifier}`);
    this.name = 'AnalyticsNotFoundException';
  }
}
