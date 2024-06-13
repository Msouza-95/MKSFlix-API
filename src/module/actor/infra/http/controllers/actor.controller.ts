import { ICreateActorDto } from 'src/module/actor/dto/create-actor.dto';
import { CreateActorUseCase } from 'src/module/actor/use-cases/create-actor';
import { DeleteActorUseCase } from 'src/module/actor/use-cases/delete-actor';
import { ShowActorUseCase } from 'src/module/actor/use-cases/show-actor';
import { UpdateActorUseCase } from 'src/module/actor/use-cases/update-actor';
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

const updateActorBody = z.object({
  name: z.string(),
  actor_id: z.string().uuid(),
});

const createActorBody = z.object({
  name: z.string(),
});

type UpdateActorBody = z.infer<typeof updateActorBody>;
type CreateActorBody = z.infer<typeof createActorBody>;

@Controller('actor')
export class ActorController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase,
    private readonly showActorUseCase: ShowActorUseCase,
    private readonly deleteActorUseCase: DeleteActorUseCase,
    private readonly updateActorUseCase: UpdateActorUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createActorBody))
  create(@Body() createActorDto: CreateActorBody) {
    return this.createActorUseCase.execute(createActorDto);
  }

  @Get()
  findAll() {
    return this.showActorUseCase.execute();
  }
  @Put()
  @UsePipes(new ZodValidationPipe(updateActorBody))
  update(@Body() updateActorBody: UpdateActorBody) {
    return this.updateActorUseCase.execute(updateActorBody);
  }
  @Delete(':actor_id')
  delete(@Param('actor_id') actor_id: string) {
    return this.deleteActorUseCase.execute(actor_id);
  }
}
