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
import Modal from 'react-awesome-modal';
import AsyncSelect from 'react-select/lib/Async';
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
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey } = this.state;
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/turnover-cashback/skrill-cashbacks?pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    totalRecords: res.data.totalCount,
                    totalCom:res.data.totalSum.length>0?res.data.totalSum[0].sum.toFixed(2):0,
                    siteCom:res.data.totalComm.length>0?res.data.totalComm[0].sum.toFixed(2):0,
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

    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { uploadFile, user_id } = this.state;
        const allFields = {
            uploadFile: {
                message: "Please select valid file (.csv).",
                doValidate: () => {
                    const value = _.trim(uploadFile);
                    const fileValid = /(\.csv)$/i.test(value);
                    if (fileValid) {
                        return true;
                    }
                    return false;
                }
            },
            user_id: {
                message: "Please select a user.",
                doValidate: () => {
                    const value = _.trim(user_id);

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
    uploadCashbacks = () => {
        let fieldNeedToValidate = ['uploadFile'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                const data = new FormData();
                const tragetFile = document.getElementById('uploadFile').files[0];
                data.append('file', tragetFile);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/turnover-cashback/upload-data', data).then((result) => {
                    let sucMsg = result.data.message;
                    this.setState({ uploadFile: '' });
                    document.getElementById('uploadForm').reset();
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

    closeTagModal = () => {
        this.setState({
            visibleModal: false
        });
    }
    openModel = (skrill_id) => {
        this.setState({
            visibleModal: true,
            skrill_id: skrill_id
        });
    }
    searchUsers = (query, callback) => {
        if (!query) {
            return [];
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/user/search-users?query=' + encodeURIComponent(query))
            .then(function (response) {
                const items = response.data.results;
                let options = items.map(function (item) {
                    return {
                        value: item._id,
                        label: item.username + ' ' + item.name + ' (' + item.email + ')',
                    };
                });
                callback(options);
            });
    }

    handleSelectChange = (option) => {
        this.setState({
            user_id: option.value,
            selectedOption: option
        })
    }

    handleUpdateUser = () => {
        const { user_id, skrill_id } = this.state;
        let fieldNeedToValidate = ['user_id'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                axios.post(apiUrl + 'admin/turnover-cashback/update-skrill-user', { user_id: user_id, skrill_id: skrill_id }).then((result) => {
                    let sucMsg = result.data.msg;
                    this.setState({ user_id: '', skrill_id: '', selectedOption: { value: '', label: '' }, visibleModal: false });
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

    exportCashbacks = (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/turnover-cashback/export-skrill-cashbacks';
        axios.get(listUrl)
            .then(res => {
                var exportRes = res.data.results;
                var exportData = [];
                exportRes.map(function (dataRow) {
                    var exportRow = [];
                    exportRow['user_id'] = dataRow.skrill_id;
                    exportRow['username'] = dataRow.user_id ? dataRow.user_id.username : '[';
                    exportRow['Email'] = dataRow.user_id ? dataRow.user_id.email : '';
                    exportRow['currentBalance'] = dataRow.total_amount;
                    exportRow['moneyBookerBonus'] = dataRow.user_id ? dataRow.user_id.moneyBookerBonus : 0;
                   
                    exportData.push(exportRow);
                });
                const csvExporter = new ExportToCsv(options);
                csvExporter.generateCsv(exportData);
            }).catch(() => {
                this.setState({ loading: false });
            })

    }


    render() {
        const { error } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name}  -  Skrill Cashbacks  </title>
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
                                        <li className="is-active"><a href="#">Skrill Cashback Manager</a></li>
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
                                        <li className="is-active"> <a><b>Total Commission: </b> €{this.state.totalCom} </a></li>
                                        <li className="is-active"> <a><b>Total Users: </b> {this.state.totalRecords}</a> </li>
                                        <li className="is-active"> <a><b>Site Commission: </b> €{this.state.siteCom}</a> </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="box is-shadowless has-background-white" >
                        <section className="hero is-light mg-b-20">
                            <div className="hero-body pd-tb-10">
                                <div className="container1">
                                    <form id="uploadForm">
                                        <div className="columns mg-b-0">
                                            <div className="column">
                                                <div className="control">
                                                    <label className="label">CSV Upload</label>
                                                    <input className={" " + (_.get(error, 'uploadFile') ? ' is-danger' : '')} onChange={this.handleInputChange} name="uploadFile" id="uploadFile" type="file" />
                                                    <p className="help is-danger">{_.get(error, 'uploadFile')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="buttons">
                                            <a className="button is-theme is-rounded" onClick={this.uploadCashbacks}>
                                                <span>Upload</span>
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </section>
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
                                                            <option value="skrill_id">User Id</option>
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
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Skrill Cashback    List </h2>         
                                <div>
                                    <a className="button is-link" onClick={this.exportCashbacks}>

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
                                        <th onClick={this.handleSort.bind(this, 'skrill_id', this.state.sortOrder)} >MoneyBooker User Id   <i className={`fa ${(this.state.sortKey == "skrill_id") ? this.state.sortClass : "fa-sort"}`}></i></th>
                                        <th>User Name</th>
                                        <th>E-mail </th>
                                        <th>Current Balance</th>
                                    </tr>
                                </thead>
                                <TableListContent openModel={this.openModel} updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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
                <TagModel selectedOption={this.state.selectedOption} skrill_id={this.state.skrill_id} handleUpdateUser={this.handleUpdateUser} searchUsers={this.searchUsers} handleSelectChange={this.handleSelectChange} visibleModal={this.state.visibleModal} closeTagModal={this.closeTagModal} errors={this.state.error} />
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
                            var moneyBookerAwardto = dataRow.user_id ? dataRow.user_id.moneyBookerAwardto : null;
                            var moneyBookerBonus = (moneyBookerAwardto !== null && moneyBookerAwardto == 0 && dataRow.user_id) ? dataRow.user_id.moneyBookerBonus : 0;
                            return <tr>
                                <td>{sNo + i}</td>
                                <td>{dataRow.skrill_id}</td>
                                <td>{
                                    dataRow.user_id ?
                                        <Link href={`/skrill_cashback_details?id=${dataRow.skrill_id}`} as={`/skrill_cashback_details/${dataRow.skrill_id}`}>
                                            <a data-tip="View" className="button is-success is-small tooltip" data-tooltip="View"> {dataRow.user_id.username}</a>
                                        </Link> :
                                        <button onClick={props.openModel.bind(this, dataRow.skrill_id)} className="button is-danger is-small">Assign User</button>
                                }
                                </td>
                                <td>{dataRow.user_id ?
                                    dataRow.user_id.email
                                    : 'N/A'}</td>
                                <td>{dataRow.total_amount + moneyBookerBonus}</td>
                            </tr>
                        }) : <tr><td colSpan="8" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}
const TagModel = (props) => {
    return (
        <Modal width="500" visible={props.visibleModal} effect="fadeInUp">
            <header className="modal-card-head">
                <p className="modal-card-title">Assign User {props.skrill_id}</p>
            </header>
            <div className="column is-12">
                <div className="control">
                    <label className="label has-text-grey">Search User </label>
                    <AsyncSelect
                        loadOptions={(query, callback) => props.searchUsers(query, callback)}
                        placeholder="Type to search user..."
                        onChange={props.handleSelectChange}
                        value={props.selectedOption}
                    />
                    <p className="help is-danger">{_.get(props.errors, 'user_id')}</p>
                </div>
            </div>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={props.handleUpdateUser}>Submit</button>
                <button className="button" onClick={props.closeTagModal}>Cancel</button>
            </footer>
        </Modal>
    )
}




