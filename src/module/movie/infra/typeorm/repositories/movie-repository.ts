import { ICreateMovieDto } from 'src/module/movie/dto/create-movie.dto';
import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Movie } from '../entities/movie.entity';

export class MovieRepository implements IMovieRepository {
  private ormRepository: Repository<Movie>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Movie);
  }

  public async create(data: ICreateMovieDto): Promise<Movie> {
    const movie = this.ormRepository.create(data);

    await this.ormRepository.save(movie);

    return movie;
  }
  public async show(): Promise<Movie[]> {
    const movies = await this.ormRepository.find({
      relations: ['genre', 'director'],
    });

    return movies;
  }
  public async findById(movie_id: string): Promise<Movie | null> {
    const movie = this.ormRepository.findOne({
      where: {
        id: movie_id,
      },
    });

    return movie;
  }

  public async findByTitle(title: string): Promise<Movie | null> {
    const movie = this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return movie;
  }

  public async save(data: Movie): Promise<Movie> {
    const movie = this.ormRepository.create(data);

    await this.ormRepository.save(movie);

    return movie;
  }
  public async delete(movie_id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id: movie_id });

    return result;
  }
}
