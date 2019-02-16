import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from'../components/my-account/my-account-top';

import Link from 'next/link';

const MyAccount = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Learn Sports Arbitrage</title>
            
           
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
                
                <div className="fwid purple-txt mg-t-40">
                    <div className="bg-white colors-box">
                        <div className="bread-crumbs-wrap">
                            <div className="fwid two-box bread-crumbs">
                                <h3 className="bread-title">Account Overview</h3>
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Cashback &amp; Bonuses</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                        <td><span>Total Confirmed</span></td>
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">£0</span></td>
                                        <td><span className="bfont">£0</span></td>
                                        <td><span className="bfont">£0</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* Revenue Share Cashback table start */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Revenue Share Cashback table</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">£0</span></td>
                                       
                                        <td><span className="bfont">£0</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                 {/* Turnover Cashback (Skrill) */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (Skrill)</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">€0.00</span></td>
                                       
                                        <td><span className="bfont">€0.00</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* Turnover Cashback (Ecopayz) */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (Ecopayz)</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">€0.00</span></td>
                                       
                                        <td><span className="bfont">€0.00</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* Turnover Cashback (SBOBet) */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (SBOBet)</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">£0.00</span></td>
                                       
                                        <td><span className="bfont">£0.00</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* Turnover Cashback (Neteller) */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (Neteller)</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">€0.00</span></td>
                                       
                                        <td><span className="bfont">€0.00</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* Turnover Cashback (AsianConnect88) */}
                                <div className="fwid pd-t-b-4 mg-t-20">
                                <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (AsianConnect88)</h4>
                                <div className="table-sec table-responsive">
                                    <table className="table new-table green-tables is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <td><span>Total Pending</span></td>
                                       
                                        <td><span>Total Paid</span></td>
                                        <td>&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><span className="bfont green-font">€0.00</span></td>
                                       
                                        <td><span className="bfont">€0.00</span></td>
                                        <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                <div className="mg-t-20">
                                <p>The above may not include recent updates..</p>
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

export default MyAccount;

