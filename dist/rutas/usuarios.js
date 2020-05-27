"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_1 = __importDefault(require("../modelos/usuario"));
var usuarioRoutes = express_1.Router();
usuarioRoutes.get('/', function (req, res) {
    return res.status(200).json({
        ok: true,
        mensaje: 'todo bien',
    });
});
usuarioRoutes.post('/', function (req, res) {
    var body = req.body;
    var usuario = new usuario_1.default({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        email: body.email,
        contraseña: body.contraseña,
        estado: body.estado,
    });
    usuario.save(function (err, usuarioGuardado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err,
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'usuario guardado',
            usuario: usuarioGuardado
        });
    });
});
usuarioRoutes.put('/', function (req, res) {
    var body = req.body.POST;
    console.log(body);
    return res.status(200).json({
        ok: true,
        datos: body
    });
});
usuarioRoutes.delete('/', function (req, res) {
    var body = req.body.D;
    console.log(body);
    return res.status(200).json({
        ok: true,
        datos: body
    });
});
exports.default = usuarioRoutes;
