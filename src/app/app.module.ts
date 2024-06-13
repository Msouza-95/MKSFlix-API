import { DbModule } from 'src/db/db.module';
import { ActorModule } from 'src/module/actor/actor.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { CastModule } from 'src/module/cast/cast.module';
import { DirectorModule } from 'src/module/director/director.module';
import { GenreModule } from 'src/module/genre/genre.module';
import { MovieModule } from 'src/module/movie/movie.module';
import { ReviewModule } from 'src/module/review/review.module';
import { UserModule } from 'src/module/user/user.module';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DbModule,
    UserModule,
    DirectorModule,
    GenreModule,
    MovieModule,
    ActorModule,
    CastModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
