import { Request, Response,Router } from 'express';
import * as productos from '../controladoras/producto.controladoras';
const producto2Routes = Router ();

producto2Routes.post('/',async (req:Request,res:Response) => {
    const body = req.body;
    await productos.registro_de_producto (
    body.nombre,
    body.bebida,
    body.alimento,
    body.tamaño,
    body.numeroserie
    )
    .then ((creado:any) => {
        return res.status(200).json({
            ok:true,
            mensaje:'producto creado',
            producto:creado
        });
    })
    .catch ((nocreado:any) => {
        return res.status(400).json({
            ok:false,
            mensaje:'producto no creado',
            error:nocreado
        });
    })
});

//============OBTENER PRODUCTO ==============

producto2Routes.get ('/', async ( req:Request, res: Response) => {
    await productos.buscarproducto () 
    .then ((obtener:any ) => {
        return res.status(200).json({
            ok:true,
            mensaje:'producto obtenido',
            producto: obtener
        });
    })
    .catch ((err:Error) => {
        return res.status(400).json({
            ok:false,
            mensaje:'producto no obtenido',
            error: err
        })
    })
})

//================== ACTUALIZAR PRODUCTO ================

producto2Routes.put('/', async ( req:Request, res:Response ) => {

    const id = req.headers.id;
    const body = req.body;

    await productos.modprod(id, body)
    .then( (done: any) => {
        return res.status(200).json({
            ok:true,
            mensaje: 'producto actualizado',
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

export default producto2Routes