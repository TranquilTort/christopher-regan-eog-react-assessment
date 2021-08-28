import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';


const errorLink = onError(({graphQLErrors, networkError})=>{
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      alert(`Graphql error ${message}`)
    );
  }
})
const link = from([
  errorLink,
  new HttpLink({uri: "https://react.eogresources.com/graphql"})
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Wrapper>
        <Header />
        <NowWhat />
        <ToastContainer />
      </Wrapper>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
