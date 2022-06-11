import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

/**
 * Para esta parte, se modificó en el proyecto CRMGraphQL el resolver y Schema de obtenerUsuario, específicamente:
 * En el resolver se quitó el input de token
 * En el schema se quitó el input de token
 */

const OBTENER_USUARIO =gql`
    query ObtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
            email
            creado
        }
    }
`;

const Header = () => {

    // Routing
    const router = useRouter();

    // Query de apollo
    const { data, loading, error, client} = useQuery(OBTENER_USUARIO);
    console.log(data);
    console.log(loading);
    console.log(error);

    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;

    // Si no hay información
    if(!data) {
        return router.push('/login');
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion= () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login');
        return <p>Cargando...</p>
    }

    return ( 
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola: {nombre} {apellido}</p>

            <button 
                onClick={ () => cerrarSesion() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerrar Sesión
            </button>
        </div>
     );
}
 
export default Header;