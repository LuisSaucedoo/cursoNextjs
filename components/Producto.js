import React from 'react';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
    const { nombre, precio, existencia, id } = producto;

    // Función para botón: Eliminar
    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) { // El profe tiene result.value

            }
          })
    }
    
    return ( 
        <tr>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{existencia}</td>
            <td className='border px-4 py-2'>$ {precio}</td>
            <td className="border px-4 py-2">
                <button
                    type="buttom"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarProducto() }
                >
                    Eliminar

                    {/* heroicons.com - Para buscar la foto del botón en modo Copy JSX */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </td>

            <td className="border px-4 py-2">
                <button
                    type="buttom"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    // onClick={() => editarCliente() }
                >
                    Editar

                    {/* heroicons.com - Para buscar la foto del botón en modo Copy JSX */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>

                </button>
            </td>
        </tr>
     );
}

export default Producto;