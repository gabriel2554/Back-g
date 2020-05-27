import usuarios from '../modelos/usuario';
///======================CREAR USUARIO ================

export async function registro_de_usuario (
    //rol: string,
    nombre:string,
    apellidoP:string,
    apellidoM:string,
    email:string,
    contraseña:string,
    estado:string,
    producto:string,
) { 
    return usuarios.create ({
        //rol,
        nombre,
        apellidoP,
        apellidoM,
        email,
        contraseña,
        estado,
        producto,
}).then(( registro:any ) => {return registro }).catch((err:Error) => { throw err});
    }

//================ OBTENIENDO USUARIOS =============

export async function buscarusuario () {
    return usuarios.find ()
    .then ((usuarios:any ) => { return usuarios;}).catch ((err:Error) => {throw err;});
}

//========================================

export async function buscarusuarioid (id:any) {
    return usuarios.findById ({_id:id},'nombre email')
    .then ((res:any) => { return res } )
    .catch (( err:Error) => {
        throw err;
    })
}

//============= MODIFICACION DE USUARIOS =============

export async function modusuario ( id:any, usuario:any ) {
    return usuarios.findByIdAndUpdate (id,usuario, {new:true })
    .then (( res:any ) => { return res })
    .catch (( err:Error) => {
        throw err;
    }) 
}

//============== LOGIN =====================

export async function logearusuario (email:string ) {
    return usuarios.findOne ( {email:email} )
    .then (( res:any ) => { return res })
    .catch (( err:Error) => {
        throw err;
    })
}

//============== DESACTIVAR USUARIOS ===========

export async function DisableUser (id: any, stat:string) {
    return usuarios.updateOne({_id:id}, {$set: {estado:stat} } )
    .then( (user:any) => {
        return user;
    })
    .catch( (err:Error) => {
        throw err;
    });
}
