import { ICreateMovieDto } from 'src/module/movie/dto/create-movie.dto';
import { CreateMovieUseCase } from 'src/module/movie/use-cases/create-movie';
import { ShowMovieUseCase } from 'src/module/movie/use-cases/show-movie';
import { UpdateMovieUseCase } from 'src/module/movie/use-cases/update-movie';

import { Controller, Get, Post, Body, Put } from '@nestjs/common';

interface ICreateMovieBody {
  title: string;
  director_id: string;
  year: number;
  duration: number;
  synopsis: string;
  genre_id: string;
}
interface IUpdateMovieBody {
  title: string;
  director_id: string;
  year: number;
  duration: number;
  synopsis: string;
  genre_id: string;
  movie_id: string;
}

@Controller('movies')
export class MovieController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly showMovieUseCase: ShowMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Post()
  create(@Body() createMovie: ICreateMovieBody) {
    return this.createMovieUseCase.execute(createMovie);
  }

  @Get()
  findAll() {
    return this.showMovieUseCase.execute();
  }

  @Put()
  update(@Body() updateMovie: IUpdateMovieBody) {
    return this.updateMovieUseCase.execute(updateMovie);
  }
}
