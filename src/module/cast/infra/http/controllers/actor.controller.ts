import { ICreateActorDto } from 'src/module/actor/dto/create-actor.dto';
import { CreateActorUseCase } from 'src/module/actor/use-cases/create-actor';
import { DeleteActorUseCase } from 'src/module/actor/use-cases/delete-actor';
import { ShowActorUseCase } from 'src/module/actor/use-cases/show-actor';
import { UpdateActorUseCase } from 'src/module/actor/use-cases/update-actor';
import { CreateCastUseCase } from 'src/module/cast/use-cases/create-cast';
import { DeleteCastUseCase } from 'src/module/cast/use-cases/delete-cast';
import { ShowCastUseCase } from 'src/module/cast/use-cases/show-cast';
import { UpdateCastUseCase } from 'src/module/cast/use-cases/update-cast';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

interface ICreaterCastBody {
  role: string;
  actor_id: string;
  movie_id: string;
}

interface IUpdateCastBody {
  role: string;
  actor_id: string;
  movie_id: string;
  cast_id: string;
}

@Controller('casts')
export class CastController {
  constructor(
    private readonly createCastUseCase: CreateCastUseCase,
    private readonly showCastUseCase: ShowCastUseCase,
    private readonly deleteCastUseCase: DeleteCastUseCase,
    private readonly updateCastUseCase: UpdateCastUseCase,
  ) {}

  @Post()
  create(@Body() createCastDto: ICreaterCastBody) {
    return this.createCastUseCase.execute(createCastDto);
  }

  @Get()
  findAll() {
    return this.showCastUseCase.execute();
  }
  @Put()
  update(@Body() updateCastBody: IUpdateCastBody) {
    return this.updateCastUseCase.execute(updateCastBody);
  }
  @Delete(':cast_id')
  delete(@Param('cast_id') cast_id: string) {
    return this.deleteCastUseCase.execute(cast_id);
  }
}
