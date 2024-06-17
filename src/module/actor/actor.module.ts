import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { actorProviders } from './actor.providers';
import { ActorController } from './infra/http/controllers';
import { ActorRepository } from './infra/typeorm/repositories';
import { CreateActorUseCase } from './use-cases/create-actor';
import { DeleteActorUseCase } from './use-cases/delete-actor';
import { ShowActorUseCase } from './use-cases/show-actor';
import { UpdateActorUseCase } from './use-cases/update-actor';

@Module({
  imports: [DbModule],
  controllers: [ActorController],

  providers: [
    {
      provide: 'IActorRepository',
      useClass: ActorRepository,
    },
    ...actorProviders,
    ShowActorUseCase,
    CreateActorUseCase,
    UpdateActorUseCase,
    DeleteActorUseCase,
  ],
  exports: [
    {
      provide: 'IActorRepository',
      useClass: ActorRepository,
    },
  ],
})
export class ActorModule {}
