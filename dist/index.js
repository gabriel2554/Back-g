"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./clases/server"));
var environment_1 = require("./global/environment");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var environment_2 = require("./global/environment");
var server = new server_1.default();
/////// BodyParser //////
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
/////// cors //////
server.app.use(cors_1.default({ origin: true, credentials: true }));
///// IMPORTAR RUTAS ///////
var usuario_1 = __importDefault(require("./rutas/usuario"));
var productos_1 = __importDefault(require("./rutas/productos"));
var login_1 = __importDefault(require("./rutas/login"));
var usuarios2_1 = __importDefault(require("./rutas/usuarios2"));
var login2_1 = __importDefault(require("./rutas/login2"));
var producto2_1 = __importDefault(require("./rutas/producto2"));
//// SETEO RUTAS ////
server.app.use('/usuario', usuario_1.default);
server.app.use('/producto', productos_1.default);
server.app.use('/login', login_1.default);
server.app.use('/usuario2', usuarios2_1.default);
server.app.use('/login2', login2_1.default);
server.app.use('/producto2', producto2_1.default);
////// CONEXION A BASE DE DATOS //////
mongoose_1.default.connect('mongodb://localhost:Nematronix', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
        throw err;
    console.log("conectado a mi base de datos " + environment_2.nombre_BD);
});
////// ARRANQUE DEL SERVIDOR ///////
server.start(function () {
    console.log("Servidor corriendo en " + environment_1.SERVER_PORT);
});
