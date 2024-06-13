import { CreateCastUseCase } from 'src/module/cast/use-cases/create-cast';
import { DeleteCastUseCase } from 'src/module/cast/use-cases/delete-cast';
import { ShowCastUseCase } from 'src/module/cast/use-cases/show-cast';
import { UpdateCastUseCase } from 'src/module/cast/use-cases/update-cast';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const createCastBody = z.object({
  role: z.string(),
  actor_id: z.string().uuid(),
  movie_id: z.string().uuid(),
});

const updateCastBody = z.object({
  role: z.string(),
  actor_id: z.string().uuid(),
  movie_id: z.string().uuid(),
  cast_id: z.string().uuid(),
});

type UpdateCastBody = z.infer<typeof updateCastBody>;
type CreateCastBody = z.infer<typeof createCastBody>;

@Controller('casts')
@ApiTags('cast')
export class CastController {
  constructor(
    private readonly createCastUseCase: CreateCastUseCase,
    private readonly showCastUseCase: ShowCastUseCase,
    private readonly deleteCastUseCase: DeleteCastUseCase,
    private readonly updateCastUseCase: UpdateCastUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCastBody))
  create(@Body() createCastDto: CreateCastBody) {
    return this.createCastUseCase.execute(createCastDto);
  }

  @Get()
  findAll() {
    return this.showCastUseCase.execute();
  }
  @Put()
  @UsePipes(new ZodValidationPipe(updateCastBody))
  update(@Body() updateCastBody: UpdateCastBody) {
    return this.updateCastUseCase.execute(updateCastBody);
  }
  @Delete(':cast_id')
  delete(@Param('cast_id') cast_id: string) {
    return this.deleteCastUseCase.execute(cast_id);
  }
}
