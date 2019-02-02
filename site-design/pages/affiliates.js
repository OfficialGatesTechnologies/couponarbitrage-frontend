 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
const Affiliates = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Affiliates</title>
             
        </Head>

        <HeaderIn />
        <div className="aff-bg">
        <div className="container">
        <div className="inner-wrapper full-width">
            <div className="aff-wrap">
                <div className="aff-ttl">Coupon Arbitrage Affiliates</div>
                <div className="aff-sec-01">
                    <div className="aff-banner">
                    <Link href="/login"><a><img src="static/images/backgrounds/affiliate-banner.jpg"/></a></Link>
                    </div>
                    <div className="aff-para">
                    <p>Join the Coupon Arbitrage affiliate programe and earn commission for referring new subscribers to our sharbing app along with commission across all our cashback deals.</p>
                    </div>
                    <div className="aff-sec-01-dvd">
                    <div className="columns">
                        <div className="column">
                            <h4>SIGN UP TODAY AND START PROMOTING</h4>
                            <p>Once you become a Coupon Arbitrage affiliates you will..</p>
                            <ul>
                                <li>Earn 20% of your referrals sharbing app subscription cost</li>
                                <li>Earn 5% of your referrals cashback claims</li>
                                <li>Access to banners and marketing materials</li>
                                <li>View your statistics to track referrals activity</li>
                                <li>Earn unlimited amounts every month</li>
                            </ul>
                        </div>
                        <div className="column">
                        <img src="static/images/logo-affiliate.png"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="aff-sec-02">
                    <div className="aff-sec-02-dvd">
                        <div className="columns">
                        <div className="column">
                            <h4>SHARBING SOFTWARE APP - 20% COMMISSION</h4>
                            <ul>
                                <li>Advertise the world's only sharbing app to earn a very generous commission</li>
                                <li>Our subscription packages range from £10 to £449 and you will earn 20% of any sbuscription that come from your referrals</li>
                                <li>That means by promoting our sharbing app you could earn as much as £90 per referral!</li>
                            </ul>
                            <Link href="/login"><a className="jo-btn">Join Now</a></Link>
                        </div>
                        <div className="column has-text-centered">
                        <img src="static/images/others/sharb-app.png"/>
                        </div>
                        </div>
                    </div>
                    <div className="aff-sec-02-dvd">
                        <div className="columns">
                        <div className="column">
                            <h4>GAMBLING CASHBACK - 5% COMMISSION</h4>
                            <ul>
                                <li>Our highly popular cashback deals are an easy sell to your refferrals as there is no cost invloved to take part.</li>
                                <li>By using our links instead of going direct to the gaming site, your refferals will earn a very generous cashback bonus</li>
                                <li>You will earn 5% of any cashback generated, for life!</li>
                            </ul>
                            <Link href="/login"><a className="jo-btn">Join Now</a></Link>
                        </div>
                        <div className="column has-text-centered">
                        <img src="static/images/others/gamb-off.png"/>
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

export default Affiliates;

