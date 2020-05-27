import productos from '../modelos/producto';


//=============CREAR PRODUCTO ================

export async function registro_de_producto (
    nombre:string,
    bebida:string,
    alimento:string,
    tamaño:string,
    numeroserie:string,
) {
    return productos.create({
        nombre,
        bebida,
        alimento,
        tamaño,
        numeroserie
}).then ((registro:any ) => {return registro}).catch((err:Error) => {throw err});
}

//========= OBTENIENDO USUARIO =================

export async function buscarproducto () {
    return productos.find ()
    .then ((productos:any ) => { return productos;}).catch ((err:Error) => {throw err;});
}
 
//===============================================
export async function buscarproductoid ( id:any ) {
    return productos.findById ({_id:id},'nombre')
    .then ((res:any) => { return res } )
    .catch (( err:Error) => {
        throw err;
});
}

//==========MODIFICACION DE USUARIOS =========

export async function modprod ( id:any, producto:any ) {
    return productos.findByIdAndUpdate (id,producto, {new:true })
    .then (( res:any ) => { return res })
    .catch (( err:Error) => {
        throw err;
    }) 
}


