import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

    // Query de apollo
    const { data, loading, error} = useQuery(OBTENER_USUARIO);
    console.log(data);
    console.log(loading);
    console.log(error);

    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;

    const { nombre, apellido } = data.obtenerUsuario;

    return ( 
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola: {nombre} {apellido}</p>

            <button type="button">
                Cerrar Sesión
            </button>
        </div>
     );
}
 
export default Header;