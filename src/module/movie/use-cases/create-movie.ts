import IDirectorRepository from 'src/module/director/repositories/I-director-repository';
import IGenreRepository from 'src/module/genre/repositories/I-genre-repository';

import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../infra/typeorm/entities/movie.entity';
import IMovieRepository from '../repositories/I-movie-repository';

interface IRequest {
  title: string;
  year: number;
  duration: number;
  synopsis: string;
  genre_id: string;
  director_id: string;
}

@Injectable()
export class CreateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
    @Inject('IGenreRepository')
    private genreRepositoy: IGenreRepository,
    @Inject('IDirectorRepository')
    private directorRepositoy: IDirectorRepository,
  ) {}
  async execute({
    title,
    director_id,
    year,
    duration,
    synopsis,
    genre_id,
  }: IRequest): Promise<Movie | void> {
    const movie = await this.movieRepositoy.findByTitle(title);
    if (movie) {
      throw new ConflictException('The movie already exist ');
    }
    const genre = await this.genreRepositoy.findById(genre_id);
    if (!genre) {
      throw new ConflictException("The genre d'not exist");
    }
    const director = await this.directorRepositoy.findById(director_id);
    if (!director) {
      throw new ConflictException("The director d'not exist");
    }
    const newMovie = await this.movieRepositoy.create({
      title,
      year,
      duration,
      synopsis,
      genre_id,
      director_id,
    });
    await this.movieRepositoy.save(newMovie);
    return newMovie;
  }
}
