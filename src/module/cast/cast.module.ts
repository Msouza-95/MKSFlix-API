import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { castProviders } from './cast.providers';
import { CastController } from './infra/http/controllers';
import { CastRepository } from './infra/typeorm/repositories';
import { CreateCastUseCase } from './use-cases/create-cast';
import { DeleteCastUseCase } from './use-cases/delete-cast';
import { ShowCastUseCase } from './use-cases/show-cast';
import { UpdateCastUseCase } from './use-cases/update-cast';

@Module({
  imports: [DbModule],
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
