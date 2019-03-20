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
export default withRouter(class Sharbs_bulk_upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            arrBookmakerTags: [],
            arrLeague: [],
            arrMatches: [],
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
            totalCom: 0,
            siteCom: 0,
            totalusers: 0,
            odds_bmidup: '',
            errors: {
                name: null,


            },
        }

    }
    componentDidMount = () => {

        this.getList(1);
        this.getAllBookmaker();
    }

    getAllBookmaker = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-league-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrLeague: res.data.results,
                    arrBookmakerTags: res.data.bookTags
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey } = this.state;
        this.setState({ loading: true });

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-bulk-sharbs?sharbsDocType=odds&pageLimit=' + pageLimit + '&page=' + page;
        if (searchKey) { listUrl += '&searchKey=' + searchKey + '&searchBy=' + searchBy; }
        if (searchStatus) { listUrl += '&searchStatus=' + searchStatus; }
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        axios.get(listUrl)
            .then(res => {
                let arrRes = res.data.results;
                this.setState({
                    arrList: arrRes,
                    totalRecords: res.data.totalCount,
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
    handleDeleteRow = index => e => {
        this.state.arrList.splice(index, 1);
        this.setState(this.state.arrList);
    }
    handleMulipleInputChange = index => e => {
        var sharbsRows = this.state.arrList.slice();
        const target = e.target;
        const value = target.value;
        const id = target.id;
        const name = target.name;
        if (name == 'odds_cid') this.getMatches(value, index);
        var newSharbs = sharbsRows.map(function (sharbsRow) {
            for (var key in sharbsRow) {
                if (key === name && id === sharbsRow.id) {
                    sharbsRow[key] = value;              
                }
            }
            return sharbsRow;
        });
        this.setState({ arrList: newSharbs });
    }

    getMatches = (comp_id, index) => {
        const { arrMatches } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-matches-list?comp_id=' + comp_id;
        axios.get(listUrl)
            .then(res => {
                arrMatches[index] = res.data.results;
                this.setState({
                    arrMatches: arrMatches
                });
            }).catch(() => {

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
        const { uploadFile, odds_bmidup } = this.state;
        const allFields = {
            uploadFile: {
                message: "Please select valid file (.csv).",
                doValidate: () => {
                    const value = _.trim(uploadFile);
                    const fileValid = /(\.csv|.xls|.xlsx)$/i.test(value);
                    if (fileValid) {
                        return true;
                    }
                    return false;
                }
            },
            odds_bmidup: {
                message: "Please select bookmaker.",
                doValidate: () => {
                    const value = _.trim(odds_bmidup);

                    if (value.length > 0 && value !== 0) {
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
        const { odds_bmidup } = this.state;
        let fieldNeedToValidate = ['uploadFile', 'odds_bmidup'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                const data = new FormData();
                const tragetFile = document.getElementById('uploadFile').files[0];
                data.append('file', tragetFile);
                data.append('odds_bmidup', odds_bmidup);
                data.append('sharbsDocType', 'odds');
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/bookmaker/upload-sharbs-data', data).then((result) => {
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
    updateBookmakers = (action, id,index) => {
        toastr.clear();
        const { activePage } = this.state;
        var updateStatus = true;
        if (action == 'delete' && !window.confirm('Are you sure want to delete?')) {
            updateStatus = false;
        }
        if (updateStatus) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
            axios.post(apiUrl + 'admin/bookmaker/delete-sharbs', {
                action: action,
                _id: id,
            }).then((result) => {
                let sucMsg = result.data.msg;
                toastr.success(sucMsg, '');
                this.state.arrList.splice(index, 1);
                this.setState(this.state.arrList);
            }).catch(error => {
                let errorMsg = error.response.data.msg;
                toastr.error(errorMsg, 'Error!');
            });
        }


    }
    handleSubmit = (e) => {

        e.preventDefault();
      
        if (this.validateSharbsForm()) {
            toastr.clear();
            this.updateSharbs();
        }

    }

    validateSharbsForm = () => {
        var validate = true;
        var sharbsRows = this.state.arrList.slice();
        var newSharbs = sharbsRows.map(function (sharbsRow) {
            sharbsRow['odds_cid_err'] = '';
            sharbsRow['odds_matchid_err'] = '';

            if (sharbsRow.odds_cid === 0 || sharbsRow.odds_cid === '') {
                validate = false;
                sharbsRow['odds_cid_err'] = 'Please select league.';
            }
            if (sharbsRow.odds_matchid === 0 || sharbsRow.odds_matchid === '') {
                validate = false;
                sharbsRow['odds_matchid_err'] = 'Please select a match.';
            }
            return sharbsRow;
        });
        this.setState({ arrList: newSharbs });
        return validate;
    }

    updateSharbs = () => {
        const { arrList } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/update-bulk-sharbs', arrList).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            setTimeout(() => { this.getList(1); }, 300);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');

        });
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
                                        <li className="is-active"><a href="#">Betting Settings</a></li>
                                        <li className="is-active"><a href="#">Sharbs List</a></li>
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
                                            <div className="column is-3">
                                                <div className="control">
                                                    <label className="label">Sharb Document</label>
                                                    <input className={" " + (_.get(error, 'uploadFile') ? ' is-danger' : '')} onChange={this.handleInputChange} name="uploadFile" id="uploadFile" type="file" />
                                                    <p className="help is-danger">{_.get(error, 'uploadFile')}</p>
                                                </div>
                                            </div>
                                            <div className="column is-3">
                                                <div className="control">
                                                    <label className="label">Bookmaker</label>
                                                    <div className="select is-fullwidth">
                                                        <select name="odds_bmidup" onChange={this.handleInputChange}>
                                                            <option value="">Select Bookmaker</option>
                                                            {
                                                                this.state.arrBookmakerTags.length > 0 ?
                                                                    this.state.arrBookmakerTags.map(function (dataRow) {
                                                                        return (
                                                                            <option value={dataRow.bm_id}>{dataRow.bm_name}</option>

                                                                        )

                                                                    }) : ''
                                                            }
                                                        </select>
                                                        <p className="help is-danger">{_.get(error, 'odds_bmidup')}</p>
                                                    </div>
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


                        <div className="table-responsive dash-table-res">
                            <div className="level">
                                <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Sharbs List </h2>
                                <div>

                                    {
                                        (this.state.arrList.length > 0) ?
                                        <a className="button is-link" onClick={this.handleSubmit}>
                                        <span>Submit</span>
                                    </a>:''
                                    }
                                    

                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th>#</th >
                                        <th>League</th>
                                        <th>Match </th>
                                        <th>Bookmaker </th>
                                        <th> Events </th>
                                        <th style={{ width: '150px' }}> Home Odds </th>
                                        <th style={{ width: '150px' }}> Draw Odds </th>
                                        <th style={{ width: '150px' }}> Away Odds </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent updateBookmakers={this.updateBookmakers} handleDeleteRow={this.handleDeleteRow} arrMatches={this.state.arrMatches} arrBookmakerTags={this.state.arrBookmakerTags} sharbsRows={this.state.arrList} handleMulipleInputChange={this.handleMulipleInputChange} arrLeague={this.state.arrLeague} updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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
                    <tr><td colSpan="8" >
                        <BounceLoader css="margin: 0 auto;" sizeUnit={"px"} size={30} color={'#123abc'} loading={true} />
                    </td></tr>
                    : (props.arrlist.length > 0) ?
                        props.arrlist.map(function (dataRow, index) {
                            return <tr>
                                <td>{sNo + index}</td>
                                <td>
                                    <div className="select is-fullwidth">
                                        <select name="odds_cid" id={dataRow._id} onChange={props.handleMulipleInputChange(index)}>
                                            <option value="0">Select League</option>
                                            {
                                                props.arrLeague.length > 0 ?
                                                    props.arrLeague.map(function (lRow) {

                                                        return (
                                                            <option value={lRow.c_id}>{lRow.c_name}</option>
                                                        )
                                                    }) : ''
                                            }
                                        </select>
                                       
                                    </div>
                                    <p className="help is-danger">{dataRow.odds_cid_err}</p>
                                </td>
                                <td>
                                    <div className="select is-fullwidth">
                                        <select name="odds_matchid" id={dataRow._id} onChange={props.handleMulipleInputChange(index)}>
                                            <option value="0">Select Match</option>
                                            {
                                                props.arrMatches[index] && props.arrMatches[index].length > 0 ?
                                                    props.arrMatches[index].map(function (dataRow) {
                                                        return (
                                                            <option value={dataRow.match_id}>{dataRow.match_hometeam} VS {dataRow.match_awayteam}</option>
                                                        )
                                                    }) : <option> No matches found</option>
                                            }
                                        </select>
                                       
                                    </div>
                                    <p className="help is-danger">{dataRow.odds_matchid_err}</p>
                                </td>
                                <td><div className="select is-fullwidth">
                                    <select name="odds_bmid" id={dataRow._id} value={dataRow.odds_bmid} onChange={props.handleMulipleInputChange(index)}>
                                        <option value="0">Select Bookmaker</option>
                                        {
                                            props.arrBookmakerTags.length > 0 ?
                                                props.arrBookmakerTags.map(function (dataRow) {
                                                    return (
                                                        <option value={dataRow.bm_id}>{dataRow.bm_name}</option>
                                                    )
                                                }) : ''
                                        }
                                    </select>
                                </div></td>
                                <td><input className={"input "} type="text" name="odds_events" placeholder="Events" value={dataRow.odds_events} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td><input className={"input "} type="text" name="odds_xo" placeholder="Home Win Odds" value={dataRow.odds_xo} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td><input className={"input "} type="text" name="odds_ho" placeholder="Draw  Win Odds" value={dataRow.odds_ho} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td><input className={"input "} type="text" name="odds_ao" placeholder="Away  Win Odds" value={dataRow.odds_ao} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td>  <button data-tip="Delete" onClick={props.updateBookmakers.bind(this, 'delete', dataRow._id,index)} className="button is-danger is-small tooltip" data-tooltip="Delete">
                                    <span className="icon has-text-white">
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </button>
                                    <ReactTooltip /></td>
                            </tr>
                        }) : <tr><td colSpan="9" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}





