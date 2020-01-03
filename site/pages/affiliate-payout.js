

import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';
const AffiliatesPayout = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Affiliate Payout</title>

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
                  <li><Link href="/affiliate-banner"><a>Banners</a></Link>
                  </li>
                  <li><Link href="/affiliate-earnings"><a>Earnings</a></Link>
                  </li>
                  <li className="active"><Link href="/affiliate-payout"><a>Payout</a></Link>
                  </li>

              </ul>
          </div>
          </div>
            
            </div>
        </div>
          </div>
          <div className="container">
          <div className="column">
          <h3 className="dash-title mg-b-20">Your Earnings</h3>
          </div>
            
            <div className="dash-earn-section column is-12">   
                <div className="new-title pd-20" style={{background: '#020042'}}>
                    <h4>Account Payouts</h4>
                </div>
                <div className="pd-20 bg-white">
                <div className="columns">
                    <div className="column is-7">
                    
                        <p>You can add or update your payment details in the <Link href="/payment-details"><a className="green-txt">'Payment Details'</a></Link>section of your account. You can then request any confirmed cashback to be paid out to your preferred payment method by clicking 'Payout' below.</p>
                    </div>
                    <div className="column is-5">
                    <div className="green-box-detail">
                    <span>Pending Amount</span>:&nbsp;£0<br/>
                    <span>Current Balance</span>:&nbsp;£0<br/>
                    <span>Total Cash Back Received</span>:&nbsp;£0<br/>
                    <span>E-mail Address</span>:&nbsp; <Link href="#"><a>manigandan.g@officialgates.com</a></Link>
                    </div>
                    <div className="mg-t-20">
                            <p>Update your<Link href="/payment-details"><a className="has-green">"Payment Details"</a></Link> to payout.</p>
                            </div>
                    </div>
                    
                
                </div>
                </div>
                        
              
            </div>
            <div className="column">
            <div className="dash-earnpay-detail pd-20 mg-b-30">
            <h3>Earnings</h3>
            <div className="dash-table-sec table-responsive">
                <table className="table earnpay-table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <td>Type</td>

                            <td>Added Date <span className="confirmed_img"><img src="/static/images/icons/info-round.png" alt="Icon" /></span></td> 
                            <td>Paid Date <span className="confirmed_img"><img src="/static/images/icons/info-round.png" alt="Icon" /></span></td>
                            <td>Amount <span className="paid_img"><img src="/static/images/icons/info-round.png" alt="Icon" /></span></td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody className="has-text-grey border-td">
                        
                                            <tr>
                    <td colspan="5" style={{textAlign: 'center'}}>No records found</td>
                </tr>
                                            </tbody>
                </table></div>
            </div>
            </div>
            
          </div>

         <Footer />
    </div>
  )

export default AffiliatesPayout;
