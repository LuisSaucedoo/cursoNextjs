import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});

// Agregar token y pasarlo via header
const authLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});

export default client;