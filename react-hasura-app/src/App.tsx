import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  GraphQLRequest,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Hello World!</h1>
    </ApolloProvider>
  );
}

export default App;
