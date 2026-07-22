export interface RubricProps {
  id: string;
  assessmentId: string;
  criteriaName: string;
  maxPoints: number;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class RubricEntity {
  constructor(private readonly props: RubricProps) {}

  get id(): string { return this.props.id; }
  get assessmentId(): string { return this.props.assessmentId; }
  get criteriaName(): string { return this.props.criteriaName; }
  get maxPoints(): number { return this.props.maxPoints; }
  get description(): string | null | undefined { return this.props.description; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}
