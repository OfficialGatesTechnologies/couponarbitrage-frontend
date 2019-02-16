import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from'../components/my-account/my-account-top';
import Link from 'next/link';

const TurnoverAsianConnectEarning = (props) => (
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
                                            <li className=" " role="presentation">
                                            <Link href="/earnings"><a title="OverviCashback & Bonusesew">Cashback & Bonuses</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/revenue-share-earnings"><a title="Revenue Share Cashback">Revenue Share Cashback</a></Link>
                                            </li>
                                            <li className="active" role="presentation">
                                            <Link href="/turnover-skrill"><a title="Turnover">Turnover Cashback</a></Link>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                        </div>
                        <hr/>
                        <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="" role="presentation">
                                            <Link href="/turnover-skrill"><a title="Skrill">Skrill</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/turnover-sbobet"><a title="SBOBet">SBOBet</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/turnover-neteller"><a title="Neteller">Neteller</a></Link>
                                            </li>
                                            <li className="active" role="presentation">
                                            <Link href="/turnover-asian-connect"><a title="Neteller">AsianConnect88</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/turnover-ecopayz"><a title="Ecopayz">Ecopayz</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                        <div className="bg-white is-inline-block is-fullwidth">
                <div className="fwid mg-15-6 cus-border">
                {/* <div className="table-title text-left">
                    <h4>Merchant</h4>
                </div> */}
                <div className="table-sec table-responsive">
                        <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                          <thead>
                            <tr>
                              <td className="has-text-grey">Paid On</td>
                                                           
                              <td className="has-text-grey" >Paid <span className="paid_img align-middle"><img src="/static/images/icons/info-round.png" alt="info" /></span></td>
                              <td className="has-text-grey" >Total </td>
                            </tr>
                          </thead>
                          <tbody className="has-text-grey border-td">
                              
                              <tr>
                                    <td colspan="3" style={{textAlign: 'center'}}>No records found</td>
                              </tr>
                            </tbody>
                        </table>
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

export default TurnoverAsianConnectEarning;


