import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

// Paso 2: Enviar el mutation (en este caso: Crear nuevo cliente)
const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

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

const NuevoCliente = () => {

    // Routing
    const router = useRouter();

    // Mensaje de alerta
    const [ mensaje, guardarMensaje ] = useState(null);


    // Parte del paso 2: Mutation para crear nuevos clientes
    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente } }) {
            // Obtener el objeto de cache que deseamos actualizar
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribimos el cache ( el cache nunca se debe modificar, más bien se debe sobreescribir )
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor : [ ...obtenerClientesVendedor, nuevoCliente ]
                }
            })
        }
    });
    /* //TODO: update( cache, {data})
     * 1. Le pasamos el cache a update()
     * 2. Actualizamos el cache con un objeto 'data' y se va a actualizar con el nuevoCliente
     * Es decir: vamos a tener una copia de cache que se va a actualizar con la información que tenga nuevoCliente
     */

    // Paso 1: usar formik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del cliente es obligatorio'),
            apellido: Yup.string().required('El apellido del cliente es obligatorio'),
            empresa: Yup.string().required('El campo empresa del cliente es obligatorio'),
            email: Yup.string().email('Email no válido').required('El email del cliente es obligatorio')
            //? El teléfono no lo colocamos porque es opcional, si lo introducen se guarda, sino no.
        }),

        // En el paso 2 empezamos a llenar el onSubmit
        onSubmit: async valores => {

            const { nombre, apellido, empresa, email, telefono } = valores;

            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });
                // console.log(data.nuevoCliente);
                router.push('/'); // Redireccionar hacia: Clientes
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                
                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
            }
        }
    })

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            { mensaje && mostrarMensaje() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="blox text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>

                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre" 
                                type="text" 
                                placeholder="Nombre Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>
                        { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="blox text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                            </label>

                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="apellido" 
                                type="text" 
                                placeholder="Apellido Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>
                        { formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.apellido}</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="blox text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>

                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="empresa" 
                                type="text" 
                                placeholder="Empresa Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>
                        { formik.touched.empresa && formik.errors.empresa ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.empresa}</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="blox text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>

                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" 
                                type="email" 
                                placeholder="Email Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="blox text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                Teléfono
                            </label>

                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono" 
                                type="tel" 
                                placeholder="Teléfono Cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Registrar Cliente"
                        />

                    </form>
                </div>
            </div>

        </Layout>
     );
}
 
export default NuevoCliente;