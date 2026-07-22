export class OrganizationSlug {
  private readonly value: string;

  constructor(slug: string) {
    const formattedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    if (!formattedSlug || formattedSlug.length < 2) {
      throw new Error('Invalid organization slug format.');
    }
    this.value = formattedSlug;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: OrganizationSlug): boolean {
    return this.value === other.getValue();
  }
}
