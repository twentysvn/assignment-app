import {ApolloClient, InMemoryCache} from '@apollo/client';

export const ApolloClientConfig = new ApolloClient({
  uri: 'localhost:4000/graphql',
  cache: new InMemoryCache(),
});
