import { ICreateMovieDto } from 'src/movie/dto/create-movie.dto';
import IMovieRepository from 'src/movie/repositories/I-movie-repository';
import { DataSource, Repository } from 'typeorm';

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
    const movies = await this.ormRepository.find();

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

  findByName(title: string): Promise<Movie | null> {
    const movie = this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return movie;
  }
}
