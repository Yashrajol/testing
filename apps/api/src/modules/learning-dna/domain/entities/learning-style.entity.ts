export interface LearningStyleProps {
  primaryStyle: string;
  secondaryStyle?: string;
  preferredMode: string;
}

export class LearningStyleEntity {
  constructor(private readonly props: LearningStyleProps) {}

  get primaryStyle(): string { return this.props.primaryStyle; }
  get secondaryStyle(): string | undefined { return this.props.secondaryStyle; }
  get preferredMode(): string { return this.props.preferredMode; }
}
