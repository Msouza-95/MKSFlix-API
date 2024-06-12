import { ICreateGenreDto } from 'src/module/genre/dto/create-genre.dto';
import { CreateGenreUseCase } from 'src/module/genre/use-cases/create-genre';
import { ShowGenreUseCase } from 'src/module/genre/use-cases/show-genre';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('genre')
export class GenreController {
  constructor(
    private readonly createGenreUseCase: CreateGenreUseCase,
    private readonly showGenreUseCase: ShowGenreUseCase,
  ) {}

  @Post()
  create(@Body() createGenreDto: ICreateGenreDto) {
    return this.createGenreUseCase.execute(createGenreDto);
  }

  @Get()
  findAll() {
    return this.showGenreUseCase.execute();
  }
}
