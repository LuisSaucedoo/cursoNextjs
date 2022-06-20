import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types'

const PedidoState = ({children}) => {

    // State de Pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    // Modifica el cliente
    const agregarCliente = cliente => {
        // console.log(cliente);

        // dispatch manda a llamar el PedidoReducer
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // Modifica los productos
    const agregarProducto = productosSeleccionados => {

        let nuevoState;
        if (state.productos.length > 0) {
            // Tomar del segundo arreglo una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id );
                return { ...producto, ...nuevoObjeto }
            })
        } else {
            nuevoState = productosSeleccionados;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    // Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                agregarCliente,
                agregarProducto,
                cantidadProductos
            }}
        > {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;