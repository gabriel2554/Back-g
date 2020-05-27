import { Schema, Document, isValidObjectId } from 'mongoose';
import mongoose from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');

export interface InUsuario extends Document {
    rol: string;
    nombre:string;
    apellidoP:string;
    apellidoM:string;
    email:string;
    contraseña:string;
    estado:string;
    producto:string;
}

const rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{value} no es un rol valido'
}

const usuarioSchema: Schema = new Schema ({
    nombre: { type: String},
    apellidoP: { type: String, uppercase: true },
    apellidoM: {type: String, uppercase: true },
    email: { type: String, lowercase: true, required: [ true, 'Se requiere un correo electronico'] },
    contraseña: { type: String, required: [true, 'Se requiere una contraseña'], unique: true}, 
    estado: { type: String, default: 'Activo'},
    producto:{ type: Schema.Types.ObjectId,ref:'Producto'},
    rol:{type:String, enum:rolesValidos, default:'USER_ROL'},
},{ collection: 'usuarios' } );

usuarioSchema.plugin( mongooseUniqueValidator, { message: ` { PATH } debe ser unico`});
export default mongoose.model<InUsuario>( 'Usuario', usuarioSchema );
