import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from'../components/my-account/my-account-top';
import NavigationWhyNotTry from '../components/my-account/myaccountsitenav';
import Link from 'next/link';

const Earnings = (props) => (
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
            <Link href="/"><a className="">Home</a></Link></li>
            <li>
            <Link href="javascript:void(0);"><a className="">My Account</a></Link>
            </li>
        </ul>
        </div>
            {/* <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                    <h4>className=" href="/">Home</a>&nbsp; / &nbsp;<b>Trunover Cashback</b>&nbsp; /&nbsp;<b>My Account</b></h4>
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
                        <h1><span className="tables-title">Your Earnings</span></h1>
                    </div>
                    <div className="bg-white is-inline-block is-fullwidth pd-20">
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
                            <span>E-mail Address</span>:&nbsp; <Link href="#"><a>manigandan.g@officialgates.com</a></Link>
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
                                            <Link href="/turnover-skrill"><a title="Payout">Turnover Cashback</a></Link>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="is-bg-gray is-inline-block is-fullwidth pd-20">
                    <div className="columns">
                        <div className="column is-9">
                        <div className="bg-white">
                        <div className="table-title text-left">
                            <h4>Earnings</h4>
                        </div>
                        <div className="table-filter text-left">
                        <div className="level">
                            <div className="level-item">
                            <span className="pay-fil">FILTER:</span>
                            </div>
                            <div className="level-item border-right-c0">
                            <div className="field">
                            <div className="control">
                            <div className="checkbox join-check-wrap">
                            <label className="font-16"><input type="checkbox" className="fm-check" /><span className="cr chck-bor bor-rad"><i className="cr-icon pur-color fas fa-check"></i></span><span className="has-text-weight-bold has-orange">Pending</span>
                            <div className="fil-rate">
                                <span>£0.00</span>
                            </div>
                            </label>
                            
                            </div></div></div>
                            </div>
                            <div className="level-item border-right-c0">
                            <div className="field">
                            <div className="control">
                            <div className="checkbox join-check-wrap">
                            <label className="font-16"><input type="checkbox" className="fm-check" /><span className="cr chck-bor bor-rad"><i className="cr-icon pur-color fas fa-check"></i></span><span className="has-text-weight-bold has-orange">Confirmed</span>
                            <div className="fil-rate">
                                <span>£0.00</span>
                            </div>
                            </label>
                            
                            </div></div></div>
                            </div>
                            <div className="level-item border-right-c0">
                            <div className="field">
                            <div className="control">
                            <div className="checkbox join-check-wrap">
                            <label className="font-16"><input type="checkbox" className="fm-check" /><span className="cr chck-bor bor-rad"><i className="cr-icon pur-color fas fa-check"></i></span><span className="has-text-weight-bold has-green">Paid</span>
                            <div className="fil-rate">
                                <span>£0.00</span>
                            </div>
                            </label>
                            
                            </div></div></div>
                            </div>
                            <div className="level-item">
                            <div className="field">
                            <div className="control">
                            <div className="checkbox join-check-wrap">
                            <label className="font-16"><input type="checkbox" className="fm-check" /><span className="cr chck-bor bor-rad"><i className="cr-icon pur-color fas fa-check"></i></span><span className="has-text-weight-bold">Declined</span>
                            <div className="fil-rate">
                                <span>£0.00</span>
                            </div>
                            </label>
                            
                            </div></div></div>
                            </div>
                        </div>
                        </div>
                        <div className="table-sec table-responsive">
                        <table className="table new-table emptys-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr>
                              <td className="has-text-grey">Merchant</td>
                              <td className="has-text-grey">Date <span className="pending_img"></span></td>
                              <td className="has-text-grey">Cashback <span className="confirmed_img"></span></td>
                              <td className="has-text-grey">Comments <span className="paid_img"></span></td>
                              {/* <!--<td>Total</td>--> */}
                            </tr>
                          </thead>
                          <tbody className="has-text-grey">
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

export default Earnings;

