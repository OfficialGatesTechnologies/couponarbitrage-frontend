import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from '../components/my-account/my-account-top';
import Link from 'next/link';
import jsCookie from 'js-cookie';
export default withRouter(class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            userStats: []
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                this.setState({ userData: res.data });
            }).catch(() => {
                Router.push(`/signin`);
            })
        this.getDashboardStats();
    }

    getDashboardStats = () => {
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'account/stats').then(res => {
            this.setState({ userStats: res.data });
        }).catch(() => {

        })
    }
    render() {
        const { userStats } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | My Account</title>
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
                </div>
                <div className="inner-wrapper">
                    <div className="container">
                        <MyAccountTop userData={this.state.userData} />
                        <MyAccountMidMenu />
                        <div className="fwid purple-txt mg-t-40">
                            <div className="bg-white colors-box">
                                <div className="bread-crumbs-wrap">
                                    <div className="fwid two-box bread-crumbs">
                                        <h3 className="bread-title">Account Overview</h3>
                                        <div className="fwid pd-t-b-4 mg-t-20">
                                            <h4 className="has-text-grey is-variable table-top-head is-2">Cashback &amp; Bonuses</h4>
                                            <div className="table-sec table-responsive">
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>
                                                            <td><span>Total Confirmed</span></td>
                                                            <td><span>Total Payable</span></td>
                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">£{userStats.totalUnconfirmCB && userStats.totalUnconfirmCB[0] ? userStats.totalUnconfirmCB[0].sum : 0}</span></td>
                                                            <td><span className="bfont">£{userStats.totalConfirmedCB && userStats.totalConfirmedCB[0] ? userStats.totalConfirmedCB[0].sum : 0}</span></td>
                                                            <td><span className="bfont">£{userStats.totalPayableCB && userStats.totalPayableCB[0] ? userStats.totalPayableCB[0].sum : 0}</span></td>
                                                            <td><span className="bfont">£{userStats.totalPaidCB && userStats.totalPaidCB[0] ? userStats.totalPaidCB[0].sum : 0}</span></td>
                                                            <td><Link href="/earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* Revenue Share Cashback table start */}
                                        <div className="fwid pd-t-b-4 mg-t-20">
                                            <h4 className="has-text-grey is-variable table-top-head is-2">Revenue Share Cashback</h4>
                                            <div className="table-sec table-responsive">
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>
                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">£{userStats.totalPendingRB && userStats.totalPendingRB[0] ? userStats.totalPendingRB[0].sum : 0}</span></td>
                                                            <td><span className="bfont">£{userStats.totalPaidRB && userStats.totalPaidRB[0] ? userStats.totalPaidRB[0].sum : 0}</span></td>
                                                            <td><Link href="/revenue-share-earnings"><a className="slink"> <span>View all earnings</span> </a></Link></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* Turnover Cashback (Skrill) */}
                                        <div className="fwid pd-t-b-4 mg-t-20">
                                            <h4 className="has-text-grey is-variable table-top-head is-2">Turnover Cashback (Skrill)</h4>
                                            <div className="table-sec table-responsive">
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>
                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td><span className="bfont green-font">€{userStats.totalSkrillPending && userStats.totalSkrillPending[0] ? userStats.totalSkrillPending[0].sum : 0}</span></td>
                                                            <td><span className="bfont">€{userStats.totalSkrillPaid && userStats.totalSkrillPaid[0] ? userStats.totalSkrillPaid[0].sum : 0}</span></td>
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
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>
                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">€{userStats.totalEcopayPending && userStats.totalEcopayPending[0] ? userStats.totalEcopayPending[0].sum : 0}</span></td>
                                                            <td><span className="bfont">€{userStats.totalEcopayPaid && userStats.totalEcopayPaid[0] ? userStats.totalEcopayPaid[0].sum : 0}</span></td>
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
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>
                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">£{userStats.sbobetRes && userStats.sbobetRes.pendingAmount ? userStats.sbobetRes.pendingAmount : 0}</span></td>
                                                            <td><span className="bfont">£{userStats.sbobetRes && userStats.sbobetRes.paidAmount ? userStats.sbobetRes.paidAmount : 0}</span></td>
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
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>

                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">€{userStats.netellerRes && userStats.netellerRes.pendingAmount ? userStats.netellerRes.pendingAmount : 0}</span></td>
                                                            <td><span className="bfont">€{userStats.netellerRes && userStats.netellerRes.paidAmount ? userStats.netellerRes.paidAmount : 0}</span></td>
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
                                                <table className="table new-table green-tables is-fullwidth" border="0" >
                                                    <thead>
                                                        <tr>
                                                            <td><span>Total Pending</span></td>

                                                            <td><span>Total Paid</span></td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span className="bfont green-font">€{userStats.assianConnectRes && userStats.assianConnectRes.pendingAmount ? userStats.assianConnectRes.pendingAmount : 0}</span></td>
                                                            <td><span className="bfont">€{userStats.assianConnectRes && userStats.assianConnectRes.paidAmount ? userStats.assianConnectRes.paidAmount : 0}</span></td>
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
    }
});

