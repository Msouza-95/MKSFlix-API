import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { ActorModule } from '../actor/actor.module';
import { MovieModule } from '../movie/movie.module';
import { castProviders } from './cast.providers';
import { CastController } from './infra/http/controllers';
import { CastRepository } from './infra/typeorm/repositories';
import { CreateCastUseCase } from './use-cases/create-cast';
import { DeleteCastUseCase } from './use-cases/delete-cast';
import { ShowCastUseCase } from './use-cases/show-cast';
import { UpdateCastUseCase } from './use-cases/update-cast';

@Module({
  imports: [DbModule, ActorModule, MovieModule],
  controllers: [CastController],

  providers: [
    {
      provide: 'ICastRepository',
      useClass: CastRepository,
    },
    ...castProviders,
    ShowCastUseCase,
    CreateCastUseCase,
    UpdateCastUseCase,
    DeleteCastUseCase,
  ],
  exports: [
    {
      provide: 'ICastRepository',
      useClass: CastRepository,
    },
  ],
})
export class CastModule {}
