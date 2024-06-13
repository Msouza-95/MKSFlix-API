import { CreateGenreUseCase } from 'src/module/genre/use-cases/create-genre';
import { ShowGenreUseCase } from 'src/module/genre/use-cases/show-genre';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const updateGenreBody = z.object({
  name: z.string(),
  director_id: z.string().uuid(),
});

const createGenreBody = z.object({
  name: z.string(),
});

type UpdateGenreBody = z.infer<typeof updateGenreBody>;
type CreateGenreBody = z.infer<typeof createGenreBody>;

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
  constructor(
    private readonly createGenreUseCase: CreateGenreUseCase,
    private readonly showGenreUseCase: ShowGenreUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createGenreBody))
  create(@Body() createGenreDto: CreateGenreBody) {
    return this.createGenreUseCase.execute(createGenreDto);
  }

  @Get()
  findAll() {
    return this.showGenreUseCase.execute();
  }
}
