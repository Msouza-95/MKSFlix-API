import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateGenreDto } from '../dto/create-genre.dto';
import { Genre } from '../infra/typeorm/entities/genre.entity';
import IGenreRepository from '../repositories/I-genre-repository';

@Injectable()
export class CreateGenreUseCase {
  constructor(
    @Inject('IGenreRepository')
    private genreRepositoy: IGenreRepository,
  ) {}
  async execute({ name }: ICreateGenreDto): Promise<Genre> {
    const genre = await this.genreRepositoy.findByName(name);

    if (genre) {
      throw new ConflictException('The genre already exist ');
    }

    const newGenre = await this.genreRepositoy.create({
      name,
    });

    return newGenre;
  }
}
