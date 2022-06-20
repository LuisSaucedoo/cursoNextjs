import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';

const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;


const AsignarCliente = () => {
    // Definir un state
    const [ cliente, setCliente ] = useState([]);

    // Consultar la base de datos
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    useEffect( () => {
        console.log(cliente);
    }, [cliente])

    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    // Resultados de la consulta
    if (loading) return null;

    const { obtenerClientesVendedor } = data;
        
    return ( 
        <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1. Asigna un Cliente al pedido</p>
            <Select
                className='mt-3'
                options={ obtenerClientesVendedor }
                // isMulti={ true } // Sólo necesitamos seleccionar un cliente, entonces no es necesario
                onChange={ opcion => seleccionarCliente(opcion) }
                getOptionValue= { opciones => opciones.id }
                getOptionLabel= { opciones => opciones.nombre }
                placeholder="Busque o Seleccione el cliente"
                noOptionsMessage={ () => "No hay resultados" }
            />
        </>
     );
}
 
export default AsignarCliente;