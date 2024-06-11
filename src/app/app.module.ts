import { DbModule } from 'src/db/db.module';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DbModule, UserModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
