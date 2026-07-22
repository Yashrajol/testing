export interface VedhkritIndexProps {
  id: string;
  studentId: string;
  score: number;
  growthRate: number;
  readinessLevel: string;
  createdAt: Date;
  updatedAt: Date;
}

export class VedhkritIndexEntity {
  constructor(private readonly props: VedhkritIndexProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get score(): number { return this.props.score; }
  get growthRate(): number { return this.props.growthRate; }
  get readinessLevel(): string { return this.props.readinessLevel; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
