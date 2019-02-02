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
export default withRouter(class Cashback_offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
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
            visible: false,
            visibleTag: false,
            storeData: [],
            filterByStore:'',
            errors: {
                uploadFile: null,

            },

        }

    }
    componentDidMount = () => {

        this.getList(1); this.getDropDownData();
    }

    getList = (page) => {
        const { pageLimit, filterByStore, sortOrder, sortKey } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-offer/offer-list?pageLimit=' + pageLimit + '&page=' + page;
       
        if (filterByStore) { listUrl += '&filterByStore=' + filterByStore; }
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    totalRecords: res.data.totalCount,
                    loading: false
                });
            }).catch((errr) => {
                console.log('errr', errr)
                this.setState({ loading: false });

            })
    }
    getDropDownData = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/get-all-stores')
            .then(res => {
                var storeData = res.data.results;
                this.setState({ storeData: storeData })
            }).catch((error) => {
                if (error) {
                    
                }
            })
    }
    updateOfferStatus = (action, id) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (action == 'delete' && !window.confirm('Are you sure want to delete?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/cashback-offer/update-offer-status', {
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


   

    resetSearch = (e) => {
        e.preventDefault();
        document.getElementById('searchForm').reset();
        this.setState({ searchKey: '', searchBy: '', searchStatus: '',filterByStore:'' });
        setTimeout(() => { this.getList(1); }, 100);
    }
  
    

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Cashback Offers    </title>
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
                                        <li className="is-active"><a href="#">Cashback Offers</a></li>
                                        <li className="is-active"><a href="#">Cashback Offers    List</a></li>
                                    </ul>
                                    <Link href="/manage_cashback_offer">
                                        <a className="ad-new" >Add New  Cashback Offer</a>
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
                                            <div className="column is-4">
                                                <div className="control">
                                                    <label className="label">Filter By Store</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="filterByStore" onChange={this.handleInputChange}>
                                                            <option value="all">All</option>
                                                            {
                                                                this.state.storeData.length > 0 ?
                                                                    this.state.storeData.map(function (dataRow, i) {

                                                                        return (
                                                                            <option key={i + 1} value={dataRow._id}>{dataRow.aid?dataRow.aid.name:''} - {dataRow.title}</option>

                                                                        )

                                                                    }) : ''
                                                            }
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
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Cashback Offers     List </h2>
                                <div>

                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th>#</th >

                                        <th >Store</th>
                                        <th >Cashback Type</th>
                                        <th >Cashback</th>
                                        <th style={{ width: '250px' }}>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent updateOfferStatus={this.updateOfferStatus} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />
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
                    <tr key="loading"><td colSpan="10" ><BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, i) {


                            return <tr key={sNo + i}>
                                <td>{sNo + i}</td>
                                <td>{dataRow.store_id.aid.name} - {dataRow.store_id.title}</td>
                                <td>{dataRow.cashback_type}</td>
                                <td>{dataRow.cashback} </td>

                                <td>
                                    <div className="buttons">

                                        <Link href={`/manage_cashback_offer?id=${dataRow._id}`} as={`/update_cashback_offer/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
                                        </Link>
                                        <Link href={`/view_cashback_offer?id=${dataRow._id}`} as={`/view_cashback_offer/${dataRow._id}`}>
                                            <a data-tip="View" className="button is-link is-small tooltip" data-tooltip="View">
                                                <span className="icon has-text-white">
                                                    <i className="fas fa-eye"></i>
                                                </span>
                                            </a>
                                        </Link>
                                        <button data-tip="Delete" onClick={props.updateOfferStatus.bind(this, 'delete', dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Delete">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                        </button>
                                        <ReactTooltip />
                                    </div>

                                </td>
                            </tr>
                        }) : <tr key="norecords"><td colSpan="11" style={{ 'textAlign': 'center' }} >No records found.</td></tr>
            }


        </tbody>
    )

}





