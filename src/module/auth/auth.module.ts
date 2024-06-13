import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
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
})
export class AuthModule {}
