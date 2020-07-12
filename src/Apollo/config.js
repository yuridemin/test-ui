import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4520',
});

const client = new ApolloClient({
  link,
  cache,
});

const initialState = { contactList: null };
cache.writeData({ data: initialState });

export default client;
