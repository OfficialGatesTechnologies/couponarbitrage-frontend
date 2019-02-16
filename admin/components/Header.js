import React, { Component } from 'react';
import '../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
export default withRouter(class Header extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    logout = () => {
        localStorage.removeItem('jwtAdminToken');
        window.location.reload();
    }
    render() {

        return (

            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand navbar-start">
                        <Link href="/dashboard">
                            <a className="navbar-item">
                                <img src="/static/images/logo.png" width="100" height="150" />
                            </a>
                        </Link>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">

                        <div className="navbar-end">

                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link cus-link">
                                    <figure className="image is-32x32 m-r-5">

                                        <i className="fas fa-user-circle" style={{ fontSize: '2em' }}></i>
                                    </figure>
                                    ADMIN
                            </a>

                                <div className="navbar-dropdown is-right">
                                    <Link href="/myaccount" prefetch>
                                        <a className="navbar-item">
                                            <span className="icon bd-link-icon has-text-grey-dark">
                                                <i className="fas fa-cog"></i>
                                            </span>
                                            Profile </a>
                                    </Link>
                                    <Link href="/site_settings" prefetch>
                                    <a className="navbar-item">
                                        <span className="icon bd-link-icon has-text-grey-dark">
                                            <i className="fas fa-cog"></i>
                                        </span>
                                        Settings
                            </a>
                            </Link>

                                    <hr className="navbar-divider" />
                                    <a className="navbar-item is-light" onClick={this.logout}>
                                        <span className="icon bd-link-icon has-text-grey-dark">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </span>
                                        Logout
                             </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
})





