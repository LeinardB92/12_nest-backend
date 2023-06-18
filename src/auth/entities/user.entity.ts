import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {

    // Mongo creará esto automáticamente, no es necesario indicarlo en el código.
    _id?: string;

    @Prop({ unique: true, required: true })
    email: string;

    // @Prop({ required: true })
    // nome: string;

    @Prop({ minlength: 6, required: true })
    password?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass( User );