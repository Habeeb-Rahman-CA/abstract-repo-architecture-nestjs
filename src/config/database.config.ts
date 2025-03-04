import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URL || '', // Ensure it doesn't return undefined
  synchronize: false,  // Avoid using `true` in production
  retryAttempts: 3,
  retryDelay: 3000,
  entities: [join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsRun: true,
}));
