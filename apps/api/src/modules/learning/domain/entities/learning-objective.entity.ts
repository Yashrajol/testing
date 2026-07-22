export interface LearningObjectiveProps {
  id: string;
  lessonId: string;
  title: string;
  bloomsTaxonomy: string;
  difficulty: string;
  estimatedMinutes?: number | null;
  skills?: string[];
  competencies?: string[];
  prerequisites?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class LearningObjectiveEntity {
  constructor(private readonly props: LearningObjectiveProps) {}

  get id(): string { return this.props.id; }
  get lessonId(): string { return this.props.lessonId; }
  get title(): string { return this.props.title; }
  get bloomsTaxonomy(): string { return this.props.bloomsTaxonomy; }
  get difficulty(): string { return this.props.difficulty; }
  get estimatedMinutes(): number | null | undefined { return this.props.estimatedMinutes; }
  get skills(): string[] | undefined { return this.props.skills; }
  get competencies(): string[] | undefined { return this.props.competencies; }
  get prerequisites(): string[] | undefined { return this.props.prerequisites; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}
