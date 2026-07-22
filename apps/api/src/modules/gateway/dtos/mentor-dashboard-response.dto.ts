import { ApiProperty } from '@nestjs/swagger';

export class MentorDashboardResponseDto {
  @ApiProperty({ example: 'mentor-123' })
  mentorId!: string;

  @ApiProperty({ example: 12 })
  activeMenteesCount!: number;

  @ApiProperty({ example: [{ studentName: 'Aarav Sharma', nextSession: '2026-07-25 15:00' }] })
  upcomingSessions!: any[];

  @ApiProperty({ example: [{ studentName: 'Rohan Verma', targetCareer: 'Full Stack Engineer', matchPercentage: 94 }] })
  menteeCareerGoals!: any[];
}
