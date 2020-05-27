import * as login from '../controladoras/usuario.controladora';
import {Router,Request,Response} from 'express';
import bcryptjs from 'bcryptjs';
import jwd from 'jsonwebtoken';
import { SEED, nombre_BD } from '../global/environment';


const login2Routes = Router ();

login2Routes.post('/', async (req:Request,res:Response) => {
    const body = req.body;

    await login.logearusuario(body.email)
    .then((nombre_BD:any )=>{
        console.log(nombre_BD);
         
        if (!nombre_BD){
            return res.status (404).json ({
                ok:false,
                mensaje: 'El usuario no existe'
            });
           }
           if (!bcryptjs.compareSync (body.contraseña, nombre_BD.contraseña))
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
           })
           .catch((err:Error) =>{
               return res.status(500).json ({
                   ok:false,
                   mensaje:'error en la base de datos',
                   error:err
               }); 
           })
           });
           export default login2Routes;
