export class ProfileNotFoundException extends Error {
  constructor(userIdOrId: string) {
    super(`Profile not found for identifier: ${userIdOrId}`);
    this.name = 'ProfileNotFoundException';
  }
}
