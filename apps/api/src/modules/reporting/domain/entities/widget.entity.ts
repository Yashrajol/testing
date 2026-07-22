export interface WidgetProps {
  id: string;
  dashboardId: string;
  title: string;
  type: string;
  metricKey: string;
  chartType: string;
  gridPosition?: any;
  config?: any;
  createdAt: Date;
  updatedAt: Date;
}

export class WidgetEntity {
  constructor(private readonly props: WidgetProps) {}

  get id(): string { return this.props.id; }
  get dashboardId(): string { return this.props.dashboardId; }
  get title(): string { return this.props.title; }
  get type(): string { return this.props.type; }
  get metricKey(): string { return this.props.metricKey; }
  get chartType(): string { return this.props.chartType; }
  get gridPosition(): any { return this.props.gridPosition; }
  get config(): any { return this.props.config; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
