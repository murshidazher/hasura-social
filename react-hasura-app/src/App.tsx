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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp } from './components/signup/SignUp';
import { Container } from '@material-ui/core';

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Container maxWidth="md">
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              {() => <h1>Signin page</h1>}
            </Route>
          </Switch>
        </Container>
        <h1>Hello World!</h1>
      </ApolloProvider>
    </Router>
  );
}

export default App;
