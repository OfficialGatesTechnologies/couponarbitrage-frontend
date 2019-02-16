import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from'../components/my-account/my-account-top';

import Link from 'next/link';

const Activity = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Activity</title>
            
           
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="inner-brd-crmp">
        <ul>
            <li>
            <Link href="/"><a>Home</a></Link></li>
            <li>
            <Link href="javascript:void(0);"><a>My Account</a></Link>
            </li>
        </ul>
        </div>
            {/* <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                    <h4><a href="/">Home</a>&nbsp; / &nbsp;<b>Trunover Cashback</b>&nbsp; /&nbsp;<b>My Account</b></h4>
                </div>
                <div className="banner-layer innerban-layer">&nbsp;</div>
                <div className="innerban-img"> <img src="/static/images/banner/eco-innerbanner.png" alt="Ecopayz Cashback Scheme" /></div>
            </div> */}
        </div>

        <div className="inner-wrapper">
            <div className="container">
                <MyAccountTop />
                <MyAccountMidMenu />
                
                
                <div className="fwid mg-t-40">
                <div className="fwid new-title has-text-left">
                    <h1><span className="tables-title">Activity</span></h1>
                </div>
                <div className="bg-white is-inline-block is-fullwidth">
                <div className="fwid mg-20 cus-border">
                <div className="table-title text-left">
                    <h4>Activity Schedule</h4>
                </div>
                <div className="table-sec table-responsive">
                        <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr>
                              <td>Activites</td>
                              <td>Date <span className="pending_img"></span></td>
                              <td>Value <span className="confirmed_img"></span></td>
                              <td>Status <span className="paid_img"></span></td>
                             
                            </tr>
                          </thead>
                          <tbody className="has-text-grey border-td">
                              <tr>
                                  <td>Cashback Payout Request</td>
                                  <td>02/05/2019</td>
                                  <td>£1.00</td>
                                  <td><span className="tag is-warning">Pending</span></td>
                              </tr>
                              <tr>
                                  <td>Cashback Payout Request</td>
                                  <td>02/05/2019</td>
                                  <td>£50.00</td>
                                  <td><span className="tag is-danger">Cancelled</span></td>
                              </tr>
                              <tr>
                                  <td>App Subscribtion Using Cashback</td>
                                  <td>02/05/2019</td>
                                  <td>£100.00</td>
                                  <td><span className="tag is-info">Subscribed</span></td>
                              </tr>
                              <tr>
                                  <td>Cashback Payout Request</td>
                                  <td>02/05/2019</td>
                                  <td>£1.00</td>
                                  <td><span className="tag is-success">Confirmed</span></td>
                              </tr>
                              <tr>
                                    <td colspan="5" style={{textAlign: 'center', display: 'none'}}>No records found</td>
                              </tr>
                                                        </tbody>
                        </table>
                      </div>
                </div>
                </div>
                
                </div>
                

            </div>

        </div>

        <Footer />
    </div>
)

export default Activity;

