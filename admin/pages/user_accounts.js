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
export default withRouter(class User_accounts extends Component {

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
        }

    }
    componentDidMount = () => {

        this.getList(1);
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/user/list?pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
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
    updateAccount = (action, id) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (action == 'delete' && !window.confirm('Are you sure want to delete this account?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/user/update-accounts', {
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
    exportUser = (e) => {
        e.preventDefault();


        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/user/export-user';

        axios.get(listUrl)
            .then(res => {
                const csvExporter = new ExportToCsv(options);
                csvExporter.generateCsv(res.data.results);

            }).catch(() => {
                this.setState({ loading: false });

            })

    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - User Accounts </title>
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
                                        <li className="is-active"><a href="#">Users</a></li>
                                        <li className="is-active"><a href="#">User Account List</a></li>
                                    </ul>
                                    <Link href="/manage_user_accounts" as="manage-user">
                                        <a className="ad-new" >Add New Account</a>
                                    </Link>
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
                                                            <option value="epiCode">EPI Code</option>
                                                            <option value="name">First Name</option>
                                                            <option value="last_name">Last Name</option>
                                                            <option value="username">Username</option>
                                                            <option value="email">Email</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="column">
                                                <div className="control">
                                                    <label className="label">Status</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="searchStatus" onChange={this.handleInputChange}>
                                                            <option value="all">All</option>
                                                            <option value="Disabled">Disabled</option>
                                                            <option value="Enabled">Enabled</option>
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
                                        </p> </form>
                                </div>


                            </div>
                        </section>
                        <div className="table-responsive dash-table-res">
                            <div className="level">
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">User Account  List </h2>
                                <div>
                                    <a className="button is-link" onClick={this.exportUser}>

                                        <span className="icon is-small">
                                            <i className="fas fa-share"></i>
                                        </span> <span>Export</span>
                                    </a>

                                </div>

                            </div>

                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th>#</th >
                                        <th onClick={this.handleSort.bind(this, 'username', this.state.sortOrder)} >User Name <i className={`fa ${(this.state.sortKey == "username") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th onClick={this.handleSort.bind(this, 'email', this.state.sortOrder)} >Email <i className={`fa ${(this.state.sortKey == "email") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th onClick={this.handleSort.bind(this, 'type', this.state.sortOrder)} >Account Type <i className={`fa ${(this.state.sortKey == "type") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th onClick={this.handleSort.bind(this, 'registerDate', this.state.sortOrder)} >Created <i className={`fa ${(this.state.sortKey == "registerDate") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th >Status</th>
                                        <th style={{ width: '200px' }}>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent updateAccount={this.updateAccount} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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

                            var enabledBtn = (dataRow.block == 0) ? true : false;
                            var disbaledBtn = (dataRow.block == 1) ? true : false;

                            return <tr>
                                <td>{sNo + i}</td>
                                <td>{dataRow.name} {dataRow.last_name} ({dataRow.username})
                                <p><small>ID (EPI Code): {dataRow.epiCode}</small></p></td>
                                <td>{dataRow.email} </td>
                                <td>{dataRow.usertype ? dataRow.usertype : '--'}</td>
                                <td>{dataRow.registerDate.slice(0, 10)}</td>

                                <td>
                                    {
                                        dataRow.block === 0 ?
                                            <label className="tag is-success tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Enabled</label> : <label className="tag is-danger tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Disabled</label>

                                    }
                                </td>
                                <td>
                                    <div className="buttons">
                                        <button data-tip="Disable" disabled={disbaledBtn} onClick={props.updateAccount.bind(this, 'disbled', dataRow._id)} className="button is-primary is-small tooltip" data-tooltip="Disable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-ban"></i>
                                            </span>
                                        </button>
                                        <button data-tip="Enable" disabled={enabledBtn} onClick={props.updateAccount.bind(this, 'enabled', dataRow._id)} className="button is-success is-small tooltip" data-tooltip="Enable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </button>
                                        <Link href={`/manage_user_accounts?id=${dataRow._id}`} as={`/update-user/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
                                        </Link>
                                        <Link href={`/view_user_accounts?id=${dataRow._id}`} as={`/view-user/${dataRow._id}`}>
                                            <a data-tip="View" className="button is-link is-small tooltip" data-tooltip="View">
                                                <span className="icon has-text-white">
                                                    <i className="fas fa-eye"></i>
                                                </span>
                                            </a>
                                        </Link>
                                        <button data-tip="Delete" onClick={props.updateAccount.bind(this, 'delete', dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Delete">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-trash-alt"></i>
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




