import { Request, Response, Router } from 'express';
import bodyParser, { json } from 'body-parser';
import Producto, { IProducto } from '../modelos/producto';
import producto from '../modelos/producto';



const productoRoutes = Router ();


productoRoutes.post ('/', (req:Request, res:Response) => {
    const body: IProducto = req.body;
    const producto = new Producto ({
        nombre:body.nombre,
        bebida:body.bebida,
        alimento:body.alimento,
        tamaño:body.tamaño,
        numeroserie:body.numeroserie
      });

      producto.save((err:Error, productoGuardado) => {
        if (err) {
            return res.status(500).json ({
                ok:false,
                mensaje:'error en la base de datos',
                err:err,
            });
        }
        res.status(200).json({
            ok:true,
            mensaje: 'producto guardado',
            producto: productoGuardado
        });
        console.log(productoGuardado);
    });
});

productoRoutes.get ('/', (req: Request, res: Response) => {
    
    Producto.find( (err:Error, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje:'Error en la base de datos',
                err:err
            });
    }
    return res.status(200).json({
        ok:true,
        mensaje: productoDB
    })
});
});

productoRoutes.put ('/',( req:Request, res: Response) => {
    const body = req.body;
    const id = req.headers.id;
    const productoL = req.body.producto;


    Producto.findById(id, (err, productoActualizado) => {

        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'error en la base de datos',
                err:err
            });
        }

        if (!productoActualizado) {
            return res.status(404).json({
                ok:false,
                mensaje: 'El producto no existe'
            });
        }

        productoActualizado.nombre = body.nombre;
        productoActualizado.bebida = body.bebida;
        productoActualizado.alimento = body.alimento;
        productoActualizado.tamaño = body.tamaño;
        productoActualizado.numeroserie = body.numeroserie;

        productoActualizado.save( (err,productoGuard) => {
            
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje:'error al actualizar',
                    err:err
                });
            }
            
            res.status(200).json({
                ok:true,
                mensaje: 'producto actualizado correctamente',
                usuario:productoGuard
        });
        });
})
})

productoRoutes.delete('', ( req:Request, res:Response) => {
    const id = req.headers.id;
    
    Producto.findByIdAndDelete(id, (err, productoDel) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje: 'no se pudo borrar el producto',
                err:err
            });
        }
        res.status(200).json({
            ok:true,
            mensaje: 'producto eliminado exitosamente',
            producto: productoDel
        });
    });
})

export default productoRoutes

