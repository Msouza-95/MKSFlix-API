import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { UserController } from './infra/http/controllers';
import { UserRepositoy } from './infra/typeorm/repositories';
import { CreateUserUseCase } from './use-cases/create-user';
import { userProviders } from './user.providers';

@Module({
  imports: [DbModule],
  controllers: [UserController],

  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy,
    },
    ...userProviders,
    CreateUserUseCase,
  ],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy,
    },
  ],
})
export class UserModule {}
