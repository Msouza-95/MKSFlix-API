/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '../migrations/*{.ts,.js}'],
        logging: true,
      })

      return dataSource.initialize()
    },
  },
]
