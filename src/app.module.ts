import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from './modules/address/address.module';
import { CityModule } from './modules/city/city.module';
import { StateModule } from './modules/state/state.module';
import { UserModule } from './modules/user/user.module';
import { AdressController } from './modules/adress/adress.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: 'public',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/database/migration/*{.ts,.js}`],
      migrationsRun: true,
    }),
    UserModule,
    AddressModule,
    CityModule,
    StateModule,
  ],
  providers: [],
  controllers: [AdressController],
})
export class AppModule {}
