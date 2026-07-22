import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StorageConnector {
  private readonly logger = new Logger(StorageConnector.name);

  async uploadFile(integrationId: string, filename: string, content: Buffer): Promise<string> {
    this.logger.log(`[StorageConnector] Uploading file ${filename} to AWS S3 bucket`);
    return `https://s3.amazonaws.com/vedhkrit-user-storage/${integrationId}/${filename}`;
  }

  async deleteFile(integrationId: string, fileUrl: string): Promise<void> {
    this.logger.log(`[StorageConnector] Deleting S3 file at url ${fileUrl}`);
  }
}
