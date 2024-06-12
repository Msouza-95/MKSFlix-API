import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { MovieController } from './infra/http/controllers';
import { MovieRepository } from './infra/typeorm/repositories';
import { movieProviders } from './movie.providers';
import { CreateMovieUseCase } from './use-cases/create-movie';
import { ShowMovieUseCase } from './use-cases/show-movie';

@Module({
  imports: [DbModule],
  controllers: [MovieController],

  providers: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
    ...movieProviders,
    CreateMovieUseCase,
    ShowMovieUseCase,
  ],
  exports: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}
