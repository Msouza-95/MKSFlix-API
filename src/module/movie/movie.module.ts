import { DbModule } from 'src/db/db.module';

import { Module, forwardRef } from '@nestjs/common';

import { CastModule } from '../cast/cast.module';
import { DirectorModule } from '../director/director.module';
import { GenreModule } from '../genre/genre.module';
import { MovieController } from './infra/http/controllers';
import { MovieRepository } from './infra/typeorm/repositories';
import { movieProviders } from './movie.providers';
import { CreateMovieUseCase } from './use-cases/create-movie';
import { DeleteMovieUseCase } from './use-cases/delete-movie';
import { FindCastMovieUseCase } from './use-cases/find-cast-movie';
import { ShowMovieUseCase } from './use-cases/show-movie';
import { UpdateMovieUseCase } from './use-cases/update-movie';

@Module({
  imports: [
    forwardRef(() => CastModule),
    DbModule,
    GenreModule,
    DirectorModule,
  ],
  controllers: [MovieController],

  providers: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
    ...movieProviders,
    CreateMovieUseCase,
    ShowMovieUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    FindCastMovieUseCase,
  ],
  exports: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}
