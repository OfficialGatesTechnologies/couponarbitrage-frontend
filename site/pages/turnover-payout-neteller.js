import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Link from 'next/link';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from '../components/my-account/my-account-top';
import CustomLoader from '../components/custome-loader';
import jsCookie from 'js-cookie';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class TurnoverSkrillEarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            arrList: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            userBalance: 0,
            loading: false,
            isPaymentMethodUpdated: false,
            checkPayout: [],
            tb_type: '5b7a49f8049ac11419000054',
            scheme: 3,
            cashback_user_id: '',
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
                this.setState({
                    userData: userData,
                    isPaymentMethodUpdated: isPaymentMethodUpdated,

                });
            }).catch(() => {
                Router.push(`/signin`);
            })
        this.getEarnings(1);
    }

    getEarnings = (page) => {
        const { pageLimit, status, tb_type, scheme } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        let listUrl = apiUrl + 'account/neteller-earnings?pageLimit=' + pageLimit + '&page=' + page + '&tb_type=' + tb_type + '&scheme=' + scheme;
        if (status) { listUrl += '&status=' + status; }
        axios.get(listUrl).then(res => {
            this.setState({
                arrList: res.data.results,
                totalRecords: res.data.totalCount,
                userBalance: res.data.userBalance,
                checkPayout: res.data.checkPayout,
                loading: false,
            });
        }).catch(() => {

        })
    }
    handlePayoutSubmit = () => {
        const { tb_type, scheme } = this.state;
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.post(apiUrl + 'account/turnover-payout-request', {
            tb_type: tb_type,
            scheme: scheme,
            value: this.state.userBalance.pendingAmount ? this.state.userBalance.pendingAmount : 0,
            cashback_user_id: this.state.userBalance.netellerId,
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
        const { } = this.state;


        return (



            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | My Account-Payout</title>


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
                                        {
                                            this.state.userBalance
                                                ? <>
                                                    <div className="green-box-detail">
                                                        <span>Current Balance</span>:&nbsp;£{this.state.userBalance.pendingAmount ? this.state.userBalance.pendingAmount : 0}<br />
                                                        <span>Total Cash Back Received</span>:&nbsp;£{this.state.userBalance.paidAmount ? this.state.userBalance.paidAmount : 0}<br />
                                                        <span>Neteller  User ID</span>:&nbsp;{this.state.userBalance.netellerId ? this.state.userBalance.netellerId : 0}<br />
                                                        <span>E-mail Address</span>:&nbsp; <Link href="#"><a>{this.state.userData.email}</a></Link>
                                                    </div>

                                                </>
                                                : ''
                                        }

                                        {
                                            this.state.userBalance && this.state.isPaymentMethodUpdated === false ? <div className="mg-t-20">
                                                <p>Update your <Link href="/payment-details"><a className="has-green"> "Payment Details" </a></Link> to payout.</p>
                                            </div> : ''
                                        }
                                        {
                                            this.state.isPaymentMethodUpdated && this.state.checkPayout.length == 0 && this.state.userBalance.pendingAmount > 0 ?
                                                <div className="mg-t-20 cus-flex">
                                                    <input type="text" class="input cus-input" value={this.state.userBalance.pendingAmount ? this.state.userBalance.pendingAmount : 0} name="subscriberEmail" disabled />
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
                                                <li className="" role="presentation">
                                                    <Link href={`/revenue-share-payout`} as={`/revenueshare-payout`}><a title="Revenue Share Cashback">Revenue Share Cashback</a></Link>
                                                </li>
                                                <li className="active" role="presentation">
                                                    <Link href={`/turnover-payout-skrill`} as={`/turnover-payout/skrill`}><a title="Turnover Cashback">Turnover Cashback</a></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="" role="presentation">
                                                <Link href="/turnover-payout-skrill" as={`/turnover-payout/skrill`}><a title="Skrill">Skrill</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href="/turnover-payout-sbobet" as={`/turnover-payout/sbobet`}><a title="SBOBet">SBOBet</a></Link>
                                            </li>
                                            <li className="active" role="presentation">
                                                <Link href="/turnover-payout-neteller" as={`/turnover-payout/neteller`}><a title="Neteller">Neteller</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href="/turnover-payout-asian-connect" as={`/turnover-payout/asianconnect`}><a title="Neteller">AsianConnect88</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href="/turnover-payout-ecopayz" as={`/turnover-payout/ecopayz`}><a title="Ecopayz">Ecopayz</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-white is-inline-block is-fullwidth">
                                    <div className="fwid mg-15-6 cus-border">

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
                                                                        <td>{dataRow.paidOn ? dataRow.paidOn.slice(0, 10) : ''} </td>
                                                                        <td>{'€' + dataRow.amount}</td>
                                                                        <td>{'€' + dataRow.amount}</td>

                                                                    </tr>
                                                                })
                                                                : !this.state.userBalance ?
                                                                    <tr>
                                                                        <td colspan="5" style={{ textAlign: 'center' }}>
                                                                            Your 12 digit NETELLER user id not updated yet.
                                                     <Link href="/neteller-cashback" as={`/neteller-cashback`}><a className="has-green">Update Now.</a></Link></td>
                                                                    </tr>
                                                                    :
                                                                    <tr>
                                                                        <td colspan="5" style={{ textAlign: 'center' }}>No records found</td>
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


