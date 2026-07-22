export interface CareerProfileProps {
  id: string;
  studentId: string;
  topMatches?: any;
  skillRadar?: any;
  competencyRadar?: any;
  careerReadiness: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CareerProfileEntity {
  constructor(private readonly props: CareerProfileProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get topMatches(): any { return this.props.topMatches; }
  get skillRadar(): any { return this.props.skillRadar; }
  get competencyRadar(): any { return this.props.competencyRadar; }
  get careerReadiness(): number { return this.props.careerReadiness; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
