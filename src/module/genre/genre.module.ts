import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { genreProviders } from './genre.providers';
import { GenreController } from './infra/http/controllers';
import { GenreRepository } from './infra/typeorm/repositories';
import { CreateGenreUseCase } from './use-cases/create-genre';
import { ShowGenreUseCase } from './use-cases/show-genre';

@Module({
  imports: [DbModule],
  controllers: [GenreController],

  providers: [
    {
      provide: 'IGenreRepository',
      useClass: GenreRepository,
    },
    ...genreProviders,
    ShowGenreUseCase,
    CreateGenreUseCase,
  ],
  exports: [
    {
      provide: 'IGenreRepository',
      useClass: GenreRepository,
    },
  ],
})
export class GenreModule {}
