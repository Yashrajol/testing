import { BaseProfileProps } from '../../types/identity.types';

export interface MentorProfileProps extends BaseProfileProps {
  expertise?: string[];
  yearsOfExperience?: number | null;
  resumeUrl?: string | null;
  approvalStatus?: string;
  approvedAt?: Date | null;
}

export class MentorProfileEntity {
  constructor(private readonly props: MentorProfileProps) {}

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

  get expertise(): string[] | undefined { return this.props.expertise; }
  get yearsOfExperience(): number | null | undefined { return this.props.yearsOfExperience; }
  get resumeUrl(): string | null | undefined { return this.props.resumeUrl; }
  get approvalStatus(): string | undefined { return this.props.approvalStatus; }
  get approvedAt(): Date | null | undefined { return this.props.approvedAt; }

  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}
