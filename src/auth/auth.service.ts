import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import * as bcryptjs from "bcryptjs";

import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>,
    private jwtService: JwtService
   ) {}


  async create(createUserDto: CreateUserDto) : Promise<User> {
    try {
      const { password, ...userData } = createUserDto; //desestructuración de createUserDto.
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync( password, 10 ),
        ...userData
      });
      
      await newUser.save();
       const { password:_, ...user } = newUser.toJSON();
       
       return user;
    } 
    catch(error){
      if( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }


  async register( registerDto: RegisterUserDto ): Promise<LoginResponse> {
    const user = await this.create( registerDto );

    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    }
  }
  

  //La idea de este login es que nos retorne al usuario y Token existentes
  async login(loginDto : LoginDto): Promise<LoginResponse>{
    const {email, password} = loginDto;
    const user = await this.userModel.findOne({email : email});
    
    if ( !user ) {
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if ( !bcryptjs.compareSync( password, user.password ) ) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password:_, ...rest  } = user.toJSON();
    
    return {
      user: rest,
      token: this.getJwtToken({id: user._id}),
    }
  }


  findAll() {
    return `This action returns all auth`;
  }


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  getJwtToken(payload : JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
