import { DataSource } from 'typeorm';

import { Genre } from './infra/typeorm/entities/genre.entity';

export const genreProviders = [
  {
    provide: 'GENRE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
    inject: ['DATA_SOURCE'],
  },
];
