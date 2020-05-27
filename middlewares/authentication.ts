import {Request, Response}  from 'express';
import {SEED} from '../global/environment';
import {verify}   from 'jsonwebtoken';


function verificatoken (Req: Request, Res: Response, next: any ) {
    const token:any = Req.headers.authorization;

verify (token, SEED, (err:any, decoded:any) => {
    if (err) {
        return Res.status (401).json ({
            ok:false,
            mensaje:'token incorrecto',
            error:err
        });
    }
    Req.body.usuario = decoded.nombre;
    console.log(decoded)
    next () ;
});
}

export default verificatoken