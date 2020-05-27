"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../global/environment");
var jsonwebtoken_1 = require("jsonwebtoken");
function verificatoken(Req, Res, next) {
    var token = Req.headers.authorization;
    jsonwebtoken_1.verify(token, environment_1.SEED, function (err, decoded) {
        if (err) {
            return Res.status(401).json({
                ok: false,
                mensaje: 'token incorrecto',
                error: err
            });
        }
        Req.body.usuario = decoded.nombre;
        console.log(decoded);
        next();
    });
}
exports.default = verificatoken;
