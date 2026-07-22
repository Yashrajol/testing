import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string; // e.g. "createdAt:desc"

  @IsOptional()
  @IsString()
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextCursor?: string;
  };
}

export class PaginationUtil {
  static createPaginatedResponse<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
    nextCursor?: string,
  ): PaginatedResult<T> {
    const totalPages = Math.ceil(total / limit);
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextCursor,
      },
    };
  }
}
