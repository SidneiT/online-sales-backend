import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/database/migration/*{.ts,.js}`],
  migrationsRun: true,
});
