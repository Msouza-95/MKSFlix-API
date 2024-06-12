import { ICreateActorDto } from 'src/module/actor/dto/create-actor.dto';
import { CreateActorUseCase } from 'src/module/actor/use-cases/create-actor';
import { DeleteActorUseCase } from 'src/module/actor/use-cases/delete-actor';
import { ShowActorUseCase } from 'src/module/actor/use-cases/show-actor';
import { UpdateActorUseCase } from 'src/module/actor/use-cases/update-actor';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

interface IUpdateActorBody {
  name: string;
  actor_id: string;
  movie_id: string;
}

@Controller('casts')
export class CastController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase,
    private readonly showActorUseCase: ShowActorUseCase,
    private readonly deleteActorUseCase: DeleteActorUseCase,
    private readonly updateActorUseCase: UpdateActorUseCase,
  ) {}

  @Post()
  create(@Body() createActorDto: ICreateActorDto) {
    return this.createActorUseCase.execute(createActorDto);
  }

  @Get()
  findAll() {
    return this.showActorUseCase.execute();
  }
  @Put()
  update(@Body() updateActorBody: IUpdateActorBody) {
    return this.updateActorUseCase.execute(updateActorBody);
  }
  @Delete(':cast_id')
  delete(@Param('cast_id') cast_id: string) {
    return this.deleteActorUseCase.execute(cast_id);
  }
}
