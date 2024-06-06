import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrations: ['src/db/migrations/*{.ts,.js}'],
})
