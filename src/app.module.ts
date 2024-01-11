import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AddressModule } from './modules/address/address.module';
import { CityModule } from './modules/city/city.module';
import { StateModule } from './modules/state/state.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmConnection } from './database/config/connection';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmConnection,
    UserModule,
    AddressModule,
    CityModule,
    StateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
