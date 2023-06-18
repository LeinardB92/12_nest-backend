import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    // Las características que se requieren son el nombre de la colección, puede ser el nombre que tu desees. Y el esquema al que hará referencia ese nombre.
    MongooseModule.forFeature([
      {
        name: User.name, //retorna en forma de string el nombre del esquema User 
        schema: UserSchema
      }
    ]),
  ]
})
export class AuthModule {}
