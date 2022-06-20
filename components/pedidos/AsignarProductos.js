import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';

const OBTENER_PRODUCTOS=gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const AsignarProductos = () => {

    // state local del componente
    const [ productos, setProductos ] = useState([]);

    // Consulta a la Base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    useEffect( () => {
        // TODO: Función para pasar a PedidoState.js
        console.log(productos);
    }, [ productos ])

    const seleccionarProducto = producto => {
        setProductos(producto);
    }

    if (loading) return null;
    const { obtenerProductos } = data;

    return ( 
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2. Selecciona o Busca los productos</p>
            <Select
                className='mt-3'
                options={ obtenerProductos }
                isMulti={ true }
                onChange={ opcion => seleccionarProducto(opcion) }
                getOptionValue= { opciones => opciones.id }
                getOptionLabel= { opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles` }
                placeholder="Busque o Seleccione el producto"
                noOptionsMessage={ () => "No hay resultados" }
            />
      </>
     );
}
 
export default AsignarProductos;