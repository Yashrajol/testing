import { ApiProperty } from '@nestjs/swagger';

export class TeacherDashboardResponseDto {
  @ApiProperty({ example: 'teacher-123' })
  teacherId!: string;

  @ApiProperty({ example: ['Grade 10 - Section A', 'Grade 9 - Section B'] })
  assignedClasses!: string[];

  @ApiProperty({ example: 92.8 })
  classAttendanceAverage!: number;

  @ApiProperty({ example: 3 })
  pendingAssessmentsToGrade!: number;

  @ApiProperty({ example: 5 })
  pendingAssignmentsToEvaluate!: number;

  @ApiProperty({ example: [{ studentName: 'Rohan Verma', riskScore: 78, weakTopic: 'DP' }] })
  weakStudents!: any[];

  @ApiProperty({ example: { averageMastery: 86.2, completionRate: 91.5 } })
  classAnalytics!: any;

  @ApiProperty({ example: ['Class 10A submitted 25 assignments', 'New curriculum chapter added'] })
  notifications!: string[];
}
