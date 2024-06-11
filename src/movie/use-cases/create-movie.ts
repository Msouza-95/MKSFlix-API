import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../infra/typeorm/entities/movie.entity';
import IMovieRepository from '../repositories/I-movie-repository';

@Injectable()
export class CreateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
  ) {}
  async execute({
    title,
    director_id,
    releaseYear,
  }: ICreateMovieDto): Promise<Movie> {
    const movie = await this.movieRepositoy.findByName(title);

    if (movie) {
      throw new ConflictException('The movie already exist ');
    }

    const newMovie = await this.movieRepositoy.create({
      title,
      releaseYear,
      director_id,
    });

    return newMovie;
  }
}
