import { DataSource } from 'typeorm';

import { Cast } from './infra/typeorm/entities/cast.entity';

export const castProviders = [
  {
    provide: 'CAST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cast),
    inject: ['DATA_SOURCE'],
  },
];
