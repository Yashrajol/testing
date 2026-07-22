import { BaseProfileProps } from '../../types/identity.types';

export interface StudentProfileProps extends BaseProfileProps {
  admissionNumber?: string | null;
  rollNumber?: string | null;
  organizationId?: string | null;
  schoolId?: string | null;
  grade?: string | null;
  schoolName?: string | null;
  parentLinkId?: string | null;
  batchId?: string | null;
}

export class StudentProfileEntity {
  constructor(private readonly props: StudentProfileProps) {}

  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get firstName(): string | null | undefined { return this.props.firstName; }
  get middleName(): string | null | undefined { return this.props.middleName; }
  get lastName(): string | null | undefined { return this.props.lastName; }
  get fullName(): string {
    return [this.props.firstName, this.props.middleName, this.props.lastName].filter(Boolean).join(' ');
  }
  get gender(): string | null | undefined { return this.props.gender; }
  get dateOfBirth(): Date | null | undefined { return this.props.dateOfBirth; }
  get profilePhoto(): string | null | undefined { return this.props.profilePhoto; }
  get address(): string | null | undefined { return this.props.address; }
  get emergencyContact(): string | null | undefined { return this.props.emergencyContact; }
  get bloodGroup(): string | null | undefined { return this.props.bloodGroup; }
  get nationality(): string | null | undefined { return this.props.nationality; }
  get language(): string | null | undefined { return this.props.language; }
  get timezone(): string | null | undefined { return this.props.timezone; }
  get metadata(): Record<string, any> | null | undefined { return this.props.metadata; }

  get admissionNumber(): string | null | undefined { return this.props.admissionNumber; }
  get rollNumber(): string | null | undefined { return this.props.rollNumber; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get schoolId(): string | null | undefined { return this.props.schoolId; }
  get grade(): string | null | undefined { return this.props.grade; }
  get schoolName(): string | null | undefined { return this.props.schoolName; }
  get parentLinkId(): string | null | undefined { return this.props.parentLinkId; }
  get batchId(): string | null | undefined { return this.props.batchId; }

  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}
