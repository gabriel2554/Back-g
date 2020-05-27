"use strict";
////// LOGIN ///////
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_1 = __importDefault(require("../modelos/usuario"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../global/environment");
var loginRoutes = express_1.Router();
loginRoutes.post('/', function (req, res) {
    var body = req.body;
    usuario_1.default.findOne({ email: body.email }, function (err, nombre_BD) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                error: err
            });
        }
        if (!nombre_BD) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }
        if (!bcryptjs_1.default.compareSync(body.contraseña, nombre_BD.contraseña)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas'
            });
        }
        var token = jsonwebtoken_1.default.sign({ nombre: nombre_BD }, environment_1.SEED, {
            expiresIn: 14000
        });
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario logueado con exito',
            nombre: nombre_BD,
            token: token
        });
    });
});
exports.default = loginRoutes;
