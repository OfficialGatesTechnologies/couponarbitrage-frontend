import React, { Component } from 'react';

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
                
                <div className="head-nav inner navbar is-shadowless">
                <div className="container">
                <div className="level is-fullwidth">
                <div className="level-left">
                       <Link href="/">
                       <a className="max-log-img">
                            <img src="static/images/logo.png"/>
                       </a>
                       </Link>
                            
                       
                </div>
                <div  className="level-right">
                        <div className="navbar-end is-uppercase">
                        <div className="navbar-item head-rt-menu">
                            <div className="nav-it-top">
                            <ul className="nav-tp-lt">
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href="/contact"><a>Contact us</a></Link></li>
                            </ul>
                            {/* <ul className="is-relative is-inline-block">
                                <li className="is-relative is-inline-block" style={{width: '20px', marginRight: '20px'}}><span class="notfiy">
                                <a href="/activity" title="notification">
                                    <img src="/static/images/icons/note.svg" alt="i" />
                                    <span id="count" class="note-count">0</span>
                                </a>
                            </span></li>
                            <li className="is-relative is-inline-block" style={{width: '20px'}}><span class="logout" title="logout">
                            <a href="/logout"><img src="/static/images/icons/logout.svg" alt="i" /></a>
                            </span></li>
                            </ul> */}
                            
                            
                            <ul className="nav-tp-rt">
                            
                                <li><Link href="/login"><a>Login</a></Link></li>
                                <li><Link href="/signup"><a>join</a></Link></li>
                            </ul>
                            </div>
                            <div className="nav-it-bot">
                            <div className="field has-addons">
                                <div className="control">
                                    <input className="input is-shadowless" type="text" placeholder="Search by store - Fastest paying cashback site"/>
                                </div>
                                <div className="control">
                                    <a className="button is-btn-srch"><i className="fa fa-search"></i></a>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    
                    </div>
                </div>
                
               
                
                
                <nav className="" role="navigation" aria-label="main navigation">
                <div className="header-bot-in">
                    <div className="container">
                    <div className="">
                       
                        <a role="button" className="navbar-burger burger sm-menu" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div  className="navbar-menu">
                    <ul>
                            <li><Link href="/sharbing-software"><a className="navbar-item">Sharbing Software</a></Link></li>
                            
                            <li className="navbar-item has-dropdown is-hoverable">
                                <Link href="">
                                <a aria-haspopup="true"  aria-controls="dropdown-menu" className="navbar-link">
                                Gambling Cashback Offers
                               
                                </a></Link>
                                <div className="navbar-dropdown flipInY animated" role="menu">
                                    
                                    <Link href="/cashback-bonuses"><a className="navbar-item">Cashback On Your Losses</a></Link>
                                    <hr className="dropdown-divider has-background-light"></hr>
                                    <Link href="/cashback-bonuses"><a className="navbar-item">Fixed Cashback Deals</a></Link>
                                    <hr className="dropdown-divider has-background-light"></hr>
                                </div>
                            </li>
                            
                            <li className="navbar-item has-dropdown is-hoverable">
                                <Link href="">
                                <a aria-haspopup="true"  aria-controls="dropdown-menu" className="navbar-link">
                                Turnover Cashback
                               
                                </a></Link>
                                <div className="navbar-dropdown flipInY animated" role="menu">
                                    
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
                            </li>
                            <li><Link href="/free-arbs"><a className="navbar-item">Free Arbs</a></Link></li>
                            <li><Link href="/learn-sports-arbitrage"><a className="navbar-item">Learn Sports Arbitrage</a></Link></li>
                            <li className="navbar-item has-dropdown is-hoverable">
                                <Link href="">
                                <a aria-haspopup="true"  aria-controls="dropdown-menu" className="navbar-link">
                                Tools
                               
                                </a></Link>
                                
                                <div className="navbar-dropdown flipInY animated" role="menu">
                                    
                                    <Link href="/arbitrage-calculators"><a className="navbar-item">Arbitrage Calculators</a></Link>
                                    <hr className="dropdown-divider has-background-light"></hr>
                                    
                                </div>
                            </li>
                            <li><Link href="/affiliates"><a className="navbar-item">Affiliates</a></Link></li>
                            
                        </ul>
                    </div>
                        
                    </div>
                </div>
                </nav>
           </div> 
        )
    }
})





