import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';

// react-select (ejemplo en su página oficial)
const options = [
    { id: 'chocolate', nombre: 'Chocolate' },
    { id: 'strawberry', nombre: 'Strawberry' },
    { id: 'vanilla', nombre: 'Vanilla' }
]

const NuevoPedido = () => {

    // Definir un state
    const [ sabores, setSabores ] = useState([]);

    useEffect( () => {
        console.log(sabores);
    }, [sabores])

    const seleccionarSabor = sabores => {
        setSabores(sabores);
    }

    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Crear Nuevo Pedido</h1>

            <Select
                options={ options }
                isMulti={ true }
                onChange={ opcion => seleccionarSabor(opcion) }
                getOptionValue= { opciones => opciones.id }
                getOptionLabel= { opciones => opciones.nombre }
                placeholder="Seleccione el sabor"
                noOptionsMessage={ () => "No hay resultados" }
            />
        </Layout>
     );
}
 
export default NuevoPedido;