import React from 'react';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            total
            vendedor {
                nombre
                email
            }
        }
    }
`;

const MejoresVendedores = () => {

    const { data, loading, error } = useQuery(MEJORES_VENDEDORES);
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    if (loading) return 'Cargando...';

    // console.log(data.mejoresVendedores);

    const { mejoresVendedores } = data;

    const vendedorGrafica = [];

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })
    console.log(vendedorGrafica);


    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    className='mt-10'
                    width={600}
                    height={500}
                    data={vendedorGrafica}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>

        </Layout>
     );
}
 
export default MejoresVendedores;