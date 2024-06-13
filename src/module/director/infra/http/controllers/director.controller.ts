import { ICreateDirectorDto } from 'src/module/director/dto/create-director.dto';
import { CreateDirectorUseCase } from 'src/module/director/use-cases/create-director';
import { ShowDirectorUseCase } from 'src/module/director/use-cases/show-director';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';

const updateDirectorBody = z.object({
  name: z.string(),
  director_id: z.string().uuid(),
});

const createDirectorBody = z.object({
  name: z.string(),
});

type UpdateDirectorBody = z.infer<typeof updateDirectorBody>;
type CreateDirectorBody = z.infer<typeof createDirectorBody>;

@Controller('director')
export class DirectorController {
  constructor(
    private readonly createDirectorUseCase: CreateDirectorUseCase,
    private readonly showDirectorUseCase: ShowDirectorUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDirectorBody))
  create(@Body() createDirectorDto: CreateDirectorBody) {
    return this.createDirectorUseCase.execute(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.showDirectorUseCase.execute();
  }
}
