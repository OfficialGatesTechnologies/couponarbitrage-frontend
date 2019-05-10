 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
 
const sitemap = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Sitemap</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="log-bg">
                <img src="static/images/backgrounds/log-bg.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>Sitemap</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="inner-wrapper full-width">
        <div className="container">
                <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-variable is-0">
                                <div className="fwid top-box bg-green is-fullwidth">
                                    
                                        <div className="fwid"> <span className="box-white-line">&nbsp;</span>
                                        <h1 className="box-head">Sitemap</h1>
                                        </div>
                                    
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className="fwid bot-box is-inline-block is-fullwidth">
                            <div className="fwid fm-white-top pd-30">
                                <div className="nav sitemap-nav">
                                    <div className="columns">
                                        <div className="column">
                                            <ul className="no-style">
                                                <li><Link href="/"><a>Home</a></Link></li>
                                                <li><Link href="#!"><a className="parentmenu-one" id="">Gambling Cashback Offers</a></Link> 
                                                <ul className="no-style">
                                                    <li><Link href="/cashback-bonuses"><a>Cashback On Your Losses</a></Link></li>
                                                    <li><Link href="/cashback-bonuses"><a>Fixed Cashback Deals</a></Link></li>
                                                </ul>
                                                </li>
                                                <li><Link href="#!"><a className="parentmenu-one" id="3">Turnover Cashback</a></Link> 
                                                <ul className="no-style">
                                                    <li><Link href="/ecopayz-cashback-scheme-page"><a>Ecopayz Cashback Scheme</a></Link></li>
                                                    <li><Link href="/ecopayz-cashback-scheme-page"><a>Skrill Cashback Scheme</a></Link></li>
                                                    <li><Link href="/ecopayz-cashback-scheme-page"><a>SBOBET Cashback Program</a></Link></li>
                                                    <li><Link href="/ecopayz-cashback-scheme-page"><a>Neteller Cashback Scheme</a></Link></li>
                                                    <li><Link href="/ecopayz-cashback-scheme-page"><a>Asianconnect Cashback</a></Link></li>
                                                </ul>
                                                </li>
                                                <li><Link href="/free-arbs"><a>Free Arbs</a></Link></li>
                                                <li><Link href="/learn-sports-arbitrage"><a>Learn Sports Arbitrage</a></Link></li>
                                                <li><Link href="#!"><a className="parentmenu-one" id="3">Tools</a></Link> 
                                                <ul className="no-style">
                                                    <li><Link href="/arbitrage-calculators"><a>Arbitrage Calculators</a></Link></li>
                                                    
                                                </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="column">
                                        <ul className="no-style">
                                                <li><Link href="/about"><a>About Us</a></Link></li>
                                                <li><Link href="/privacy"><a>Privacy policy</a></Link></li>
                                                <li><Link href="/contact"><a>Contact</a></Link></li>
                                                <li><Link href="/faq"><a>FAQs</a></Link></li>
                                                <li><Link href="/disclaimer"><a>Disclaimer</a></Link></li>
                                                <li><Link href="/signup"><a>Sign up</a></Link></li>
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        
        <Footer />
    </div>
  )

export default sitemap;

