import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DbModule } from './db/db.module'
import { databaseProviders } from './db/database.providers'

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
