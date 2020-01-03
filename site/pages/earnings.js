import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Router from 'next/router';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from '../components/my-account/My-account-top';
import NavigationWhyNotTry from '../components/my-account/Myaccountsitenav';
import Link from 'next/link';
import CustomLoader from '../components/Custome-loader';
import jsCookie from 'js-cookie';
import ReactTooltip from 'react-tooltip';
export default withRouter(class Earnings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            arrList: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            loading: false,
            checkBoxes: {
                paidStatus: false,
                confirmedStatus: false,
                pendingStatus: false,
                payableStatus: false,
                declinedStatus: false
            },
            paidTotal: [],
            confirmedTotal: [],
            pendingTotal: [],
            payableTotal: [],
            declinedTotal: [],

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
        let listUrl = apiUrl + 'account/cb-earnings?cb_type=3&pageLimit=' + pageLimit + '&page=' + page;
        if (status) { listUrl += '&status=' + status; }
        axios.get(listUrl).then(res => {
            this.setState({
                arrList: res.data.results,
                totalRecords: res.data.totalCount,
                loading: false,
                paidTotal: res.data.totalPaid,
                confirmedTotal: res.data.totalConfirmed,
                pendingTotal: res.data.totalUnconfirmed,
                payableTotal: res.data.totalPayable,
                declinedTotal: res.data.totalCancelled
            });
        }).catch(() => {

        })
    }
    handleCheckBoxChange = (e) => {
        const { checkBoxes } = this.state;
        checkBoxes['declinedStatus'] = false;
        checkBoxes['paidStatus'] = false;
        checkBoxes['confirmedStatus'] = false;
        checkBoxes['pendingStatus'] = false;
        checkBoxes['payableStatus'] = false;
        var value = (e.target.checked) ? e.target.value : '';
        var name = e.target.name;
        checkBoxes[name] = e.target.checked;
        this.setState({loading: true, status: value, checkBoxes: checkBoxes });
        setTimeout(() => { this.getEarnings(1); }, 300);

    }
    render() {
        const { checkBoxes } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>Your Earnings - {site_name}</title>
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
                                    <div className="column is-5">
                                        <div className="green-box-detail">
                                            <span>Pending Amount</span>:&nbsp;£{this.state.pendingTotal[0]?this.state.pendingTotal[0].sum:0}<br />
                                            <span>Current Balance</span>:&nbsp;£{this.state.payableTotal[0]?this.state.payableTotal[0].sum:0}<br />
                                            <span>Total Cash Back Received</span>:&nbsp;£{this.state.paidTotal[0]?this.state.paidTotal[0].sum:0}<br />
                                            <span>E-mail Address</span>:&nbsp; <Link href="#"><a>{this.state.userData.email}</a></Link>
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
                                                    <Link href={`/turnover-skrill`} as={`/turnover/skrill`}><a title="Payout">Turnover Cashback</a></Link>
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
                                                                    <label className="font-16">
                                                                        <input type="checkbox" name="pendingStatus" onChange={this.handleCheckBoxChange} checked={checkBoxes.pendingStatus} value="unconfirmed" className="fm-check" />
                                                                        <span className="cr chck-bor bor-rad">
                                                                            <i className="cr-icon pur-color fas fa-check"></i>
                                                                        </span>
                                                                        <span className="has-text-weight-bold has-orange">Pending</span>
                                                                        <div className="fil-rate">
                                                                            <span>£{this.state.pendingTotal[0]?this.state.pendingTotal[0].sum:0}</span>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="level-item border-right-c0">
                                                        <div className="field">
                                                            <div className="control">
                                                                <div className="checkbox join-check-wrap">
                                                                    <label className="font-16">
                                                                        <input type="checkbox" onChange={this.handleCheckBoxChange} name="confirmedStatus" checked={checkBoxes.confirmedStatus} value="finished" className="fm-check" />
                                                                        <span className="cr chck-bor bor-rad">
                                                                            <i className="cr-icon pur-color fas fa-check"></i>
                                                                        </span>
                                                                        <span className="has-text-weight-bold has-orange">Confirmed</span>
                                                                        <div className="fil-rate">
                                                                            <span>£{this.state.confirmedTotal[0]?this.state.confirmedTotal[0].sum:0}</span>
                                                                        </div>
                                                                    </label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="level-item border-right-c0">
                                                        <div className="field">
                                                            <div className="control">
                                                                <div className="checkbox join-check-wrap">
                                                                    <label className="font-16">
                                                                        <input type="checkbox" onChange={this.handleCheckBoxChange} name="payableStatus" checked={checkBoxes.payableStatus} value="payable" className="fm-check" />
                                                                        <span className="cr chck-bor bor-rad">
                                                                            <i className="cr-icon pur-color fas fa-check"></i>
                                                                        </span>
                                                                        <span className="has-text-weight-bold has-orange">Payable</span>
                                                                        <div className="fil-rate">
                                                                            <span>£{this.state.payableTotal[0]?this.state.payableTotal[0].sum:0}</span>
                                                                        </div>
                                                                    </label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="level-item border-right-c0">
                                                        <div className="field">
                                                            <div className="control">
                                                                <div className="checkbox join-check-wrap">
                                                                    <label className="font-16">
                                                                        <input type="checkbox" onChange={this.handleCheckBoxChange} name="paidStatus" checked={checkBoxes.paidStatus} value="paid" className="fm-check" />
                                                                        <span className="cr chck-bor bor-rad">
                                                                            <i className="cr-icon pur-color fas fa-check"></i>
                                                                        </span>
                                                                        <span className="has-text-weight-bold has-green">Paid</span>
                                                                        <div className="fil-rate">
                                                                            <span>£{this.state.paidTotal[0]?this.state.paidTotal[0].sum:0}</span>
                                                                        </div>
                                                                    </label>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control">
                                                                <div className="checkbox join-check-wrap">
                                                                    <label className="font-16">
                                                                        <input type="checkbox" name="declinedStatus" onChange={this.handleCheckBoxChange} checked={checkBoxes.declinedStatus} value="cancelled" className="fm-check" />
                                                                        <span className="cr chck-bor bor-rad"><i className="cr-icon pur-color fas fa-check"></i></span>
                                                                        <span className="has-text-weight-bold">Declined</span>
                                                                        <div className="fil-rate">
                                                                            <span>£{this.state.declinedTotal[0]?this.state.declinedTotal[0].sum:0}</span>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-sec table-responsive">
                                                <table className="table new-table emptys-tables is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <td className="has-text-grey">Merchant</td>
                                                            <td className="has-text-grey">Date </td>
                                                            <td className="has-text-grey">Cashback</td>
                                                            <td className="has-text-grey">Comments</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="has-text-grey">

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
                                                                                {
                                                                                    dataRow.status == 'N' ? <img data-place="right" data-tip="Not Tracked - We are now chasing this claim up manually for you." src="/static/images/info-icon.png" alt="info" /> : ''
                                                                                }
                                                                            </td>
                                                                            <td>{dataRow.date_applied ? dataRow.date_applied.slice(0, 10) : ''} </td>
                                                                            <td>£{dataRow.amount ? dataRow.amount : ''}</td>
                                                                            <td>-</td>
                                                                            <ReactTooltip />
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
    }
});


