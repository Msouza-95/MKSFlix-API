import { DbModule } from 'src/db/db.module';
import { DirectorModule } from 'src/module/director/director.module';
import { MovieModule } from 'src/module/movie/movie.module';
import { UserModule } from 'src/module/user/user.module';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DbModule, UserModule, DirectorModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
