import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { directorProviders } from './director.providers';
import { DirectorController } from './infra/http/controllers';
import { DirectorRepository } from './infra/typeorm/repositories/director-repository';
import { CreateDirectorUseCase } from './use-cases/create-director';
import { ShowDirectorUseCase } from './use-cases/show-director';

@Module({
  imports: [DbModule],
  controllers: [DirectorController],

  providers: [
    {
      provide: 'IDirectorRepository',
      useClass: DirectorRepository,
    },
    ...directorProviders,
    CreateDirectorUseCase,
    ShowDirectorUseCase,
  ],
  exports: [
    {
      provide: 'IDirectorRepository',
      useClass: DirectorRepository,
    },
  ],
})
export class DirectorModule {}
