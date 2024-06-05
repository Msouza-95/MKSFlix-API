import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', // ou 'mysql', 'sqlite', etc.
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORTA), // ajuste a porta conforme necessário
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations', // Nome da tabela de migrações
    migrations: [__dirname + '/migrations/*{.ts,.js}'], // Diretório de migrações
    synchronize: false, // Defina como false para não sincronizar automaticamente as entidades com o banco de dados
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
