import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl, checkDate } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr'
import { BounceLoader } from 'react-spinners';
import Pagination from "react-js-pagination";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-awesome-modal';
import { ExportToCsv } from 'export-to-csv';
import _ from 'lodash';
import Select from 'react-select';
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
export default withRouter(class Cashback_stores extends Component {

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
            uploadFile: '',
            tagSelectedOpt: '',
            tagOptions: [{ value: '', label: '' }],
            errors: {
                uploadFile: null,

            },

        }

    }
    componentDidMount = () => {

        this.getList(1);
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-offer/store-list?pageLimit=' + pageLimit + '&page=' + page;
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
    updateStoreStatus = (action, id) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (action == 'delete' && !window.confirm('Are you sure want to delete?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/cashback-offer/update-store-status', {
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
    handleSelectChange = (tagSelectedOpt) => {
        this.setState({ tagSelectedOpt });
      

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
    closeModal = () => {
        this.setState({
            visible: false
        });
    }
    openModal = () => {
        this.setState({
            visible: true
        });
    }
    closeTagModal = () => {
        this.setState({
            visibleTag: false
        });
    }

    exportStores = (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-offer/export-stores';
        axios.get(listUrl)
            .then(res => {
                var exportRes = res.data.results;
                var exportData = [];
                exportRes.map(function (dataRow) {
                    var exportRow = [];
                    exportRow['_id'] = dataRow._id;
                    exportRow['aff_id'] = dataRow.aid._id;
                    exportRow['Aff_Name'] = dataRow.aid.name;
                    exportRow['cat_id'] = dataRow.cat_id._id;
                    exportRow['cat_title'] = dataRow.cat_id.cat_title;
                    exportRow['title'] = dataRow.title;
                    exportRow['details'] = dataRow.details;
                    exportRow['details_default'] = dataRow.details_default;
                    exportRow['banner'] = dataRow.banner;
                    exportRow['internal_banner'] = dataRow.internal_banner;
                    exportRow['link'] = dataRow.link;
                    exportRow['value'] = dataRow.value;
                    exportRow['comm'] = dataRow.comm;
                    exportRow['vaild_from'] = dataRow.vaild_from;
                    exportRow['valid_to'] = dataRow.valid_to;
                    exportRow['tweet'] = dataRow.tweet;
                    exportRow['send_mail'] = dataRow.send_mail;
                    exportRow['merchant_tc'] = dataRow.merchant_tc;
                    exportRow['merchant_tc_default'] = dataRow.merchant_tc_default;
                    exportRow['youtube_video'] = dataRow.youtube_video;
                    exportRow['meta_title'] = dataRow.meta_title;
                    exportRow['meta_keywords'] = dataRow.meta_keywords;
                    exportRow['meta_description'] = dataRow.meta_description;
                    exportData.push(exportRow);
                });
                const csvExporter = new ExportToCsv(options);
                csvExporter.generateCsv(exportData);
            }).catch(() => {
                this.setState({ loading: false });
            })

    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { uploadFile, tagSelectedOpt } = this.state;
        const allFields = {
            uploadFile: {
                message: "Please select valid file (.csv).",
                doValidate: () => {
                    const value = _.trim(uploadFile);
                    const emailValid = /(\.csv)$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
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
    uploadStores = () => {
        let fieldNeedToValidate = ['uploadFile'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                const data = new FormData();
                const tragetFile = document.getElementById('uploadFile').files[0];
                data.append('file', tragetFile);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/cashback-offer/upload-stores', data).then((result) => {
                    let sucMsg = result.data.message;
                    this.setState({ uploadFile: '' });
                    if (result.data.success) {
                        toastr.success(sucMsg, '');
                        setTimeout(() => { this.getList(1); }, 300);
                    } else toastr.error(sucMsg, 'Error!');
                }).catch(error => {
                    let errorMsg = error.response.data.msg;
                    toastr.error(errorMsg, 'Error!');
                });
            }

        });
    }
    getTags = (id) => {
        let tagSelectedOpt = [], tagOptions = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/tags-list?id=' + id).then((result) => {
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
        }).catch(error => {

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
                axios.post(apiUrl + 'admin/cashback-offer/update-store-tags', { tags: arrtags, _id: _id }).then((result) => {
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

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Cashback Stores   </title>
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
                                        <li className="is-active"><a href="#">Cashback Stores   List</a></li>
                                    </ul>
                                    <Link href="/manage_cashback_stores">
                                        <a className="ad-new" >Add New  Store</a>
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
                                                            <option value="title">Name</option>

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
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Cashback Stores    List </h2>
                                <div>
                                    <a className="button is-link" onClick={this.openModal} >
                                        <span className="icon is-small">
                                            <i className="fas fa-upload "></i>
                                        </span> <span>Upload</span>
                                    </a> <a className="button is-link" onClick={this.exportStores}>
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
                                        <th>Site</th>
                                        <th onClick={this.handleSort.bind(this, 'cat_title', this.state.sortOrder)} >Title  <i className={`fa ${(this.state.sortKey == "cat_title") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th onClick={this.handleSort.bind(this, 'vaild_from', this.state.sortOrder)} >Valid From  <i className={`fa ${(this.state.sortKey == "vaild_from") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th onClick={this.handleSort.bind(this, 'valid_to', this.state.sortOrder)} >Valid To  <i className={`fa ${(this.state.sortKey == "valid_to") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th >Claims History</th>
                                        <th >Expire Status</th>
                                        <th >Status</th>
                                        <th style={{ width: '250px' }}>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent getTags={this.getTags} updateStoreStatus={this.updateStoreStatus} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />
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
                <UploadModel handleInputChange={this.handleInputChange} visible={this.state.visible} closeModal={this.closeModal} uploadStores={this.uploadStores} errors={this.state.error} />
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
                    <tr key="loading"><td colSpan="10" ><BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, i) {

                            var enabledBtn = (dataRow.off_disabled == 0) ? true : false;
                            var disbaledBtn = (dataRow.off_disabled == 1) ? true : false;
                            return <tr key={sNo + i}>
                                <td>{sNo + i}</td>
                                <td>{dataRow.aid?dataRow.aid.name:'--'}</td>
                                <td>{dataRow.title}</td>
                                <td>{dataRow.vaild_from.slice(0, 10)} </td>
                                <td>{dataRow.valid_to !== null ? dataRow.valid_to.slice(0, 10) : 'Never'} </td>
                                <td>Claims (0)</td>
                                <td> {
                                    ((dataRow.valid_to !== null && checkDate(dataRow.valid_to.slice(0, 10)))
                                        ? <label className="tag is-success "> Active</label> :
                                        (dataRow.valid_to === null) ? <label className="tag is-info "> Never Expires</label>
                                            : <label className="tag is-danger "> Expired</label>)

                                } </td>
                                <td>
                                    {
                                        dataRow.off_disabled === 0 ?
                                            <label className="tag is-success tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Enabled</label> : <label className="tag is-danger tooltip is-tooltip-bottom " data-tooltip="Approved ">
                                                Disabled</label>

                                    }
                                </td>
                                <td>
                                    <div className="buttons">
                                        <button data-tip="Disable" disabled={disbaledBtn} onClick={props.updateStoreStatus.bind(this, 'disbled', dataRow._id)} className="button is-primary is-small tooltip" data-tooltip="Disable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-ban"></i>
                                            </span>
                                        </button>
                                        <button data-tip="Enable" disabled={enabledBtn} onClick={props.updateStoreStatus.bind(this, 'enabled', dataRow._id)} className="button is-success is-small tooltip" data-tooltip="Enable">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </button>
                                        <Link href={`/manage_cashback_stores?id=${dataRow._id}`} as={`/update_cashback_stores/${dataRow._id}`}>
                                            <a data-tip="Edit" className="button is-info is-small tooltip" data-tooltip="Edit">  <span className="icon has-text-white">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span></a>
                                        </Link>

                                        <Link href={`/view_cashback_stores?id=${dataRow._id}`} as={`/view_cashback_stores/${dataRow._id}`}>
                                            <a data-tip="View" className="button is-link is-small tooltip" data-tooltip="View">
                                                <span className="icon has-text-white">
                                                    <i className="fas fa-eye"></i>
                                                </span>
                                            </a>
                                        </Link>
                                        <button data-tip="Assign Tags" onClick={props.getTags.bind(this, dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Assign Tags">
                                            <span className="icon has-text-white">
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                        </button>
                                        <button data-tip="Delete" onClick={props.updateStoreStatus.bind(this, 'delete', dataRow._id)} className="button is-danger is-small tooltip" data-tooltip="Delete">
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

const UploadModel = (props) => {


    return (
        <Modal visible={props.visible} effect="fadeInUp">
            <header className="modal-card-head">
                <p className="modal-card-title">Upload Stores</p>
            </header>
          
                <div className="column is-12">
                    <div className="control">
                        <label className="label has-text-grey">Upload</label>
                        <input type="file" name="uploadFile" id="uploadFile" onChange={props.handleInputChange} />
                        <p className="help is-danger">{_.get(props.errors, 'uploadFile')}</p>
                    </div>
                </div>
             
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={props.uploadStores}>Upload</button>
                <button className="button" onClick={props.closeModal}>Cancel</button>
            </footer>

        </Modal>
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




