import { ConnectorType } from '../../constants/integrations.constants';

export interface ConnectorProps {
  id: string;
  name: string;
  type: ConnectorType;
  category: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ConnectorEntity {
  constructor(private readonly props: ConnectorProps) {}

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get type(): ConnectorType { return this.props.type; }
  get category(): string { return this.props.category; }
  get description(): string | null | undefined { return this.props.description; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
