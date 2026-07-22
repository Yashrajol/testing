export * from './constants/academics.constants';
export * from './types/academics.types';

export * from './domain/entities/school.entity';
export * from './domain/entities/campus.entity';
export * from './domain/entities/academic-year.entity';
export * from './domain/entities/academic-term.entity';
export * from './domain/entities/class.entity';
export * from './domain/entities/section.entity';
export * from './domain/entities/subject.entity';
export * from './domain/entities/batch.entity';
export * from './domain/entities/enrollment.entity';

export * from './domain/events/academic-entity-created.event';
export * from './domain/events/academic-entity-updated.event';
export * from './domain/events/academic-entity-archived.event';
export * from './domain/exceptions/academic-not-found.exception';

export * from './repositories/academics.repository.interface';
export * from './repositories/academics.repository';

export * from './application/dtos/academics-request.dto';
export * from './application/dtos/academics-response.dto';
export * from './application/mappers/academics.mapper';

export * from './application/commands/create-academic-entity.command';
export * from './application/commands/update-academic-entity.command';
export * from './application/commands/archive-academic-entity.command';
export * from './application/queries/get-academic-entity.query';
export * from './application/queries/list-academic-entities.query';

export * from './application/handlers/create-academic-entity.handler';
export * from './application/handlers/update-academic-entity.handler';
export * from './application/handlers/archive-academic-entity.handler';
export * from './application/handlers/get-academic-entity.handler';
export * from './application/handlers/list-academic-entities.handler';

export * from './academics.providers';
export * from './academics.controller';
export * from './academics.module';
