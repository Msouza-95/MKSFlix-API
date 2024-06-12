import { Inject, Injectable } from '@nestjs/common';

import { Genre } from '../infra/typeorm/entities/genre.entity';
import IGenreRepository from '../repositories/I-genre-repository';

@Injectable()
export class ShowGenreUseCase {
  constructor(
    @Inject('IGenreRepository')
    private genreRepositoy: IGenreRepository,
  ) {}
  async execute(): Promise<Genre[]> {
    const genres = await this.genreRepositoy.show();

    return genres;
  }
}
