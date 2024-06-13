import IDirectorRepository from 'src/module/director/repositories/I-director-repository';
import IGenreRepository from 'src/module/genre/repositories/I-genre-repository';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
  movie_id: string;
}

@Injectable()
export class UpdateMovieUseCase {
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
    movie_id,
  }: IRequest): Promise<Movie> {
    const movie = await this.movieRepositoy.findById(movie_id);

    if (!movie) {
      throw new NotFoundException("The movie d'not found");
    }

    const genre = await this.genreRepositoy.findById(genre_id);

    if (!genre) {
      throw new NotFoundException("The genre d'not exist");
    }

    const director = await this.directorRepositoy.findById(director_id);

    if (!director) {
      throw new NotFoundException("The director d'not exist");
    }

    // caso for alterar o title do movie precisa garantir que não tenha outro já com nome que deseja alterar
    if (movie.title !== title) {
      const findMovie = await this.movieRepositoy.findByTitle(title);
      if (findMovie) {
        throw new ConflictException('The title of movie already exist ');
      }
    }

    movie.title = title;
    movie.year = year;
    movie.duration = duration;
    movie.synopsis = synopsis;
    movie.director = director;
    movie.genre = genre;

    await this.movieRepositoy.save(movie);

    return movie;
  }
}
