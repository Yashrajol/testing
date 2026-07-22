import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileMetadata {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  uploadedAt: Date;
}

export interface IStorageDriver {
  upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata>;
  getSignedUrl(filename: string, expiresInSeconds?: number): Promise<string>;
  delete(filename: string): Promise<void>;
}

@Injectable()
export class LocalStorageDriver implements IStorageDriver {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = process.env.LOCAL_STORAGE_DIR || path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    const filePath = path.join(this.uploadDir, filename);
    await fs.promises.writeFile(filePath, file);
    return {
      filename,
      mimeType,
      sizeBytes: file.length,
      url: `/uploads/${filename}`,
      uploadedAt: new Date(),
    };
  }

  async getSignedUrl(filename: string, _expiresInSeconds = 3600): Promise<string> {
    return `/uploads/${filename}`;
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.uploadDir, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

@Injectable()
export class StorageService {
  constructor(private readonly driver: LocalStorageDriver) {}

  async uploadFile(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    return this.driver.upload(file, filename, mimeType);
  }

  async getSignedUrl(filename: string, expiresInSeconds = 3600): Promise<string> {
    return this.driver.getSignedUrl(filename, expiresInSeconds);
  }

  async deleteFile(filename: string): Promise<void> {
    return this.driver.delete(filename);
  }
}
