import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class Header extends Component {

    state = {

    }
    componentDidMount = () => {
     
    }
    render() {

        return (
            
            <div>
                
                <nav className="head-nav navbar is-shadowless" role="navigation" aria-label="main navigation">
                <div className="container">
                
                    <div className="navbar-brand navbar-start">
                    <Link href="/">
                    <a className="max-log-img">
                        
                        <img src="static/images/logo.png"/>
                    </a></Link>
                        

                        <a role="button" className="navbar-burger burger sm-menu" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    
                    <div id="navbarBasicExample" className="navbar-menu">
                    
                        <div className="navbar-end is-uppercase">
                        <Link href=""><a className="navbar-item">Home</a></Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                        <Link href=""><a className="navbar-link cus-link">Gambling Cashback Offers</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <div className="navbar-dropdown flipInY animated">
                            <Link href="/cashback-bonuses"><a className="navbar-item">Cashback On Your Losses</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <Link href="/cashback-bonuses"><a className="navbar-item">Fixed Cashback Deals</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable">
                        <Link href=""><a className="navbar-link cus-link">Turnover Cashback</a></Link>
                            <div className="navbar-dropdown flipInY animated">
                            <Link href="/ecopayz-cashback-scheme-page"><a className="navbar-item">Ecopayz Cashback Scheme</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <Link href="/ecopayz-cashback-scheme-page"><a className="navbar-item">Skrill Cashback Scheme</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <Link href="/ecopayz-cashback-scheme-page"><a className="navbar-item">SBOBET Cashback Program</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <Link href="/ecopayz-cashback-scheme-page"><a className="navbar-item">Neteller Cashback Scheme</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            <Link href="/ecopayz-cashback-scheme-page"><a className="navbar-item">Asianconnect Cashback</a></Link>
                            <hr className="dropdown-divider has-background-light"></hr>
                            </div>
                        </div>
                        <Link href="/free-arbs"><a className="navbar-item">Free Arbs</a></Link>
                        <Link href="/contact"><a className="navbar-item">Contact</a></Link>
                        <div className="navbar-item">
                                <div className="button1">
                                <Link href="/login">
                                    <a className="sm-btn-orange is-radiusless" >
                                        MEMBER LOGIN
                                        </a>
                                </Link>
                                    
                                    <span className="jus-btn is-size-7 mg-t-10">
                                <Link href="/cashback-bonuses"><a>I JUST WANT TO BROWSE</a></Link>
                                
                            </span>
                                </div>
                               
                        </div>
                        
                        {/* <div class="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link cus-link">
                            <figure className="image is-32x32 m-r-5">
                                <img src="https://placehold.it/60x60" alt="img" className="is-rounded" />
                            </figure>
                            ADMIN
                            </a>

                            <div className="navbar-dropdown is-right flipInY animated">
                            <a className="navbar-item">
                            <span className="icon bd-link-icon has-text-grey-dark">
                                <i className="fas fa-user"></i>
                            </span> Profile
                            </a>
                            <a className="navbar-item">
                            <span className="icon bd-link-icon has-text-grey-dark">
                                <i className="fas fa-cog"></i>
                            </span>
                                Settings
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item is-light">
                            <span className="icon bd-link-icon has-text-grey-dark">
                            <i class="fas fa-sign-out-alt"></i>
                            </span>
                               Logout
                             </a>
                            </div>
                        </div> */}
                            {/* <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary">
                                        <strong>My Account</strong>
                                    </a>
                                    <a className="button is-light">
                                        Logout
          </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    </div>
                </nav>
              
           </div> 
        )
    }
})





