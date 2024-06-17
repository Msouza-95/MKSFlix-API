import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './infra/http/controllers';
import { UserRepositoy } from './infra/typeorm/repositories';
import { CreateauthenticateUseCase } from './use-cases/create-authenticate';
import { CreateUserUseCase } from './use-cases/create-user';
import { ShowUserUseCase } from './use-cases/show-user';
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
    ShowUserUseCase,
    CreateauthenticateUseCase,
    JwtService,
  ],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy,
    },
    CreateUserUseCase,
  ],
})
export class UserModule {}
