export class UpdateOrganizationCommand {
  constructor(
    public readonly id: string,
    public readonly updates: Partial<{
      name: string;
      legalName: string | null;
      registrationNumber: string | null;
      taxNumber: string | null;
      logoUrl: string | null;
      website: string | null;
      email: string | null;
      phone: string | null;
      address: string | null;
      timezone: string;
      locale: string;
      currency: string;
      featureFlags: Record<string, any>;
      metadata: Record<string, any>;
    }>,
    public readonly updatedBy?: string,
  ) {}
}
