module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: ['dist/database/entities/*.entity.js'], // Use 'src' for TS, 'dist' for compiled JS
    migrations: ['dist/migrations/*.js'], // Ensure migrations are compiled
    cli: {
      migrationsDir: 'src/migrations', // Where new migrations are stored
    },
  };
  