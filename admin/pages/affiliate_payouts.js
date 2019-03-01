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
import { ExportToCsv } from 'export-to-csv';
import Modal from 'react-awesome-modal';
import _ from 'lodash';
const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useBom: true,
    useKeysAsHeaders: true,

};
export default withRouter(class affiliate_payouts extends Component {

    constructor(props) {
        super(props);
        this.state = {

            arrList: [],
            storeData: [],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            loading: true,
            searchKey: '',
            searchBy: '',
            searchStatus: '',
            filterByStore: '',
            sortClass: 'fa-sort',
            sortOrder: 'desc',
            sortKey: 'registerDate',
            visible: false,
            updateId: '',
            reason: '',
            filterByType:'',
            filterByStatus:'', 
            errors: {
                tagSelectedOpt: null,

            },
        }

    }
    componentDidMount = () => {
        this.getList(1);
    }


    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey,filterByType, filterByStatus } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-payouts/list?cb_type=4&pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
        if (filterByType) { listUrl += '&filterByType=' + filterByType; }
        if (filterByStatus) { listUrl += '&filterByStatus=' + filterByStatus; }
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    totalRecords: res.data.totalCount,
                    loading: false
                });
            }).catch(() => {

                this.setState({ loading: false });

            })
    }
    handleRejectPayout = () => {
        toastr.clear();
        const { activePage, updateId, reason } = this.state;
        var updateStatus = true;
        if (!window.confirm('Are you sure want to reject?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/cashback-payouts/reject-payout', {
                _id: updateId,
                reason: reason
            }).then((result) => {
                let sucMsg = result.data.msg;
                toastr.success(sucMsg, '');
                this.setState({
                    reason: '',
                    visible: false
                });
                this.getList(activePage);
            }).catch(error => {
                let errorMsg = error.response.data.msg;
                toastr.error(errorMsg, 'Error!');
            });
        }
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
    }
    openModal = (updateId) => {
        this.setState({
            updateId: updateId,
            visible: true
        });
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
        this.setState({ searchKey: '', searchBy: '', searchStatus: '', filterByStore: '',filterByType:'', filterByStatus:'' });
        setTimeout(() => { this.getList(1); }, 100);
    }


    exportPayouts = (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-payouts/export-payout?cb_type=4';
        axios.get(listUrl)
            .then(res => {
                var exportRes = res.data.results;
                var exportData = [];
                exportRes.map(function (dataRow) {
                    let payment_type = '';
                    if (dataRow.payment_type == 1) {
                        payment_type = 'PayPal';
                    } else if (dataRow.payment_type == 2) {
                        payment_type = 'Skrill';
                    } else if (dataRow.payment_type == 3) {
                        payment_type = 'Bank Transfer';
                    } else if (dataRow.payment_type == 4) {
                        payment_type = 'Neteller';
                    }
                    var exportRow = [];
                    exportRow['Name'] = dataRow.user_id.name;
                    exportRow['Username'] = dataRow.user_id.username;
                    exportRow['Amount'] = dataRow.value;
                    exportRow['PaymentMethod'] = payment_type;
                    exportRow['Email'] = dataRow.user_id.email;
                    exportRow['Date'] = dataRow.trans_date;
                    exportData.push(exportRow);
                });
                const csvExporter = new ExportToCsv(options);
                csvExporter.generateCsv(exportData);
            }).catch(() => {
                this.setState({ loading: false });
            })

    }
    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Affiliate Payouts    </title>
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
                                        <li className="is-active"><a href="#">Cashback Payouts </a></li>
                                        <li className="is-active"><a href="#"> Affiliate Payouts    List</a></li>
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
                                            <div className="column is-3">
                                                <div className="control">
                                                    <label className="label">Search By</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="searchBy" onChange={this.handleInputChange}>
                                                            <option value="">Search By</option>
                                                            <option value="payment_email">Payment Email</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="column is-3">
                                                <div className="control">
                                                    <label className="label">Filter By Payment Method</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="filterByType" onChange={this.handleInputChange}>
                                                            <option value="all">All</option>

                                                            <option value="1">PayPal</option>
                                                            <option value="2">Skrill</option>
                                                            <option value="3">Bank Transfer</option>
                                                            <option value="4">Neteller</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="column is-3">
                                                <div className="control">
                                                    <label className="label">Filter By Status</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="filterByStatus" onChange={this.handleInputChange}>
                                                            <option value="all">All</option>
                                                            <option value="1">Requested</option>
                                                            <option value="2">Completed</option>
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
                        <div className="table-responsive dash-table-res">
                            <div className="level">
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Affiliate Payouts    List </h2>
                                <div>
                                    <a className="button is-link" onClick={this.exportPayouts}>
                                        <span className="icon is-small">
                                            <i className="fas fa-share"></i>
                                        </span> <span>Export</span>
                                    </a>
                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th style={{ width: '25px' }}>#</th >
                                        <th >Customer</th>

                                        <th >Amount</th>
                                        <th >Payment Method/Email</th>
                                        <th >Date</th>
                                        <th >Status</th>

                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <TableListContent openModal={this.openModal} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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
                <TagModel handleInputChange={this.handleInputChange} reason={this.state.reason} handleRejectPayout={this.handleRejectPayout} visible={this.state.visible} closeModal={this.closeModal} errors={this.state.error} />

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
                    <tr><td colSpan="10" ><BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, i) {
                            let payment_type = '';
                            if (dataRow.payment_type == 1) {
                                payment_type = 'PayPal';
                            } else if (dataRow.payment_type == 2) {
                                payment_type = 'Skrill';
                            } else if (dataRow.payment_type == 3) {
                                payment_type = 'Bank Transfer';
                            } else if (dataRow.payment_type == 4) {
                                payment_type = 'Neteller';
                            }
                            return <tr>
                                <td>{sNo + i}</td>

                                <td>{dataRow.user_id ? dataRow.user_id.name : ''}
                                    <p><small>ID (EPI Code): {dataRow.user_id ? dataRow.user_id.epiCode : ''}</small></p>
                                    <p><small>Email: {dataRow.user_id ? dataRow.user_id.email : ''}</small></p>
                                </td>

                                <td>£{dataRow.value ? dataRow.value : ''}</td>


                                <td>{payment_type ? payment_type : 'Pending'}<br/>
                                {dataRow.payment_email ? dataRow.payment_email : ''}</td>
                                <td>{dataRow.trans_date ? dataRow.trans_date.slice(0, 10) : ''}</td>
                                <td>
                                    {
                                        dataRow.status === 2 ?
                                            <label className="tag is-success tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Completed</label> : <label className="tag is-info tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Requested</label>

                                    }
                                </td>

                                <td>
                                    <div className="buttons">

                                        <Link href={`/manage_cashback_payout?id=${dataRow._id}`} as={`/manage_cashback_payout/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
                                        </Link>

                                        <button data-tip="Delete" onClick={props.openModal.bind(this, dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Delete">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                        </button>

                                        <ReactTooltip />
                                    </div>

                                </td>
                            </tr>
                        }) : <tr><td colSpan="10" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}

const TagModel = (props) => {
    return (
        <Modal width="500" visible={props.visible} effect="fadeInUp">
            <header className="modal-card-head">
                <p className="modal-card-title">Reject Reason</p>
            </header>
            <div className="column is-12">
                <div className="control">
                    <label className="label has-text-grey">Reason </label>
                    <textarea className="textarea " name="reason" onChange={props.handleInputChange} value={props.reason} ></textarea>

                </div>
            </div>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={props.handleRejectPayout}>Submit</button>
                <button className="button" onClick={props.closeModal}>Cancel</button>
            </footer>
        </Modal>
    )
}





