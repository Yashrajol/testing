import { ApiProperty } from '@nestjs/swagger';

export class StudentDashboardResponseDto {
  @ApiProperty({ example: 'student-123' })
  studentId!: string;

  @ApiProperty({ example: 'Aarav Sharma' })
  studentName!: string;

  @ApiProperty({ example: 95.4 })
  attendancePercentage!: number;

  @ApiProperty({ example: 4 })
  enrolledCoursesCount!: number;

  @ApiProperty({ example: [{ title: 'Intro to Algorithms', time: '10:00 AM' }] })
  todaysLessons!: any[];

  @ApiProperty({ example: [{ title: 'Mid-Term Physics Assessment', dueDate: '2026-08-01' }] })
  upcomingAssessments!: any[];

  @ApiProperty({ example: { pending: 2, completed: 15 } })
  assignmentStatus!: any;

  @ApiProperty({ example: { primaryStyle: 'VISUAL', masteryScore: 84.5 } })
  learningDna!: any;

  @ApiProperty({ example: { score: 845, growthRate: 14.2 } })
  vedhkritIndex!: any;

  @ApiProperty({ example: [{ role: 'Full Stack Engineer', matchPercentage: 94 }] })
  careerMatches!: any[];

  @ApiProperty({ example: ['Revise Graph Traversal', 'Practice DP'] })
  recommendations!: string[];

  @ApiProperty({ example: ['Assignment 3 evaluated (A+)', 'New lesson uploaded'] })
  notifications!: string[];
}
