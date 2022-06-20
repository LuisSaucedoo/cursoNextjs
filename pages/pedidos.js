import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Pedido from "../components/Pedido";

const OBTENER_PEDIDOS = gql`
  query ObtenerPedidos {
    obtenerPedidos {
      id
      pedido {
        id
        cantidad
        nombre
      }
      total
      cliente
      vendedor
      fecha
      estado
    }
  }
`;

const Pedidos = () => {

  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);
  
  if (loading) return 'Cargando...';
  
  const { obtenerPedidos } = data; // al profe le salió como variable: obtenerPedidosVendedor
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
  
          <Link href="/nuevopedido">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Pedido</a>
          </Link>

          { obtenerPedidos.length === 0 ? (
            <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
          ) : (
            obtenerPedidos.map( pedido => (
              <Pedido
                key={pedido.id}
                pedido={pedido}
              />
            ))
          )}
      </Layout>
    </div>
  )
}

export default Pedidos;