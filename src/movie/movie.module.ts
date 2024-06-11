import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { MovieController } from './infra/http/controllers';
import { MovieRepository } from './infra/typeorm/repositories';
import { movieProviders } from './movie.providers';
import { CreateMovieUseCase } from './use-cases/create-movie';

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
  ],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}
