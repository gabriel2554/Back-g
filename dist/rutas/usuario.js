"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_1 = __importDefault(require("../modelos/usuario"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var usuarioRoutes = express_1.Router();
usuarioRoutes.post('/', function (req, res) {
    var body = req.body;
    var usuario = new usuario_1.default({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        email: body.email,
        contraseña: bcryptjs_1.default.hashSync(body.contraseña, 10),
        estado: body.estado,
        producto: body.producto,
        rol: body.rol,
    });
    usuario.save(function (err, usuarioGuardado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err,
            });
        }
        console.log(usuario);
        res.status(200).json({
            ok: true,
            mensaje: 'usuario guardado',
            usuario: usuarioGuardado
        });
        //console.log(usuarioGuardado);
    });
});
usuarioRoutes.get('/', function (req, res) {
    usuario_1.default.find(function (err, usuarioDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
//console.log( body );
usuarioRoutes.put('/', function (req, res) {
    var id = req.headers.id;
    var body = req.body;
    var admin = req.body.usuario;
    console.log(req.body.usuario);
    /* if(admin.rol !== 'ADMIN_ROL'){
         return res.status(403).json({
             ok:false,
             mensaje: 'No Eres Administrador'
         })
     }*/
    usuario_1.default.findByIdAndUpdate(id, function (err, usuarioActualizado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!usuarioActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }
        usuarioActualizado.nombre = body.nombre;
        usuarioActualizado.contraseña = bcryptjs_1.default.hashSync(body.contraseña, 10);
        usuarioActualizado.estado = body.estado;
        usuarioActualizado.save(function (err, usuarioGuard) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al actualizar',
                    err: err
                });
            }
            usuarioGuard.contraseña = bcryptjs_1.default.hashSync(body.contraseña, 10);
            res.status(200).json({
                ok: true,
                mensaje: 'usuario actualizado correctamente',
                usuario: usuarioGuard
            });
        });
    });
});
usuarioRoutes.delete('', function (req, res) {
    var id = req.headers.id;
    usuario_1.default.findByIdAndDelete(id, function (err, usuarioDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no se pudo borrar el usuario',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'usuario eliminado exitosamente',
            usuarios: usuarioDel
        });
    });
});
exports.default = usuarioRoutes;
// console.log( body );
