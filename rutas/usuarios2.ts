import { Request, Response,Router } from 'express';
import bcryptjs from 'bcryptjs'
import * as usuario from '../controladoras/usuario.controladora';


const usuario2Routes = Router ();

usuario2Routes.post ('/',async ( req: Request, res: Response) => {
    const body = req.body;
    await usuario.registro_de_usuario (
        body.nombre,
        body.apellidoP,
        body.apellidoM,
        body.email,
        bcryptjs.hashSync(body.contraseña,10),
        body.estado,
        body.producto,
        //body.rol
        )
        .then ((creado:any ) => {
            return res.status(200).json({
            ok:true,
            mensaje:'usuario creado',
            usuario:creado

});
        
})
        .catch ((nocreado:any ) => {
            return res.status(400).json({
                ok:false,
                mensaje:'usuario no creado',
                error:nocreado
            });
        })
});

//================OBTENER PRODUCTO ===============

usuario2Routes.get ('/', async ( req:Request, res: Response) => {
    await usuario.buscarusuario ()
    .then ((obtener:any ) => {
        return res.status(200).json({
            ok:true,
            mensaje:'usuario obtenido',
            usuario: obtener
        });
    })
    .catch ((err:Error) => {
        return res.status(400).json({
            ok:false,
            mensaje:'usuario no obtenido',
            error: err
        })
    })
})

//================== ACTUALIAZAR USUARIO================

usuario2Routes.put('/', async ( req:Request, res:Response ) => {

    const id = req.headers.id;
    const body = req.body;

    await usuario.modusuario(id, body)
    .then( (done: any) => {
        return res.status(200).json({
            ok:true,
            mensaje: 'usuario actualizado',
            usuario:done
        });
    })
    .catch ( ( err:Error ) => {
        return res.status(500).json({
            ok:false,
            error:err
        });
    });
});

//============= DESACTIVAR USUARIO =================

usuario2Routes.put('/desactivar',async ( req:Request, res: Response) => {
    const id = req.headers.id;
    const stat = req.body.estado;

    await usuario.DisableUser( id, stat )
    .then ( (done:any ) => {
        res.status(200).json({
            ok:true,
            mensaje:'el usuario ahora esta desactivado',
            usuario:done
        });
    })
    .catch(( err:Error) => {
        res.status(400).json({
            ok:false,
            mensaje:'error al desactivar',
            Error:err

        });
    });
});
export default usuario2Routes;