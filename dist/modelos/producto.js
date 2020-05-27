"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var mongooseUniqueValidator = require("mongoose-unique-validator");
var productoSchema = new mongoose_1.Schema({
    nombre: { type: String, uppercase: true },
    bebida: { type: String },
    alimento: { type: String },
    tamaño: { type: String },
    numeroserie: { type: String, required: [true, 'Se requiere un numero de serie'], unique: true }
}, { collection: 'productos' });
productoSchema.plugin(mongooseUniqueValidator, { message: " { serie } de ser unico" });
exports.default = mongoose_2.default.model('Producto', productoSchema);
