export * from './constants/identity.constants';
export * from './types/identity.types';

export * from './domain/entities/student-profile.entity';
export * from './domain/entities/teacher-profile.entity';
export * from './domain/entities/parent-profile.entity';
export * from './domain/entities/mentor-profile.entity';
export * from './domain/entities/staff-profile.entity';

export * from './domain/events/profile-created.event';
export * from './domain/events/profile-updated.event';
export * from './domain/events/profile-archived.event';
export * from './domain/exceptions/profile-not-found.exception';

export * from './repositories/identity.repository.interface';
export * from './repositories/identity.repository';

export * from './application/dtos/profile-request.dto';
export * from './application/dtos/profile-response.dto';
export * from './application/mappers/profile.mapper';

export * from './application/commands/create-profile.command';
export * from './application/commands/update-profile.command';
export * from './application/commands/archive-profile.command';
export * from './application/queries/get-profile.query';
export * from './application/queries/list-profiles.query';

export * from './application/handlers/create-profile.handler';
export * from './application/handlers/update-profile.handler';
export * from './application/handlers/archive-profile.handler';
export * from './application/handlers/get-profile.handler';
export * from './application/handlers/list-profiles.handler';

export * from './identity.providers';
export * from './identity.controller';
export * from './identity.module';
