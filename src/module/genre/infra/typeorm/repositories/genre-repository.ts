import { ICreateGenreDto } from 'src/module/genre/dto/create-genre.dto';
import IGenreRepository from 'src/module/genre/repositories/I-genre-repository';
import { DataSource, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Genre } from '../entities/genre.entity';

export class GenreRepository implements IGenreRepository {
  private ormRepository: Repository<Genre>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Genre);
  }

  public async create(data: ICreateGenreDto): Promise<Genre> {
    const genre = this.ormRepository.create(data);

    await this.ormRepository.save(genre);

    return genre;
  }
  public async show(): Promise<Genre[]> {
    const genre = await this.ormRepository.find();

    return genre;
  }
  public async findById(id: string): Promise<Genre | null> {
    const genre = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return genre;
  }

  findByName(name: string): Promise<Genre | null> {
    const genre = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return genre;
  }
}
