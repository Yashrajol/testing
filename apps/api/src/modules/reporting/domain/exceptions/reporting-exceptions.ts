export class ReportNotFoundException extends Error {
  constructor(id: string) {
    super(`Report not found: ${id}`);
    this.name = 'ReportNotFoundException';
  }
}

export class DashboardNotFoundException extends Error {
  constructor(idOrRole: string) {
    super(`Dashboard not found: ${idOrRole}`);
    this.name = 'DashboardNotFoundException';
  }
}

export class ExportJobNotFoundException extends Error {
  constructor(id: string) {
    super(`Export job not found: ${id}`);
    this.name = 'ExportJobNotFoundException';
  }
}

export class ExportGenerationFailedException extends Error {
  constructor(reason: string) {
    super(`Export generation failed: ${reason}`);
    this.name = 'ExportGenerationFailedException';
  }
}
