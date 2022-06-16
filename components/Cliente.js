import React from 'react';

const Cliente = ({cliente}) => {

    const { nombre, apellido, empresa, email, id } = cliente;

    // Elimina un cliente
    const confirmarEliminarCliente = id => {
        console.log('eliminando', id);
    }


    return ( 
        <tr>
            <td className="border px-4 py-2">{nombre} {apellido}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="buttom"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarCliente(id) }
                >
                    Eliminar

                    {/* heroicons.com - Para buscar la foto del botón en modo Copy JSX */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </td>
        </tr>
     );
}
 
export default Cliente;