import { Module } from '@nestjs/common';
import { AssignmentsModule } from '../assignments/assignments.module';

@Module({
  imports: [AssignmentsModule],
  exports: [AssignmentsModule],
})
export class AssignmentModule {}
