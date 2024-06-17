import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserRepositoy } from '../user/infra/typeorm/repositories';
import { CreateauthenticateUseCase } from '../user/use-cases/create-authenticate';
import { userProviders } from '../user/user.providers';
import { AuthController } from './infra/http/controllers';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DbModule,
    PassportModule,
    JwtModule.registerAsync({
      // inject: [ConfigService],
      global: true,
      useFactory: async () => {
        const privateKey = process.env.JWT_PRIVATE_KEY!;
        const publicKey = process.env.JWT_PUBLIC_KEY!;

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy,
    },
    ...userProviders,
    CreateauthenticateUseCase,
    JwtStrategy,
  ],
})
export class AuthModule {}
