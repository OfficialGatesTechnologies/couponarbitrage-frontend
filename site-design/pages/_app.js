import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/styles.scss';


Router.events.on('routeChangeStart', () => {
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (      
      <Container>        
        <Layout/>
        <Component {...pageProps} />
         {/* <Footer/> */}
      </Container>
      
    );
  }
}

