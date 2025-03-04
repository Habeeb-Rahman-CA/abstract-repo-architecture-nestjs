import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config(); // Load environment variables from .env file
console.log(join(__dirname, 'src', 'database', 'entities', '*.entity.{ts,js}'));
const databaseUrl = process.env.DATABASE_URL;
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  entities: [join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')], 
  synchronize: false,
  
});
