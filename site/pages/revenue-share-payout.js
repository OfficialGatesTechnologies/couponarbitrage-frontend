import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Router from 'next/router'
import axios from 'axios';
import { site_name, apiUrl, paymentMethod, ARR_CASHBACK_CLAIMS_STATUS } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from '../components/my-account/My-account-top';
import CustomLoader from '../components/Custome-loader';
import ReactTooltip from 'react-tooltip';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import renderHTML from 'react-render-html';
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class RevenueSharePayouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            arrList: [],
            unconfirmedList: [],
            paidList: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            totalPaid: [],
            pendingTotal: [],
            loading: false,
            checkPayout: [],
            isPaymentMethodUpdated: false
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                let isPaymentMethodUpdated = false;
                let userData = res.data;
                if (userData.bankAccountNumber && userData.bankAccountSortCode) isPaymentMethodUpdated = true;
                if (userData.accountSkrillEmail) isPaymentMethodUpdated = true;
                if (userData.accountNetellerEmail) isPaymentMethodUpdated = true;
                if (userData.accountPaypalEmail) isPaymentMethodUpdated = true;
                this.setState({ userData: userData, isPaymentMethodUpdated: isPaymentMethodUpdated });
            }).catch(() => {
                Router.push(`/signin`);
            })
        this.getEarnings(1);
    }

    getEarnings = (page) => {
        const { pageLimit, status } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        let listUrl = apiUrl + 'account/rcb-earnings?cb_type=2&pageLimit=' + pageLimit + '&page=' + page;
        if (status) { listUrl += '&status=' + status; }
        axios.get(listUrl).then(res => {
            this.setState({
                arrList: res.data.results,
                unconfirmedList: res.data.unconfirmedList,
                paidList: res.data.paidList,
                totalRecords: res.data.totalCount,
                paidTotal: res.data.totalPaid,
                pendingTotal: res.data.totalUnconfirmed,
                checkPayout: res.data.checkPayout,
                loading: false,

            });
        }).catch(() => {

        })
    }
    handlePayoutSubmit = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.post(apiUrl + 'account/payout-request', {
            cb_type: 2,
            value: this.state.pendingTotal[0] ? this.state.pendingTotal[0].sum : 0,
        }).then((result) => {
            let successMsg = result.data.msg;
            toast.success(successMsg, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 13
            });
            this.getEarnings(1);
        }).catch(error => {

            let errorMsg = error.response.data.msg;
            toast.error(errorMsg, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 13
            });
        });

    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | My Account-Payouts</title>
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
                </div>
                <div className="inner-wrapper">
                    <div className="container">
                    <MyAccountTop userData={this.state.userData} />
                        <MyAccountMidMenu />
                        <div className="fwid mg-t-40">
                            <div className="fwid new-title has-text-left">
                                <h1><span className="tables-title">Account Payouts</span></h1>
                            </div>
                            <div className="bg-white is-inline-block is-fullwidth pd-20">
                                <div className="columns">
                                    <div className="column is-7">
                                 
                                        <p className="fon-18">You can add or update your payment details in the <Link href="/payment-details"><a className="has-green has-text-weight-bold">'Payment Details'</a></Link>section of your account. You can then request any confirmed cashback to be paid out to your preferred payment method by clicking <b>'Payout'</b> below.</p><br />
                                        <p className="fon-18">Your confirmed cashback eligible for payout is shown below:</p>
                                    </div>
                                    <div className="column is-5">
                                        <div className="green-box-detail">
                                        <span>Pending Amount</span>:&nbsp;£{this.state.pendingTotal[0]?this.state.pendingTotal[0].sum:0}<br />
                                            <span>Current Balance</span>:&nbsp;£{this.state.pendingTotal[0]?this.state.pendingTotal[0].sum:0}<br />
                                            <span>Total Cash Back Received</span>:&nbsp;£{this.state.paidTotal && this.state.paidTotal[0]?this.state.paidTotal[0].sum:0}<br />
                                            <span>E-mail Address</span>:&nbsp; <Link href="#"><a>{this.state.userData.email}</a></Link>
                                        </div>
                                        {
                                            this.state.isPaymentMethodUpdated === false ? <div className="mg-t-20">
                                                <p>Update your<Link href="/payment-details"><a className="has-green"> "Payment Details" </a></Link> to payout.</p>
                                            </div> : ''
                                        }
                                        {
                                            this.state.isPaymentMethodUpdated && this.state.checkPayout.length == 0 && this.state.pendingTotal.length > 0 ?

                                                <div className="mg-t-20 cus-flex">
                                                    <input type="text" class="input cus-input" value={this.state.pendingTotal[0] ? this.state.pendingTotal[0].sum : 0} name="subscriberEmail" disabled />
                                                    <button class="btn purple-btn" value="true" type="submit" onClick={this.handlePayoutSubmit} name="payBtn">Payout</button>
                                                </div>

                                                : ''
                                        }
                                        {
                                            this.state.checkPayout.length > 0 ? <div className="mg-t-20 cus-flex"><p style={{ color: '#a50005' }}>Your Withdrawal request is being processed</p> </div> : ''
                                        }
                                    </div>
                                </div>
                                <div className="is-relative">
                                    <div className="fwid texts-box">
                                        <div className="fwid free-arbs-menus">
                                            <ul role="tablist" className="no-style clearfix">
                                                <li className=" " role="presentation">
                                                    <Link href="/payout"><a title="Cashback & Bonuses">Cashback & Bonuses</a></Link>
                                                </li>
                                                <li className="active" role="presentation">
                                                    <Link href={`/revenue-share-payout`} as={`/revenueshare-payout`}><a title="Revenue Share Cashback">Revenue Share Cashback</a></Link>
                                                </li>
                                                <li className="" role="presentation">
                                                    <Link href={`/turnover-payout-skrill`} as={`/turnover-payout/skrill`}><a title="Turnover Cashback">Turnover Cashback</a></Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white is-inline-block is-fullwidth">
                                    <div className="fwid mg-15 cus-border">
 
                                        <div className="table-sec table-responsive">
                                            <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <td className="has-text-grey">Merchant</td>
                                                        <td className="has-text-grey">Username <span className="pending_img"></span></td>
                                                        <td className="has-text-grey">Registration Date <span className="confirmed_img"></span></td>
                                                        <td className="has-text-grey" >Status <span className="paid_img"></span></td>
                                                        <td className="has-text-grey" >Cashback <span className="paid_img"></span></td>
                                                    </tr>
                                                </thead>
                                                <tbody className="has-text-grey border-td">
                                                {
                                                            this.state.loading ?
                                                                <tr>
                                                                    <td colspan="5" style={{ textAlign: 'center' }}>
                                                                        <CustomLoader type="list" />
                                                                    </td>
                                                                </tr> :
                                                                this.state.arrList.length > 0
                                                                    ?
                                                                    this.state.arrList.map(function (dataRow) {
                                                                        return <tr>
                                                                            <td>
                                                                                {dataRow.aff_id ? dataRow.aff_id.name : ''} - {dataRow.store_id ? dataRow.store_id.title : ''}                  
                                                                            </td>
                                                                            <td> {dataRow.user_id ? dataRow.user_id.username : ''}</td>
                                                                            <td>{dataRow.date_applied ? dataRow.date_applied.slice(0, 10) : ''} </td>
                                                                            <td>{dataRow.status ? renderHTML(ARR_CASHBACK_CLAIMS_STATUS[dataRow.status]) : ''}</td>
                                                                            <td>{dataRow.amount ? dataRow.amount : ''}%</td>                                                                                                         
                                                                        </tr>
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td colspan="5" style={{ textAlign: 'center' }}>No records found</td>
                                                                    </tr>
                                                        }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Payments Settled */}
                                    <div className="fwid mg-15 cus-border">
                                        <div className="table-title text-left">
                                            <h4>Payments Settled</h4>
                                        </div>
                                        <div className="table-sec table-responsive">
                                            <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                       
                                                        <td className="has-text-grey">Date Settled <span className="pending_img"></span></td>
                                                        <td className="has-text-grey">Type<span className="confirmed_img"></span></td>
                                                        <td className="has-text-grey" >Payment Method <span className="paid_img"></span></td>
                                                        <td className="has-text-grey" >Amount <span className="paid_img"></span></td>
                                                    </tr>
                                                </thead>
                                                <tbody className="has-text-grey border-td">

                                                {
                                                            this.state.loading ?
                                                                <tr>
                                                                    <td colspan="5" style={{ textAlign: 'center' }}>
                                                                        <CustomLoader type="list" />
                                                                    </td>
                                                                </tr> :
                                                                this.state.paidList.length > 0
                                                                    ?
                                                                    this.state.paidList.map(function (dataRow) {
                                                                        return <tr>
                                                      
                                                                        <td>{dataRow.revenueCreditPaid ? dataRow.revenueCreditPaid.slice(0, 10) : ''}</td>
                                                                      
                                                                        <td>{dataRow.revenueCreditType}</td>
                                                                        <td>{paymentMethod[dataRow.revenueCreditPaymentType]}</td>
                                                                        <td>£{dataRow.revenueCreditAmount}</td>
                                                                    </tr>
                                                                    })
                                                                    :
                                                                    <td colspan="5" style={{ textAlign: 'center' }}>You do not have any payments settled.</td>
                                                        }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Payments Pending */}
                                    <div className="fwid mg-15 cus-border">
                                        <div className="table-title text-left">
                                            <h4>Payments Pending</h4>
                                        </div>
                                        <div className="table-sec table-responsive">
                                            <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        
                                                        <td className="has-text-grey">Added<span className="pending_img"></span></td>
                                                        <td className="has-text-grey">Type<span className="confirmed_img"></span></td>

                                                        <td className="has-text-grey" >Amount <span className="paid_img"></span></td>
                                                    </tr>
                                                </thead>
                                                <tbody className="has-text-grey border-td">
                                                {
                                                            this.state.loading ?
                                                                <tr>
                                                                    <td colspan="5" style={{ textAlign: 'center' }}>
                                                                        <CustomLoader type="list" />
                                                                    </td>
                                                                </tr> :
                                                                this.state.unconfirmedList.length > 0
                                                                    ?
                                                                    this.state.unconfirmedList.map(function (dataRow) {
                                                                        return <tr>
                                                      
                                                                        <td>{dataRow.revenueCreditAdded ? dataRow.revenueCreditAdded.slice(0, 10) : ''}</td>
                                                                        <td>{dataRow.revenueCreditType}</td>
                                                                        <td>£{dataRow.revenueCreditAmount}</td>
                                                                    </tr>
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td colspan="3" style={{ textAlign: 'center', display: 'none' }}>You do not have any payments settled.</td>
                                                                    </tr>
                                                        }
                                                    
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
    }
});


