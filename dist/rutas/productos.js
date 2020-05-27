"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_1 = __importDefault(require("../modelos/producto"));
var productoRoutes = express_1.Router();
productoRoutes.post('/', function (req, res) {
    var body = req.body;
    var producto = new producto_1.default({
        nombre: body.nombre,
        bebida: body.bebida,
        alimento: body.alimento,
        tamaño: body.tamaño,
        numeroserie: body.numeroserie
    });
    producto.save(function (err, productoGuardado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err,
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'producto guardado',
            producto: productoGuardado
        });
        console.log(productoGuardado);
    });
});
productoRoutes.get('/', function (req, res) {
    producto_1.default.find(function (err, productoDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        return res.status(200).json({
            ok: true,
            mensaje: productoDB
        });
    });
});
productoRoutes.put('/', function (req, res) {
    var body = req.body;
    var id = req.headers.id;
    var productoL = req.body.producto;
    producto_1.default.findById(id, function (err, productoActualizado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!productoActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El producto no existe'
            });
        }
        productoActualizado.nombre = body.nombre;
        productoActualizado.bebida = body.bebida;
        productoActualizado.alimento = body.alimento;
        productoActualizado.tamaño = body.tamaño;
        productoActualizado.numeroserie = body.numeroserie;
        productoActualizado.save(function (err, productoGuard) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al actualizar',
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'producto actualizado correctamente',
                usuario: productoGuard
            });
        });
    });
});
productoRoutes.delete('', function (req, res) {
    var id = req.headers.id;
    producto_1.default.findByIdAndDelete(id, function (err, productoDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no se pudo borrar el producto',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'producto eliminado exitosamente',
            producto: productoDel
        });
    });
});
exports.default = productoRoutes;
