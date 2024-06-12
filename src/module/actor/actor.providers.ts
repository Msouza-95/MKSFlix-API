import { DataSource } from 'typeorm';

import { Actor } from './infra/typeorm/entities/actor.entity';

export const actorProviders = [
  {
    provide: 'ACTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Actor),
    inject: ['DATA_SOURCE'],
  },
];
