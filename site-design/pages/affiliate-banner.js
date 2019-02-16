

import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
const AffiliatesBanner = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Affiliate Banner</title>

        </Head>
        <HeaderIn />
        <div className="container">
        <div className="columnns">
            <div className="column">
            <div className="dash-menu pd-t-b-15">
            <div className="cbk-at-list">
              <ul>
                  <li><Link href="/affiliate-dashboard"><a>Dashboard</a></Link>
                  </li>
                  <li className="active"><Link href="/affiliate-banner"><a>Banners</a></Link>
                  </li>
                  <li><Link href="/affiliate-earnings"><a>Earnings</a></Link>
                  </li>
                  <li><Link href="/affiliate-payout"><a>Payout</a></Link>
                  </li>

              </ul>
          </div>
          </div>
            
            </div>
        </div>
          </div>
          <div className="container">
          <div className="column">
          <h3 className="dash-title mg-b-20">Banners</h3>
          </div>
            <div className="columns">
              <div className="column is-12">
                <div className="bg-white pd-20">
                <div className="dash-banner-in">
                            <h4>Marketing Group: cashback</h4>
                            <div className="dash-banner-body">
                                <ul className="list-group">

                                    <li className="list-group-item"><img src="/static/images/banner/aff_banner.jpg" />
                                    <b>Source Code - Copy/Paste Into Your Website</b>
                                    <div className="hero is-light">
                                    <div className="highlight">
                                    <textarea className="input has-background-light textarea" readOnly>&lt;a href="https://www.couponarbitrage.com/cashbackref/gman" target="_blank" rel="nofollow"&gt;&lt;img style="border:0px" src="https://www.couponarbitrage.com/uploads/banner/"  alt="cashback"&gt;&lt;/a&gt;</textarea>
                                    </div>
                                       
                                    </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="dash-banner-in">
                            <h4>Marketing Group: App Subscription</h4>
                            <div className="dash-banner-body">
                                <ul className="list-group">

                                    <li className="list-group-item"><img src="/static/images/banner/aff_banner_01.jpg" />
                                    <b>Source Code - Copy/Paste Into Your Website</b>
                                    <div className="hero is-light">
                                    <div className="highlight">
                                    <textarea className="input has-background-light textarea" readOnly>&lt;a href="https://www.couponarbitrage.com/appsubscribe/gman" target="_blank" rel="nofollow"&gt;&lt;img style="border:0px" src="https://www.couponarbitrage.com/uploads/banner/" width="250" height="250" alt="App Subscription"&gt;&lt;/a&gt;</textarea>
                                    </div>
                                       
                                    </div>
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

export default AffiliatesBanner;
