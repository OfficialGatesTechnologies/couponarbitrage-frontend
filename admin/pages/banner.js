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
import Image from 'react-image-resizer';
export default withRouter(class Banner extends Component {

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
        let listUrl = apiUrl + 'admin/masterdata/banner-list?pageLimit=' + pageLimit + '&page=' + page;
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
        if (action == 'delete' && !window.confirm('Are you sure want to delete?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/masterdata/update-banners-status', {
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


    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Banners  List </title>
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
                                        <li className="is-active"><a href="#">Banners </a></li>
                                        <li className="is-active"><a href="#">Banners  List</a></li>
                                    </ul>
                                    <Link href="/manage_banner" as="manage_banner">
                                        <a className="ad-new" >Add New Banner</a>
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

                                                            <option value="bannerTitle">Title</option>

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
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Banners   List </h2>
                                <div>


                                </div>

                            </div>

                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th>#</th >
                                        <th onClick={this.handleSort.bind(this, 'bannerTitle', this.state.sortOrder)} >Title <i className={`fa ${(this.state.sortKey == "bannerTitle") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th >Image</th>
                                        <th onClick={this.handleSort.bind(this, 'bannerAdded', this.state.sortOrder)} >Created On <i className={`fa ${(this.state.sortKey == "bannerAdded") ? this.state.sortClass : "fa-sort"}`}></i></th>
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
                    <tr key="loading"><td colSpan="8" ><BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, i) {

                            var enabledBtn = (dataRow.bannerDisabled == 0) ? true : false;
                            var disbaledBtn = (dataRow.bannerDisabled == 1) ? true : false;

                            return <tr key={sNo + i}>
                                <td>{sNo + i}</td>
                                <td>{dataRow.bannerTitle}



                                </td>
                                <td>{
                                        dataRow.bannerImageFile ?
                                            <Image
                                                src={`${apiUrl}resources/banner/${dataRow.bannerImageFile}`}
                                                width={100}
                                                height={50}

                                            /> : ''
                                    }



                                </td>
                                <td>{dataRow.bannerAdded.slice(0, 10)}</td>



                                <td>
                                    {
                                        dataRow.bannerDisabled === 0 ?
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
                                        <Link href={`/manage_banner?id=${dataRow._id}`} as={`/manage_banner/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
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
                        }) : <tr key="norecords"><td colSpan="8" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}




