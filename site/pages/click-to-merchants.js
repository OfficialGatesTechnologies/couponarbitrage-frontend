import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from'../components/my-account/My-account-top';
import NavigationWhyNotTry from '../components/my-account/Myaccountsitenav';
import Link from 'next/link';

const ClickToMerchants = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | My Account-Earnings</title>
            
           
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
                        <h1><span className="tables-title">Click to Merchants</span></h1>
                    </div>
                    {/* <div className="bg-white is-inline-block is-fullwidth pd-20">
                        <div className="columns">
                            <div className="column is-7">
                                <h3 className="title-purble">Cashback by Merchant</h3>
                                <p className="fon-18">Please find below the status of your transactions by merchant</p>
                            </div>
                            <div className="column is-5">
                            <div className="green-box-detail">
                            <span>Pending Amount</span>:&nbsp;£0<br/>
                            <span>Current Balance</span>:&nbsp;£0<br/>
                            <span>Total Cash Back Received</span>:&nbsp;£0<br/>
                            <span>E-mail Address</span>:&nbsp; <a href="#">manigandan.g@officialgates.com</a>
                            </div>
                            </div>
                        </div>
                        <div className="is-relative">
                        <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="active " role="presentation">
                                            <Link href="/earnings"><a title="OverviCashback & Bonusesew">Cashback & Bonuses</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/revenue-share-earnings"><a title="Revenue Share Cashback">Revenue Share Cashback</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/payout"><a title="Payout">Turnover Cashback</a></Link>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                        </div>
                    </div> */}
                    <div className="is-bg-gray is-inline-block is-fullwidth pd-20">
                    <div className="columns">
                        <div className="column is-9">
                        <div className="bg-white">
                        <div className="table-title text-left">
                            <h4>Click to Merchants</h4>
                        </div>
                        
                        <div className="table-sec table-responsive">
                        <table className="table new-table emptys-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr>
                              <td className="has-text-grey">Store Logo</td>
                              <td className="has-text-grey">Store Name <span className="pending_img"></span></td>
                              <td className="has-text-grey">Date <span className="confirmed_img"></span></td>
                              {/* <td className="has-text-grey">Comments <span className="paid_img"></span></td> */}
                              {/* <!--<td>Total</td>--> */}
                            </tr>
                          </thead>
                          <tbody className="has-text-grey border-td">
                          <tr>
                              <td><img src="static/images/others/dashcasino-similar-img.png" alt="Red Bus - Bingo"/></td>
                              <td>All British - Casino RS</td>
                              <td>02/02/2019 01:53:23</td>
                          </tr>
                          <tr>
                              <td><img src="static/images/others/dashcasino-similar-img-01.png" alt="Red Bus - Bingo"/></td>
                              <td>All British - Casino RS</td>
                              <td>02/02/2019 01:53:23</td>
                          </tr>
                            <tr>
                                <td colspan="5" style={{textAlign: 'center'}}>No records found</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                        </div>
                        
                        </div>
                        <div className="column is-3">
                       
                          
                          <NavigationWhyNotTry />
                      
                        </div>
                    </div>
                    </div>
                </div>
               
                

            </div>

        </div>

        <Footer />
    </div>
)

export default ClickToMerchants;

