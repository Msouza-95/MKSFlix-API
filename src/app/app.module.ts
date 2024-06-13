import { DbModule } from 'src/db/db.module';
import { ActorModule } from 'src/module/actor/actor.module';
import { CastModule } from 'src/module/cast/cast.module';
import { DirectorModule } from 'src/module/director/director.module';
import { GenreModule } from 'src/module/genre/genre.module';
import { MovieModule } from 'src/module/movie/movie.module';
import { Review } from 'src/module/review/infra/typeorm/entities/review.entity';
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
    Review,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
