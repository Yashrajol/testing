import { ApiProperty } from '@nestjs/swagger';

export class ParentDashboardResponseDto {
  @ApiProperty({ example: 'parent-123' })
  parentId!: string;

  @ApiProperty({ example: 'Aarav Sharma' })
  childName!: string;

  @ApiProperty({ example: 95.4 })
  attendancePercentage!: number;

  @ApiProperty({ example: 88.5 })
  averageAssessmentScore!: number;

  @ApiProperty({ example: { primaryStyle: 'VISUAL', masteryScore: 84.5 } })
  learningDna!: any;

  @ApiProperty({ example: { score: 845, growthRate: 14.2 } })
  vedhkritIndex!: any;

  @ApiProperty({ example: ['Encourage practice for upcoming Mid-Term Assessment'] })
  recommendations!: string[];
}
