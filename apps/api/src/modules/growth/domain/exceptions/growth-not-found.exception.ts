export class GrowthNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Growth entity not found for identifier: ${identifier}`);
    this.name = 'GrowthNotFoundException';
  }
}
