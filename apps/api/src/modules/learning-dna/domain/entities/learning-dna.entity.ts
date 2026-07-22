export interface LearningDnaProps {
  id: string;
  studentId: string;
  primaryLearningStyle: string;
  preferredMode: string;
  masteryScore: number;
  growthScore: number;
  confidenceScore: number;
  retentionScore: number;
  riskScore: number;
  knowledgeGraph?: any;
  skillProfile?: any;
  competencyProfile?: any;
  recommendations?: any;
  lastCalculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class LearningDnaEntity {
  constructor(private readonly props: LearningDnaProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get primaryLearningStyle(): string { return this.props.primaryLearningStyle; }
  get preferredMode(): string { return this.props.preferredMode; }
  get masteryScore(): number { return this.props.masteryScore; }
  get growthScore(): number { return this.props.growthScore; }
  get confidenceScore(): number { return this.props.confidenceScore; }
  get retentionScore(): number { return this.props.retentionScore; }
  get riskScore(): number { return this.props.riskScore; }
  get knowledgeGraph(): any { return this.props.knowledgeGraph; }
  get skillProfile(): any { return this.props.skillProfile; }
  get competencyProfile(): any { return this.props.competencyProfile; }
  get recommendations(): any { return this.props.recommendations; }
  get lastCalculatedAt(): Date { return this.props.lastCalculatedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
