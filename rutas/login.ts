////// LOGIN ///////
 
import {Router,Request,Response} from 'express';
import Usuario from '../modelos/usuario';
import bcryptjs from 'bcryptjs';
import jwd from 'jsonwebtoken';
import { SEED} from '../global/environment';


const loginRoutes = Router ();

loginRoutes.post ('/', (req:Request, res: Response) => {
const body = req.body;
Usuario.findOne ({email: body.email}, (err:Error, nombre_BD) => {
 if (err) {
     return res.status(500).json({
         ok:false,
         mensaje: 'Error en la base de datos',
         error:err
 });
}
if (!nombre_BD){
 return res.status (404).json ({
     ok:false,
     mensaje: 'El usuario no existe'
 });
}
if (!bcryptjs.compareSync (body.contraseña,nombre_BD.contraseña))
{
 return res.status(400).json ({
     ok:false,
     mensaje: 'Credenciales incorrectas'
 });
}
const token = jwd.sign({ nombre: nombre_BD}, SEED,{
 expiresIn: 14000 });
 res.status(200).json({
     ok:true,
     mensaje:'Usuario logueado con exito',
     nombre:nombre_BD,
     token:token 
 });
});
});
export default loginRoutes;