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
export default withRouter(class TurnoverSbobetEarning extends Component {
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
        this.getEarnings(1);
    }

    getEarnings = (page) => {
        const { pageLimit, status } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        let listUrl = apiUrl + 'account/sbobet-earnings?pageLimit=' + pageLimit + '&page=' + page;
        if (status) { listUrl += '&status=' + status; }
        axios.get(listUrl).then(res => {
            this.setState({
                arrList: res.data.results,
                totalRecords: res.data.totalCount,
                userBalance: res.data.userBalance,
                loading: false,
            });
        }).catch(() => {

        })
    }

    render() {
        const { } = this.state;

       (this.state.userBalance)? console.log('this.state.userBalance',this.state.userBalance):console.log('No');
        return (


            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title> Sbobet Cashback Transactions | {site_name} </title>


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
                                <h1><span className="tables-title">Your Earnings</span></h1>
                            </div>
                            <div className="bg-white is-inline-block is-fullwidth pd-20">
                                <div className="columns">
                                    <div className="column is-7">
                                        <h3 className="title-purble">Cashback by Merchant</h3>
                                        <p className="fon-18">Please find below the status of your transactions by merchant</p>
                                    </div>
                                    {
                                        this.state.userBalance
                                            ? <><div className="column is-5">
                                                <div className="green-box-detail">
                                                    <span>Current Balance</span>:&nbsp;£{this.state.userBalance.pendingAmount ? this.state.userBalance.pendingAmount : 0}<br />
                                                    <span>Total Cash Back Received</span>:&nbsp;£{this.state.userBalance.paidAmount ? this.state.userBalance.paidAmount : 0}<br />
                                                    <span>Sbobet  User ID</span>:&nbsp;{this.state.userBalance.sbobetId ? this.state.userBalance.sbobetId : 0}<br />
                                                    <span>E-mail Address</span>:&nbsp; <Link href="#"><a>{this.state.userData.email}</a></Link>
                                                </div>
                                            </div>
                                            </>
                                            : ''
                                    }
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
                                <hr />
                                <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="" role="presentation">
                                                <Link href={`/turnover-skrill`} as={`/turnover/skrill`}><a title="Skrill">Skrill</a></Link>
                                            </li>
                                            <li className="active" role="presentation">
                                                <Link href={`/turnover-sbobet`} as={`/turnover/sbobet`}><a title="SBOBet">SBOBet</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href={`/turnover-neteller`} as={`/turnover/neteller`}><a title="Neteller">Neteller</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href={`/turnover-asian-connect`} as={`/turnover/asianconnect`}><a title="Neteller">AsianConnect88</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                                <Link href={`/turnover-ecopayz`} as={`/turnover/ecopayz`}><a title="Ecopayz">Ecopayz</a></Link>
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
                                                                        <td>{'€'+dataRow.amount}</td>
                                                                            <td>{'€'+dataRow.amount}</td>                       
                                                                      
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



