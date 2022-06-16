import React from 'react';
import { useRouter } from 'next/router';

const EditarCliente = () => {
    // obtener el ID actual
    const router = useRouter();
    const { query } = router;
    console.log(query)

    // obtener el ID actual del prof: - este obtener id no me mostraba el id en consola
    /*const router = useRouter();
    const { query: { id } } = router;
    consoleg.lo(id); */

    return ( 
        <h1>Desde editar</h1>
     );
}
 
export default EditarCliente;