import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../infra/typeorm/entities/movie.entity';
import IMovieRepository from '../repositories/I-movie-repository';

@Injectable()
export class ShowMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
  ) {}
  async execute(): Promise<Movie[]> {
    const movies = await this.movieRepositoy.show();

    return movies;
  }
}
