import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),

    // Las características que se requieren son el nombre de la colección, puede ser el nombre que tu desees. Y el esquema al que hará referencia ese nombre.
    MongooseModule.forFeature([
      {
        name: User.name, //retorna en forma de string el nombre del esquema User 
        schema: UserSchema
      }
    ]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '120s' },
    })
  ]
})
export class AuthModule {}
