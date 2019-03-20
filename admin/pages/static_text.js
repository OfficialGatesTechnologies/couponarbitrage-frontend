import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr'
import { BounceLoader } from 'react-spinners';
import Pagination from "react-js-pagination";
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
export default withRouter(class Skrill_cashback extends Component {

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
            skrill_id: '',
            totalCom:0,
            siteCom:0,
            totalusers:0,

            selectedOption: { value: '', label: '' },
            errors: {
                name: null,


            },
        }

    }
    componentDidMount = () => {

        this.getList(1);
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl =  apiUrl +'admin/masterdata/static-list?pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    staticTextList: res.data.results,
                    totalRecords: res.data.totalCount,
                    loading: false
                });
            }).catch((error) => {
                this.setState({ loading: false });
                if (error) { this.props.history.push('/'); }
            })
    }
    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getList(pageNumber);
    }
    handleSearch = (event) => {
        event.preventDefault();
        this.getList(1);
    }
    resetSearch = (event) => {
        event.preventDefault();
        document.getElementById('searchForm').reset();
        this.setState({ searchKey: '', searchBy: '' });
        setTimeout(() => { this.getList(1); }, 100);
    }
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    updateSite = (action, id) => {
        const { activePage } = this.state;
        if (window.confirm('Are you sure want to delete ?')) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl +'admin/masterdata/delete-static', {
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
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name}  -  Turnover Static Text   </title>
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
                                        <li className="is-active"><a href="#">Master Data</a></li>
                                        <li className="is-active"><a href="#">Turnover Static Text </a></li>
                                        <Link href="/manage_static_text">
                                        <a className="ad-new" >Add New Text</a>
                                    </Link>
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
                                                            <option value="static_text">Text</option>
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
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Turnover Static Text  List </h2>         
                                <div>
                                    

                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                   
                                    <tr className="bg-light">
                                                        <th>#</th>
                                                        <th>Text For </th>
                                                        <th>Text</th>
                                                        <th>Min Val </th>
                                                        <th>Max Val </th>
                                                        <th>Actions</th>
                                                    </tr>
                                </thead>
                                <TableListContent  updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.staticTextList} loading={this.state.loading} />

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
                            return <tr key={dataRow._id}>
                            <td>{sNo + i}</td>
                            <td>{dataRow.static_text_for}</td>
                            <td>{dataRow.static_text}</td>
                            <td>{dataRow.static_text_min_val}</td>
                            <td>{dataRow.static_text_max_val}</td>
                            <td>

                            <div className="buttons">

<Link href={`/manage_static_text?id=${dataRow._id}`} as={`/update_static_text/${dataRow._id}`}>
    <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
        <i className="fas fa-pencil-alt"></i>
    </span></a>
</Link>

<button data-tip="Delete" onClick={props.updateSite.bind(this, 'delete', dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Delete">
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
 




