import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr'
import { BounceLoader } from 'react-spinners';
import Pagination from "react-js-pagination";
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
export default withRouter(class Ecopay_cashback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            loading: true,
            searchKey: '',
            searchBy: '',
            searchStatus: '',
            sortClass: 'fa-sort',
            sortOrder: 'desc',
            sortKey: 'registerDate',
            user_id: '',
            ecopay_id: '',
            totalCom: 0,
            siteCom: 0,
            pendingSum: 0,
            pendingComm: 0,
            paidSum: 0,
            paidComm: 0,
            totalusers: 0,
            userDetails: [],
            awardAmount: 0,
            awardTo: 0,
            ecopay_user_id: this.props.router.query.id,

            errors: {
                name: null,
            },
        }

    }
    componentDidMount = () => {

        this.getList(1);
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey, ecopay_user_id } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/turnover-cashback/ecopay-cashbacks-details?ecopay_user_id=' + ecopay_user_id + '&pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    totalRecords: res.data.totalCount,
                    userDetails: res.data.userDetails,
                    totalCom: res.data.totalSum.length > 0 ? res.data.totalSum[0].sum.toFixed(2) : 0,
                    siteCom: res.data.totalComm.length > 0 ? res.data.totalComm[0].sum.toFixed(2) : 0,
                    pendingSum: res.data.pendingSum.length > 0 ? res.data.pendingSum[0].sum.toFixed(2) : 0,
                    pendingComm: res.data.pendingComm.length > 0 ? res.data.pendingComm[0].sum.toFixed(2) : 0,
                    paidSum: res.data.paidSum.length > 0 ? res.data.paidSum[0].sum.toFixed(2) : 0,
                    paidComm: res.data.paidComm.length > 0 ? res.data.paidComm[0].sum.toFixed(2) : 0,
                    awardAmount: res.data.userDetails.user_id ? res.data.userDetails.user_id.moneyBookerBonus : 0,
                    awardTo: res.data.userDetails.user_id ? res.data.userDetails.user_id.moneyBookerAwardto : 0,
                    loading: false
                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSearch = (event) => {
        event.preventDefault();
        this.getList(1);
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getList(pageNumber);
    }

    handleSort = (sortKey, sortOrder) => {
        sortOrder = (sortOrder == 'desc') ? 'asc' : 'desc';
        let sortClass = (sortOrder == 'desc') ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up';
        setTimeout(() => {
            this.setState({ sortClass: sortClass, sortOrder: sortOrder, sortKey: sortKey });
            this.getList(1);
        }, 100);

    }

    resetSearch = (e) => {
        e.preventDefault();
        document.getElementById('searchForm').reset();
        this.setState({ searchKey: '', searchBy: '', searchStatus: '' });
        setTimeout(() => { this.getList(1); }, 100);
    }






    updateCashbackStatus = (action, id) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (!window.confirm('Are you sure want to update?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/turnover-cashback/update-ecopay-cb-status', {
                action: action,
                _id: id,
            }).then((result) => {
                let sucMsg = result.data.msg;
                toastr.success(sucMsg, '');
                this.getList(activePage);
            }).catch(error => {
                let errorMsg = error.response.data.msg;
                toastr.error(errorMsg, 'Error!');
            });
        }


    }
   



    render() {
        const { error } = this.state;

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name}  -  Ecopayz Cashbacks  </title>
                </Head>
                <div className="page-wrapper" id="page-wrapper">
                    <div className="columns">
                        <div className="column">
                            <div className="box bread-box is-shadowless has-background-white">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li>
                                            <Link href="/dashboard" prefetch >
                                                <a href="#">Dashboard</a>
                                            </Link>
                                        </li>
                                        
                                        <li className="is-active"><a href="#">Turnover Cashback</a></li>
                                        <li>
                                            <Link href="/ecopay_cashback" prefetch>
                                                <a href="#"> Ecopayz Cashback  </a>
                                            </Link>
                                        </li>
                                        <li className="is-active"><a href="#">Ecopayz Cashback  Manager</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <div className="box bread-box is-shadowless has-background-white">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li className="is-active"> <a><b>User Id: : </b>&nbsp;&nbsp;{this.state.ecopay_user_id} </a></li>
                                        <li className="is-active"> <a><b>Email: </b>&nbsp;&nbsp;{this.state.userDetails.user_id ? this.state.userDetails.user_id.email : ''}</a> </li>
                                        <li className="is-active"> <a><b>User Name: </b>&nbsp;&nbsp;{this.state.userDetails.user_id ? this.state.userDetails.user_id.username : ''}</a> </li>
                                        <li className="is-active"> <a><b>Name: </b>&nbsp;&nbsp;{this.state.userDetails.user_id ? this.state.userDetails.user_id.name : ''}</a> </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <section className="hero is-light mg-b-20">
                            <div className="hero-body pd-tb-10">
                                <div className="container1">
                                    <form id="searchForm">
                                        <div className="columns mg-b-0">
                                            <div className="column">
                                                <div className="control">
                                                    <label className="label">Search Key</label>
                                                    <input className="input" type="text" name="searchKey" placeholder="Search Key" onChange={this.handleInputChange}></input>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="control">
                                                    <label className="label">Search By</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="searchBy" onChange={this.handleInputChange}>
                                                            <option value="">Search By</option>
                                                            <option value="ecopay_id">User Id</option>
                                                            <option value="amount">Amount</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="control">
                                                    <label className="label">Payment Status</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="searchStatus" onChange={this.handleInputChange}>
                                                            <option value="all">All</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Paid">Paid</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <p className="buttons">
                                            <a className="button is-theme is-rounded" onClick={this.handleSearch}>
                                                <span className="icon is-small">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                <span>Search</span>
                                            </a>
                                            <a className="button is-danger is-outlined is-rounded" onClick={this.resetSearch}>
                                                <span>Reset</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </section>

                         
                        <section className="hero is-light mg-b-20">
                            <div className="hero-body pd-tb-10">
                                <div className="container1">
                                    <form id="uploadForm">
                                        <div className="columns mg-b-0">
                                            <div className="column is-4">
                                                <div className="cashback-boxs">
                                                    <h1 className="title-statics">Pending</h1>
                                                    <ul>
                                                        
                                                        <li><strong>Total Amount:</strong>&nbsp;&nbsp;€{this.state.pendingSum} </li>
                                                        <li><strong>Site Commission (50%):</strong>&nbsp;&nbsp;€{this.state.pendingComm} </li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="column is-4">
                                                <div className="cashback-boxs">
                                                    <h1 className="title-statics">Paid</h1>
                                                    <ul>
                                                        
                                                        <li><strong>Total Amount:</strong>&nbsp;&nbsp;€{this.state.paidSum} </li>
                                                        <li><strong>Site Commission (50%):</strong>&nbsp;&nbsp;€{this.state.paidComm} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="column is-4">
                                                <div className="cashback-boxs">
                                                    <h1 className="title-statics">Total</h1>
                                                    <ul>
                                                        
                                                        <li><strong>Total Amount:</strong>&nbsp;&nbsp;€{this.state.totalCom}</li>
                                                        <li><strong>Total Commission (50%):</strong>&nbsp;&nbsp;€{this.state.siteCom} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <div className="table-responsive dash-table-res">

                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th style={{ width: '25px' }}>#</th >
                                        <th onClick={this.handleSort.bind(this, 'ecopay_id', this.state.sortOrder)} >User Id   <i className={`fa ${(this.state.sortKey == "ecopay_id") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th>Amount</th>
                                        <th>Credit Date </th>
                                        <th>Payment Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent openModel={this.openModel} updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} updateCashbackStatus={this.updateCashbackStatus} />
                            </table>
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
        )
    }

});


const TableListContent = (props) => {
    let sNo = (props.pageLimit * (props.activePage - 1)) + 1;
    return (
        <tbody>

            {
                (props.loading) ?
                    <tr><td colSpan="8" ><BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, i) {
                            var enabledBtn = (dataRow.paymentStatus == 1) ? true : false;
                            var disbaledBtn = (dataRow.paymentStatus == 0) ? true : false;
                            return <tr>
                                <td>{sNo + i}</td>
                                <td>{dataRow.ecopayzId}</td>
                                <td>€{dataRow.revenue}</td>
                                <td>{dataRow.creditDate.slice(0, 10)}</td>

                                <td>
                                    {
                                        dataRow.paymentStatus !== 0 ?
                                            <label className="tag is-success tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Paid</label> : <label className="tag is-danger tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Pending</label>
                                    }
                                </td>
                                <td>
                                    <div className="buttons">
                                        <button data-tip="Mark As Paid" disabled={enabledBtn} onClick={props.updateCashbackStatus.bind(this, 'paid', dataRow._id)} className="button is-success is-small tooltip" data-tooltip="Enable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </button>
                                        <button data-tip="Mark As Pending" disabled={disbaledBtn} onClick={props.updateCashbackStatus.bind(this, 'pending', dataRow._id)} className="button is-primary is-small tooltip" data-tooltip="Disable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-ban"></i>
                                            </span>
                                        </button>


                                        <ReactTooltip />
                                    </div>

                                </td>
                            </tr>
                        }) : <tr><td colSpan="8" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}





