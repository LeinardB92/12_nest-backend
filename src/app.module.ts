import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URI ),
    // MongooseModule.forRoot('mongodb://localhost:27017' ),
    
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){console.log(typeof(process.env.MONGO_URI))}
}
