import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/infra/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

export function createConnection(host = 'localhost'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
