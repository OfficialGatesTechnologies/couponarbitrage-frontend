 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';

 
const about = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | About</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
            <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>About Us</a></Link></li>
                </ul>
            </div>
        </div>
        <div className="inner-wrapper full-width">
        <div className="container">
                <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-variable is-0">
                                <div className="fwid top-box bg-green is-fullwidth">
                                    
                                        <div className="fwid"> <span class="box-white-line">&nbsp;</span>
                                        <h1 class="box-head">About us </h1>
                                        </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div class="fwid fm-white-top pd-30">
                        <div class="fwid bot-box">
                            <div class="fwid fm-white-top pd-30 has-text-grey about-sec">
                                <p><span style={{fontWeight: 'bold'}}>Welcome to Coupon Arbitrage!</span>
                                </p>
                                <p>We started out in 2010 as simply an arbitrage alert service, scanning betting ‘coupons’ available in UK high street shops against online betting odds for high value arbs – hence the name; Couponarbitrage.com.&nbsp;</p>
                                <p>Since then we have reached out into other areas to try and turn the tables on the sportsbook, casino and bingo sites to bring back as much value as possible for all the gambling enthusiasts who use our site.</p>
                                <p>We offer a variety of cashback/incentive schemes for new and existing customers with the aim of clawing back some of the margins imposed by gaming sites. By using our incentive schemes; from fixed amounts of <Link href="http://www.couponarbitrage.com/cashback-bonuses"><a 
                                    target="">cashback</a></Link> for setting up new accounts, cashback on your <Link href="http://www.couponarbitrage.com/revenue-share-cashback"><a  target="">monthly losses</a></Link> and cashback on your betting turnover such as <Link href="http://www.couponarbitrage.com/sbobet-cashback"><a 
                                    target="">SBOBET cashback</a></Link>  or cashback on your financial transactions such as <Link href="http://www.couponarbitrage.com/neteller-cashback"><a  target="">NETELLER cashback</a></Link>, you are able to gain an extra edge over the bookies, giving you
                                    a better chance of making a healthy profit every month.</p>
                                <p>Our sports arbitrage guides explain everything there is to know about sports arbitrage or ‘arbing’ from all the theory and practical advise to our free to use <Link href="http://www.couponarbitrage.com/back-lay-calculator"><a target="_blank">arbitrage calculators</a></Link>;
                                    whether you’re a complete beginner or a seasoned pro, we hope you’ll be able to learn something new by reading our site. We also provide a <Link href="http://www.couponarbitrage.com/free-arbs"><a  target="">free arbs</a></Link> live interface, allowing
                                    you to make money with absolutely no subscription costs at all.</p>
                                <p>Finally, in keeping with the origins of our site, we recently re-launched our much improved&nbsp;<Link href="https://couponarbitrage.com/sharbing-software"><a target="">sharbing software app</a></Link>. Once installed, you’ll have access to shop arbs and
                                    odds comparison from all the UK high street bookies.</p>
                                <p>We wish you all the best in your betting endeavours and we hope you find our site enjoyable and profitable to use!</p>
                                <p>Coupon Arbitrage Team</p>
                                <div>
                                    <br/>
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

export default about;

