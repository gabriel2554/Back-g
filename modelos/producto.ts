import { Schema, Document } from 'mongoose' ;
import mongoose from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IProducto extends Document {
    nombre:string;
    bebida:string;
    alimento:string;
    tamaño:string;
    numeroserie:Number;
}

const productoSchema: Schema = new Schema ({
    nombre: {type: String, uppercase:true },
    bebida: {type: String},
    alimento: {type: String},
    tamaño: {type:String},
    numeroserie: {type:String, required: [true,'Se requiere un numero de serie'], unique: true }

},{ collection: 'productos' });

productoSchema.plugin( mongooseUniqueValidator, { message: ` { serie } de ser unico`});
export default mongoose.model<IProducto>( 'Producto', productoSchema );




