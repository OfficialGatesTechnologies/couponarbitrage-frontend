 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
 
const disclaimer = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Privacy policy</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="log-bg">
                <img src="static/images/backgrounds/log-bg.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>Disclaimer</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="inner-wrapper full-width">
        <div className="container">
                <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-mobile is-variable is-0">
                                <div className="fwid top-box bg-green is-fullwidth">
                                    
                                        <div className="fwid"> <span className="box-white-line">&nbsp;</span>
                                        <h1 className="box-head">Disclaimer </h1>
                                        </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="fwid fm-white-top pd-30 is-inline-block is-fullwidth">
                        <div className="fwid bot-box pd-30">
                        <div className="arrow-lines">
                        <ul className="no-style">
                                                <li><p>The provision of arbitrage opportunities ("Service") 
                            is provided to you ("User") by Couponarbitrage.com      
                        ("Provider") for a contracted period of time      ("Subscription 
                        Period").</p>
                                        </li>
                                        <li>
                                        <p>The Provider can in no way be held responsible for 
                        any      losses or consequential losses arising from the use of this 
                        Service.      Users may have individual problems with bookmakers when 
                        trying to      place their bets. Bookmakers reserve their right to not 
                        accept the      bet at the stated price.</p>
                                        </li>
                                        <li>
                                        <p>The User may not sell, or pass on in any way, to any 
                            person or persons, any information supplied by the Provider. The   
                        information provided by the Provider can only be used to place bets  
                            with established online or high street bookmakers.</p>
                                        </li>
                                        <li>
                                        <p>The Provider reserves the right to immediately      
                        terminate your use of, or access to, the Service at any time if the     
                        Provider decides at its sole discretion that you have engaged in      
                        conduct that the Provider considers to be inappropriate or      
                        unacceptable.</p>
                                        </li>
                                        <li>
                                        <p>Neither Couponarbitrage.com nor anyone associated 
                        with      Couponarbitrage.com accepts any responsibility whatsoever for 
                        any      loss that may be sustained as a result of the use (or misuse) 
                        of the      service, irrespective of how that loss might be sustained. 
                        Our Service will display potential palpable errors. These bets may be 
                        voided by the relevant bookmaker. Please check bets advised by our 
                        Service before placing the bet in case the odds have changed since the 
                        original alert or there has been a scanning error.</p>
                                        </li>
                                        <li>
                                        <p>Betting can be very risky and users should only      
                        speculate with money they can comfortably afford to lose and should     
                        ensure that the risks involved are fully understood, seeking advice    
                        if necessary.</p>
                                        </li>
                                        <li>
                                        <p>English law exclusively governs these terms and      conditions and only the English courts will adjudicate any disputes.</p>
                                        </li>
                                        </ul>
                </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
        
        <Footer />
    </div>
  )

export default disclaimer;

