import { CreateMovieUseCase } from 'src/module/movie/use-cases/create-movie';
import { ShowMovieUseCase } from 'src/module/movie/use-cases/show-movie';
import { UpdateMovieUseCase } from 'src/module/movie/use-cases/update-movie';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import { Controller, Get, Post, Body, Put, UsePipes } from '@nestjs/common';

const createMovieBody = z.object({
  title: z.string(),
  director_id: z.string().uuid(),
  year: z.number(),
  duration: z.number(),
  synopsis: z.string(),
  genre_id: z.string().uuid(),
});

const updateMovieBody = z.object({
  title: z.string(),
  director_id: z.string().uuid(),
  year: z.number(),
  duration: z.number(),
  synopsis: z.string(),
  genre_id: z.string().uuid(),
  movie_id: z.string().uuid(),
});

type CreateMovieBody = z.infer<typeof createMovieBody>;
type UpdateMovieBody = z.infer<typeof updateMovieBody>;

@Controller('movies')
export class MovieController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly showMovieUseCase: ShowMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createMovieBody))
  create(@Body() createMovie: CreateMovieBody) {
    return this.createMovieUseCase.execute(createMovie);
  }

  @Get()
  findAll() {
    return this.showMovieUseCase.execute();
  }

  @Put()
  @UsePipes(new ZodValidationPipe(updateMovieBody))
  update(@Body() updateMovie: UpdateMovieBody) {
    return this.updateMovieUseCase.execute(updateMovie);
  }
}
