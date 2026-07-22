export abstract class BaseEntity<TId = string> {
  protected readonly _id: TId;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt?: Date | null;

  constructor(id: TId, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null) {
    this._id = id;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
    this._deletedAt = deletedAt ?? null;
  }

  get id(): TId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null | undefined {
    return this._deletedAt;
  }

  get isDeleted(): boolean {
    return !!this._deletedAt;
  }
}
