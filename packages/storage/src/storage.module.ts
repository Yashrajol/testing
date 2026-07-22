import { Module, Global } from '@nestjs/common';
import { StorageService, LocalStorageDriver } from './storage.service';

@Global()
@Module({
  providers: [LocalStorageDriver, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
