import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';

import React from 'react';
import { setRoot } from 'react-native-navigation-hooks/dist';
import { loginRoot } from '../navigation/loginRoot';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT || 'https://api.dijiapp.dev/graphql',
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  if (!token) {
    await setRoot(loginRoot);
    await Auth.signOut();
    resetApolloStore();
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
  link: authLink.concat(link),
});

export const withApollo = <P extends {}>(
  WrappedComponent: React.ComponentType<P> & Record<string, any>,
) => {
  const ApolloContainer: React.ComponentType<P> & Record<string, any> = (props: P) => (
    <ApolloProvider client={client}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );

  Object.keys(WrappedComponent).forEach(key => {
    ApolloContainer[key] = WrappedComponent[key];
  });
  return ApolloContainer;
};

export const resetApolloStore = () => client.resetStore();
