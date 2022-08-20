import {Router} from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "./theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider theme={theme}>
          <>
              <Head>

              </Head>
              <Layout>
                  <Component {...pageProps} />
              </Layout>
          </>
      </ChakraProvider>
  )
}

export default MyApp
