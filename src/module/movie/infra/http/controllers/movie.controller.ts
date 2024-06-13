import { Cast } from 'src/module/cast/infra/typeorm/entities/cast.entity';
import { CreateMovieUseCase } from 'src/module/movie/use-cases/create-movie';
import { DeleteMovieUseCase } from 'src/module/movie/use-cases/delete-movie';
import { FindCastMovieUseCase } from 'src/module/movie/use-cases/find-cast-movie';
import { ShowMovieUseCase } from 'src/module/movie/use-cases/show-movie';
import { UpdateMovieUseCase } from 'src/module/movie/use-cases/update-movie';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UsePipes,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
@ApiTags('Movie')
export class MovieController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly showMovieUseCase: ShowMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly deleteMovieCase: DeleteMovieUseCase,
    private readonly findCastMovieUseCase: FindCastMovieUseCase,
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

  // @Put()
  @UsePipes(new ZodValidationPipe(updateMovieBody))
  update(@Body() updateMovie: UpdateMovieBody) {
    return this.updateMovieUseCase.execute(updateMovie);
  }
  @Delete(':movie_id')
  delete(@Param('movie_id') movie_id: string) {
    return this.deleteMovieCase.execute({ movie_id });
  }

  @Get('cast/:movie_id')
  async findCast(@Param('movie_id') movie_id: string): Promise<Cast[]> {
    return this.findCastMovieUseCase.execute({ movie_id });
  }
}
