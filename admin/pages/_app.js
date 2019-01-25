import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import NProgress from 'nprogress'
import Router from 'next/router'
import { apiUrl, ADMINMODULES } from '../utils/Common';
import axios from 'axios';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Link from 'next/link';
Router.events.on('routeChangeStart', url => {
  NProgress.start()

})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  state = {
    loggedIn: false
  };
  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount() {

   
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
    axios.get(apiUrl + 'admin/auth/check-auth')
      .then(res => {
        this.setState({ loggedIn: true });
      }).catch((error) => {

        if (this.props.router.pathname != '/changePassword' && this.props.router.pathname != '/forgotPassword')
          Router.push(`/login`);
      })
  }

  render() {
    const { Component, pageProps } = this.props;
    var navBar = '';
    var mainClassName = '';
    if (this.state.loggedIn) {
      mainClassName = 'sc-bdVaJa bWcVOO';
      navBar = <div className="cou-top-side" id="sidebar">
        <SideNav expanded={this.state.expanded}
          onToggle={(expanded) => {
            this.setState({ expanded });
          }}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>

                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.5em' }}></i>
              </NavIcon>
              <NavText>
                <Link href="/dashboard" prefetch><a>Dashboards</a></Link>

              </NavText>
            </NavItem>

            {
              ADMINMODULES.map(function (modules) {
                return (
                  <NavItem key={modules.value} eventKey={modules.value}>
                    <NavIcon>
                      <i className={`${modules.icon}`} style={{ fontSize: '1.5em' }} ></i>
                    </NavIcon>
                    <NavText>
                      {modules.text}
                    </NavText>

                    {
                      modules.submodules.map(function (submodules) {
                        return (
                          <NavItem key={submodules.name} eventKey={`${modules.value}/${submodules.id}`}>
                            <NavText>
                              <Link href={submodules.url} as={submodules.as}><a className="navbar-item"> {submodules.name} </a></Link>
                            </NavText>
                          </NavItem>
                        )
                      })
                    }

                  </NavItem>
                )
              })
            }
          </SideNav.Nav>
        </SideNav>
      </div>
    }
    return (
      <Container>
        {this.state.loggedIn ? <Header /> : ''}
        {navBar}
        <main className={this.state.expanded ? 'sc-bdVaJa eupnTP' : mainClassName}>
          <Component {...pageProps} />
        </main>
        {/* <Footer/> */}
      </Container>
    );
  }
}

