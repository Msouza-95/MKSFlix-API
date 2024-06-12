import { ICreateMovieDto } from 'src/module/movie/dto/create-movie.dto';
import { CreateMovieUseCase } from 'src/module/movie/use-cases/create-movie';
import { ShowMovieUseCase } from 'src/module/movie/use-cases/show-movie';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly showMovieUseCase: ShowMovieUseCase,
  ) {}

  @Post()
  create(@Body() createMovieDto: ICreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Get()
  findAll() {
    return this.showMovieUseCase.execute();
  }
}
