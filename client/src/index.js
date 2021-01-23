import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { StoreContext } from 'redux-react-hook';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { onError } from 'apollo-link-error';
import Notifications, { notify } from 'react-notify-toast';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => notify.show(message, 'error'));
});

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ApolloProvider client={client}>
      <Notifications />
      <App />
    </ApolloProvider>
    ,{/* <App /> */}
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
