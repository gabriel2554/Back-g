import { Request, Response,Router } from 'express';
import Usuario, { InUsuario } from '../modelos/usuario';
import bcryptjs from 'bcryptjs'
import verificatoken  from '../middlewares/authentication';


const usuarioRoutes = Router ();


usuarioRoutes.post('/',( req: Request, res: Response ) => {
   
    const body: InUsuario = req.body;
    const usuario = new Usuario ({
       nombre:body.nombre,
       apellidoP:body.apellidoP,
       apellidoM:body.apellidoM,
       email:body.email,
       contraseña:bcryptjs.hashSync(body.contraseña,10),
       estado:body.estado,
       producto:body.producto, 
       rol: body.rol,
     });

    usuario.save((err:any, usuarioGuardado) => {
        if (err) {
            return res.status(500).json ({
                ok:false,
                mensaje:'error en la base de datos',
                err:err,
            });
        }
        console.log(usuario);
     

        res.status(200).json({
            ok:true,
            mensaje: 'usuario guardado',
            usuario: usuarioGuardado
        });
        //console.log(usuarioGuardado);
    });
});

usuarioRoutes.get( '/', ( req: Request, res: Response ) => {
    
    Usuario.find( (err:Error, usuarioDB) => {
       if (err){
           return res.status(500).json({
               ok:false,
               mensaje: 'error en la base de datos',
               err:err
           }); 
       }

       return res.status(200).json({
      ok: true,
      usuario: usuarioDB 
   })
});
});

//console.log( body );
usuarioRoutes.put('/',( req: Request, res: Response ) => {
    
    const id = req.headers.id;
    const body = req.body;
    const admin = req.body.usuario;

    console.log(req.body.usuario );

   
   /* if(admin.rol !== 'ADMIN_ROL'){
        return res.status(403).json({
            ok:false,
            mensaje: 'No Eres Administrador'
        })
    }*/

    Usuario.findByIdAndUpdate(id, (err:any, usuarioActualizado:any) => {

        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'error en la base de datos',
                err:err
            });
        }

        if (!usuarioActualizado) {
            return res.status(404).json({
                ok:false,
                mensaje: 'El usuario no existe'
            });
        }

        usuarioActualizado.nombre = body.nombre;
        usuarioActualizado.contraseña = bcryptjs.hashSync(body.contraseña,10);
        usuarioActualizado.estado = body.estado;

        usuarioActualizado.save( (err:any,usuarioGuard:any) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje:'error al actualizar',
                    err:err
                });
            }
            usuarioGuard.contraseña = bcryptjs.hashSync(body.contraseña,10)

            
            res.status(200).json({
                ok:true,
                mensaje: 'usuario actualizado correctamente',
                usuario:usuarioGuard
        });
        });
});
});
    usuarioRoutes.delete('',( req:Request, res:Response) => {
        const id = req.headers.id;
        
        Usuario.findByIdAndDelete(id, (err, usuarioDel) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje: 'no se pudo borrar el usuario',
                    err:err
                });
            }
            res.status(200).json({
                ok:true,
                mensaje: 'usuario eliminado exitosamente',
                usuarios: usuarioDel
            });
        });
    })
    
    export default usuarioRoutes;

    // console.log( body );
    
       
      