import { ICreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { CreateMovieUseCase } from 'src/movie/use-cases/create-movie';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  constructor(private readonly createMovieUseCase: CreateMovieUseCase) {}

  @Post()
  create(@Body() createMovieDto: ICreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Get()
  findAll() {
    return [];
  }
}