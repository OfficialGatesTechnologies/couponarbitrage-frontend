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
import Modal from 'react-awesome-modal';
import _ from 'lodash';
import Select from 'react-select';
export default withRouter(class cashback_claims extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'unconfirmed',
            arrList: [],
            storeData:[],
            activePage: 1,
            totalRecords: 0,
            pageLimit: 20,
            loading: true,
            searchKey: '',
            searchBy: '',
            searchStatus: '',
            filterByStore:'',
            sortClass: 'fa-sort',
            sortOrder: 'desc',
            sortKey: 'registerDate',
            visibleTag: false,
            tagSelectedOpt: '',
            tagOptions: [{ value: '', label: '' }],
            errors: {
                tagSelectedOpt: null,

            },
        }

    }
    componentDidMount = () => {
        this.setState({ status: this.props.router.query.status });
        this.getList(1);
        this.getDropDownData();
    }
    componentWillReceiveProps = (nextProps) => {
       

        this.setState({ status: nextProps.router.query.status });
        setTimeout(() => { this.getList(1); }, 100);
        //console.log('nextProps.match.params.scheme',nextProps.router.query.status);
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

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey,filterByStore,status } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-claims/list?cb_type=3&status='+status+'&pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
        if (filterByStore) { listUrl += '&filterByStore=' + filterByStore; }
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
    updateSite = (action, id) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (action == 'delete' && !window.confirm('Are you sure want to delete?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/cashback-claims/update-site-status', {
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
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { tagSelectedOpt } = this.state;
        const allFields = {
            
            tagSelectedOpt: {
                message: "Please select atleast one tag.",
                doValidate: () => {
                    const value = _.trim(tagSelectedOpt);

                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }
        };
        let errors = this.state.errors;
        _.each(fieldsToValidate, (field) => {
            const fieldValidate = _.get(allFields, field);
            if (fieldValidate) {
                errors[field] = null;
                const isFieldValid = fieldValidate.doValidate();
                if (isFieldValid === false) {
                    errors[field] = _.get(fieldValidate, 'message');
                }
            }

        });
        this.setState({
            error: errors,
        }, () => {
            let isValid = true;
            this.setState({ disableBtn: true });
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                    this.setState({ disableBtn: false });
                }
            });
            callback(isValid);
        })

    }

    getTags = (id) => {
        let tagSelectedOpt = [], tagOptions = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-claims/tags-list?id=' + id).then((result) => {
            var tags = result.data.storeRow.tags ? result.data.storeRow.tags : '';
            var alltags = result.data.tagsList ? result.data.tagsList : '';
            if (tags.length > 0) {
                tags.map(function (row) {
                    let tagArr = {};
                    tagArr.label = row;
                    tagArr.value = row;
                    tagSelectedOpt.push(tagArr);
                });
            }
            if (alltags.length > 0) {
                alltags.map(function (row) {
                    let tagArr = {};
                    tagArr.label = row.tagName;
                    tagArr.value = row.tagName;
                    tagOptions.push(tagArr);
                });
            }
            this.setState({
                _id: id,
                tagSelectedOpt: tagSelectedOpt,
                tagOptions: tagOptions,
                visibleTag: true

            });
        }).catch(() => {

        });
    }
    handleUpdateTags = () => {
        const { tagSelectedOpt, _id } = this.state;
        let fieldNeedToValidate = ['tagSelectedOpt'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                var arrtags = [];
                tagSelectedOpt.map(function (row) {
                    arrtags.push(row.value);
                });
                axios.post(apiUrl + 'admin/cashback-claims/update-cliam-tags', { tags: arrtags, _id: _id }).then((result) => {
                    let sucMsg = result.data.msg;
                    this.setState({ tagSelectedOpt: '', visibleTag: false });
                    if (result.data.success) {
                        toastr.success(sucMsg, '');
                       
                    } else toastr.error(sucMsg, 'Error!');
                }).catch(error => {
                    let errorMsg = error.response.data.msg;
                    toastr.error(errorMsg, 'Error!');
                });
            }
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
        this.setState({ searchKey: '', searchBy: '', searchStatus: '',filterByStore:'' });
        setTimeout(() => { this.getList(1); }, 100);
    }
    handleSelectChange = (tagSelectedOpt) => {
        this.setState({ tagSelectedOpt });
       

    }
    closeTagModal = () => {
        this.setState({
            visibleTag: false
        });
    }
    


    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Cashback Sites  </title>
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
                                        <li className="is-active"><a href="#">Cashback & Bonuses Claims</a></li>
                                        <li className="is-active"><a href="#">{this.state.status == 'more_info' ? 'More information requested' : this.state.status} Claims   List</a></li>
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
                                                            <option value="username">Username</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
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
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <div className="table-responsive dash-table-res">
                            <div className="level">
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">{this.state.status == 'more_info' ? 'More information requested' : this.state.status} Claims   List </h2>
                                <div>
                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th style={{ width: '25px' }}>#</th >
                                        <th >Customer</th>
                                        <th >CouponArb Username</th>
                                        <th >Username at gaming site</th>
                                        <th >Offer</th>
                                        <th >Network</th>
                                        <th >Claim Submitted</th>
                                        <th >Amount</th>
                                        <th >Offer Vaild</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <TableListContent getTags={this.getTags} updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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
                <TagModel tagOptions={this.state.tagOptions} handleUpdateTags={this.handleUpdateTags} tagSelectedOpt={this.state.tagSelectedOpt} handleSelectChange={this.handleSelectChange} visibleTag={this.state.visibleTag} closeTagModal={this.closeTagModal} errors={this.state.error} />

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
                            return <tr>
                                <td>{sNo + i}</td>

                                <td>{dataRow.user_id ? dataRow.user_id.name : ''}
                                    <p><small>ID (EPI Code): {dataRow.user_id ? dataRow.user_id.epiCode : ''}</small></p>
                                    <p><small>Email: {dataRow.user_id ? dataRow.user_id.email : ''}</small></p>
                                </td>

                                <td>{dataRow.username ? dataRow.username : ''}</td>
                                <td>{dataRow.username ? dataRow.username : ''}</td>
                                <td>{dataRow.aff_id ? dataRow.aff_id.name : ''} -
                                {dataRow.store_id ? dataRow.store_id.title : ''}</td>
                                <td> 
                                {dataRow.store_id && dataRow.store_id.network_id ? dataRow.store_id.network_id.title : ''}</td>
                                <td>{dataRow.date_applied ? dataRow.date_applied.slice(0, 10) : ''}</td>
                                <td>£{dataRow.amount ? dataRow.amount : ''}</td>
                                <td>
                                    {dataRow.store_id ? `FROM: ${dataRow.store_id.vaild_from.slice(0, 10)}` : ''}
                                    {dataRow.store_id && dataRow.store_id.valid_to ? ` Upto: ${dataRow.store_id.valid_to.slice(0, 10)} ` : ''}</td>
                                <td>
                                    <div className="buttons">

                                        <Link href={`/manage_cashback_claims?id=${dataRow._id}`} as={`/manage_cashback_claims/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
                                        </Link>

                                        <button data-tip="Assign Tags" onClick={props.getTags.bind(this, dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Assign Tags">
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
        <Modal width="500"   visible={props.visibleTag} effect="fadeInUp">
            <header className="modal-card-head">
                <p className="modal-card-title">Assign Tags</p>
            </header>
            <div className="column is-12">
                <div className="control">
                    <label className="label has-text-grey">Tags </label>
                    <Select
                        onChange={props.handleSelectChange}
                        options={props.tagOptions}
                        isMulti={true}
                        value={props.tagSelectedOpt}
                    />
                    <p className="help is-danger">{_.get(props.errors, 'tagSelectedOpt')}</p>
                </div>
            </div>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={props.handleUpdateTags}>Submit</button>
                <button className="button" onClick={props.closeTagModal}>Cancel</button>
            </footer>
        </Modal>
    )
}




