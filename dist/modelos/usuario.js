"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var mongooseUniqueValidator = require("mongoose-unique-validator");
var rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{value} no es un rol valido'
};
var usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String },
    apellidoP: { type: String, uppercase: true },
    apellidoM: { type: String, uppercase: true },
    email: { type: String, lowercase: true, required: [true, 'Se requiere un correo electronico'] },
    contraseña: { type: String, required: [true, 'Se requiere una contraseña'], unique: true },
    estado: { type: String, default: 'Activo' },
    producto: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Producto' },
    rol: { type: String, enum: rolesValidos, default: 'USER_ROL' },
}, { collection: 'usuarios' });
usuarioSchema.plugin(mongooseUniqueValidator, { message: " { PATH } debe ser unico" });
exports.default = mongoose_2.default.model('Usuario', usuarioSchema);
