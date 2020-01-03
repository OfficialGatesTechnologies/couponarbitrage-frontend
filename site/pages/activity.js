import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from '../components/my-account/My-account-top';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import _ from 'lodash';
import CustomLoader from '../components/Custome-loader';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            arrList: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 10,
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                let userData = res.data;
                this.setState({
                    userData: userData,
                });
            }).catch(() => {
                Router.push(`/signin`);
            })
        this.getList(1);
    }
    getList = (page) => {
        const { pageLimit, status } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        let listUrl = apiUrl + 'account/user-activities?pageLimit=' + pageLimit + '&page=' + page;
        if (status) { listUrl += '&status=' + status; }
        axios.get(listUrl).then(res => {
            this.setState({
                arrList: res.data.results,
                totalRecords: res.data.totalCount,
                loading: false,
            });
        }).catch(() => {

        })
    }
    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getList(pageNumber);
    }

    render() {
        return (
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

                </div>

                <div className="inner-wrapper">
                    <div className="container">
                        <MyAccountTop userData={this.state.userData} />
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

                                                                    <td>{dataRow.activity_name ? dataRow.activity_name : ''} </td>
                                                                    <td>{dataRow.activity_added ? dataRow.activity_added.slice(0, 10) : ''} </td>
                                                                    <td>{`${dataRow.activity_type == 'RevenueCashbackClaims' && dataRow.activity_amount ? dataRow.activity_amount + '%' : '€' + dataRow.activity_amount}`}</td>
                                                                    <td>{dataRow.activity_status ? dataRow.activity_status : '-'}</td>

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
                                <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                                    <Pagination
                                        innerClass="pagination-list"
                                        linkClass="pagination-link"
                                        activeLinkClass="is-current"
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.pageLimit}
                                        totalItemsCount={this.state.totalRecords}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </nav>
                            </div>

                        </div>


                    </div>

                </div>

                <Footer />
            </div>
        )
    }
});


