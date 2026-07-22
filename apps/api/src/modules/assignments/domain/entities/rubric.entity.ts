export interface RubricCriterionProps {
  id: string;
  rubricId: string;
  title: string;
  description?: string | null;
  maxPoints: number;
  weightage: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class RubricCriterionEntity {
  constructor(private readonly props: RubricCriterionProps) {}

  get id(): string { return this.props.id; }
  get rubricId(): string { return this.props.rubricId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get maxPoints(): number { return this.props.maxPoints; }
  get weightage(): number { return this.props.weightage; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface RubricProps {
  id: string;
  assignmentId: string;
  title: string;
  description?: string | null;
  totalMaxPoints: number;
  criteria?: RubricCriterionProps[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class RubricEntity {
  constructor(private readonly props: RubricProps) {}

  get id(): string { return this.props.id; }
  get assignmentId(): string { return this.props.assignmentId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get totalMaxPoints(): number { return this.props.totalMaxPoints; }
  get criteria(): RubricCriterionEntity[] {
    return (this.props.criteria || []).map((c) => new RubricCriterionEntity(c));
  }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}
