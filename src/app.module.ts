import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './db/database.providers';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
