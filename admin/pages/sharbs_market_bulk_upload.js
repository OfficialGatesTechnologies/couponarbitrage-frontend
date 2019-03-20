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
export default withRouter(class Sharbs_market_bulk_upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            arrBookmakerTags: [],
            arrLeague: [],
            arrMatches: [],
            arrTags: [],
            arrMarkets: [],
            uogoal: [],
            arrbookmaker: [],
            arrsels: [],
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
            editId: 0,
            marketAll: false,
            errors: {
                name: null,
            },
        }

    }
    componentDidMount = () => {
        const editId = this.props.router.query.id;
        if (editId) {
            this.setState({ editId: editId });
            setTimeout(() => { this.getList(1); }, 100);
        } else {
            this.getList(1);
        }


        this.getAllBookmaker();
    }

    getAllBookmaker = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-league-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrLeague: res.data.results,
                    arrBookmakerTags: res.data.bookTags,
                    arrTags: res.data.tags,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getList = (page) => {
        const { pageLimit, searchKey, searchBy, searchStatus, sortOrder, sortKey, editId } = this.state;
        this.setState({ loading: true });

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-bulk-sharbs?sharbsDocType=marketodds&pageLimit=' + pageLimit + '&page=' + page;
        if (editId) { listUrl += '&editId=' + editId; }
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
        if (name == 'odds_matchid') this.getMarkets(sharbsRows[index].odds_cid, value, index);
        if (name == 'odds_market') this.getBookmakers(sharbsRows[index].odds_cid, sharbsRows[index].odds_matchid, value, index);
        if (name == 'odds_bm_market') {
            console.log(sharbsRows[index]);
            this.getSel(sharbsRows[index].odds_cid, sharbsRows[index].odds_matchid, sharbsRows[index].odds_market, value, index);
        }
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

    getSel = (odds_cid, odds_matchid, odds_market, odds_bm_market, index) => {
        const { arrsels } = this.state;
        var sharbsRows = this.state.arrList.slice();
        let sels;
        arrsels[index] = [];
        let resSelsList = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-sels-list?odds_cid=' + odds_cid + '&odds_matchid=' + odds_matchid + '&odds_market=' + odds_market + '&odds_bm_market=' + odds_bm_market + '&odds_pn=' + sharbsRows[index].odds_pn;
        axios.get(listUrl)
            .then(res => {
                sels = res.data.results;
                if (odds_market === 'uogoal') {
                    sels.map(function (dataRow) {
                        let arrSelsList = [];
                        let uos = Math.round(dataRow.layunov_uos);
                        arrSelsList.name = 'Under ' + uos;
                        arrSelsList.value = 'Under ' + uos;
                        resSelsList.push(arrSelsList);
                        arrSelsList = [];
                        arrSelsList.name = 'Over ' + uos;
                        arrSelsList.value = 'Over ' + uos;
                        resSelsList.push(arrSelsList);
                    });
                } else {
                    sels.map(function (dataRow) {
                        let arrSelsList = [];
                        arrSelsList.name = dataRow.exodds_sel;
                        arrSelsList.value = dataRow.exodds_sel;
                        resSelsList.push(arrSelsList);
                    });
                }
                arrsels[index] = resSelsList;

                this.setState({
                    arrsels: arrsels,

                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    getBookmakers = (odds_cid, odds_matchid, odds_market, index) => {
        let bookmaker;
        const { arrbookmaker } = this.state;
        arrbookmaker[index] = [];

        let resBookmakerList = [];
        let bookmakerIds = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-bookmaker-list?odds_cid=' + odds_cid + '&odds_matchid=' + odds_matchid + '&odds_market=' + odds_market;
        axios.get(listUrl)
            .then(res => {
                bookmaker = res.data.results;
                if (odds_market === 'uogoal') {
                    bookmaker.map(function (dataRow) {
                        let arrBookmakerList = [];
                        if (bookmakerIds.indexOf(dataRow.layunov_bmid) === -1) {
                            bookmakerIds.push(dataRow.layunov_bmid);
                            arrBookmakerList.bmid = dataRow.layunov_bmid;
                            arrBookmakerList.bm_name = dataRow.bookmakers.bm_name;
                            resBookmakerList.push(arrBookmakerList);
                        }
                    });
                } else {
                    bookmaker.map(function (dataRow) {
                        let arrBookmakerList = [];
                        if (bookmakerIds.indexOf(dataRow.exodds_bmid) === -1) {
                            bookmakerIds.push(dataRow.exodds_bmid);
                            arrBookmakerList.bmid = dataRow.exodds_bmid;
                            arrBookmakerList.bm_name = dataRow.bookmakers.bm_name;
                            resBookmakerList.push(arrBookmakerList);
                        }

                    });
                }
                arrbookmaker[index] = resBookmakerList;

                this.setState({
                    arrbookmaker: arrbookmaker,

                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    getMarkets = (odds_cid, odds_matchid, index) => {
        const { arrMarkets, uogoal } = this.state;
        let markets;

        let resMarketList = [];
        let marketsIds = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-markets-list?odds_cid=' + odds_cid + '&odds_matchid=' + odds_matchid;

        axios.get(listUrl)
            .then(res => {
                markets = res.data.results;
                markets.map(function (dataRow) {
                    let arrMarketList = [];
                    if (marketsIds.indexOf(dataRow.exodds_market) === -1) {
                        marketsIds.push(dataRow.markets.market_id);
                        arrMarketList.maketId = dataRow.exodds_market;
                        arrMarketList.market_name = dataRow.markets.market_name;
                        resMarketList.push(arrMarketList);
                    }
                });

                arrMarkets[index] = resMarketList;

                uogoal[index] = (res.data.layunovodds).length > 0 ? true : false
                this.setState({
                    arrMarkets: arrMarkets,
                    uogoal: uogoal
                });

            }).catch(() => {
                this.setState({ loading: false });
            })
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
                data.append('sharbsDocType', 'marketodds');
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
    updateBookmakers = (action, id, index) => {
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
            sharbsRow['odds_market_err'] = '';
            sharbsRow['odds_bm_market_err'] = '';
            sharbsRow['odds_sel_err'] = '';
            if (sharbsRow.odds_cid === 0 || sharbsRow.odds_cid === '') {
                validate = false;
                sharbsRow['odds_cid_err'] = 'Please select league.';
            }
            if (sharbsRow.odds_matchid === 0 || sharbsRow.odds_matchid === '') {
                validate = false;
                sharbsRow['odds_matchid_err'] = 'Please select a match.';
            }
            if (sharbsRow.odds_market === 0 || sharbsRow.odds_market === '') {
                validate = false;
                sharbsRow['odds_market_err'] = 'Please select market.';
            }
            if (sharbsRow.odds_bm_market === 0 || sharbsRow.odds_bm_market === '') {
                validate = false;
                sharbsRow['odds_bm_market_err'] = 'Please select market bookmakers.';
            }
            if (sharbsRow.odds_sel === 0 || sharbsRow.odds_sel === '') {
                validate = false;
                sharbsRow['odds_sel_err'] = 'Please select sel.';
            }
            return sharbsRow;
        });
        this.setState({ arrList: newSharbs });
        return validate;
    }

    updateSharbs = () => {
        const { arrList } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/update-market-bulk-sharbs', arrList).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            setTimeout(() => { this.getList(1); }, 300);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');

        });
    }
    handleMarketCheckBoxChange = (e) => {
        var checked = e.target.checked;
        var validate = true;
        var sharbsRows = this.state.arrList.slice();
        if (checked) {
            var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                sharbsRow['odds_cid_err'] = '';
                sharbsRow['odds_matchid_err'] = '';
                sharbsRow['odds_market_err'] = '';
                sharbsRow['odds_bm_market_err'] = '';
                sharbsRow['odds_sel_err'] = '';
                if (sharbsRow.odds_cid === 0 || sharbsRow.odds_cid === '') {
                    validate = false;
                    sharbsRow['odds_cid_err'] = 'Please select league.';
                }
                if (sharbsRow.odds_matchid === 0 || sharbsRow.odds_matchid === '') {
                    validate = false;
                    sharbsRow['odds_matchid_err'] = 'Please select a match.';
                }
                if (sharbsRow.odds_market === 0 || sharbsRow.odds_market === '' && i === 0) {
                    validate = false;
                    sharbsRow['odds_market_err'] = 'Please select market.';
                }
                return sharbsRow;
            });
            this.setState({ arrList: newSharbs });
            if (validate) {
                const { arrbookmaker } = this.state;
                var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                    var odds_cid = sharbsRows[0].odds_cid;
                    var odds_matchid = sharbsRows[0].odds_matchid;
                    var odds_market = sharbsRows[0].odds_market;
                    var marketDropDown = arrbookmaker[0];
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid) {
                        sharbsRow.odds_market = odds_market;
                        arrbookmaker[i] = marketDropDown;
                    }
                    return sharbsRow;
                });
                this.setState({
                    arrList: newSharbs,
                    arrbookmaker: arrbookmaker,
                });
            }
        }
    }

    handleBookmakerCheckBoxChange = (e) => {
        var checked = e.target.checked;
        var validate = true;
        var sharbsRows = this.state.arrList.slice();
        if (checked) {
            var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                sharbsRow['odds_cid_err'] = '';
                sharbsRow['odds_matchid_err'] = '';
                sharbsRow['odds_market_err'] = '';
                sharbsRow['odds_bm_market_err'] = '';
                sharbsRow['odds_sel_err'] = '';
                if (sharbsRow.odds_cid === 0 || sharbsRow.odds_cid === '') {
                    validate = false;
                    sharbsRow['odds_cid_err'] = 'Please select league.';
                }
                if (sharbsRow.odds_matchid === 0 || sharbsRow.odds_matchid === '') {
                    validate = false;
                    sharbsRow['odds_matchid_err'] = 'Please select a match.';
                }
                if ((sharbsRow.odds_market === 0 || sharbsRow.odds_market === '') && i === 0) {
                    validate = false;
                    sharbsRow['odds_market_err'] = 'Please select market.';
                }
                if ((sharbsRow.odds_bm_market === 0 || sharbsRow.odds_bm_market === '') && i === 0) {
                    validate = false;
                    sharbsRow['odds_bm_market_err'] = 'Please select market bookmakers.';
                }
                return sharbsRow;
            });
            this.setState({ arrList: newSharbs });
            if (validate) {
                const { arrbookmaker, arrsels } = this.state;
                var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                    var odds_cid = sharbsRows[0].odds_cid;
                    var odds_matchid = sharbsRows[0].odds_matchid;
                    var odds_market = sharbsRows[0].odds_market;
                    var odds_bm_market = sharbsRows[0].odds_bm_market;
                    var marketDropDown = arrbookmaker[0];
                    var selsDropDown = arrsels[0];
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid) {
                        sharbsRow.odds_market = odds_market;
                        arrbookmaker[i] = marketDropDown;
                    }
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid
                        && odds_market == sharbsRow.odds_market) {
                        sharbsRow.odds_bm_market = odds_bm_market;
                        arrsels[i] = selsDropDown;
                    }
                    return sharbsRow;
                });
                this.setState({
                    arrList: newSharbs,
                    arrbookmaker: arrbookmaker,
                    arrsels: arrsels
                });
            }
        }

    }
    handleSelCheckBoxChange = (e) => {
        var checked = e.target.checked;
        var validate = true;
        var sharbsRows = this.state.arrList.slice();
        if (checked) {
            var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                sharbsRow['odds_cid_err'] = '';
                sharbsRow['odds_matchid_err'] = '';
                sharbsRow['odds_market_err'] = '';
                sharbsRow['odds_bm_market_err'] = '';
                sharbsRow['odds_sel_err'] = '';
                if (sharbsRow.odds_cid === 0 || sharbsRow.odds_cid === '') {
                    validate = false;
                    sharbsRow['odds_cid_err'] = 'Please select league.';
                }
                if (sharbsRow.odds_matchid === 0 || sharbsRow.odds_matchid === '') {
                    validate = false;
                    sharbsRow['odds_matchid_err'] = 'Please select a match.';
                }
                if ((sharbsRow.odds_market === 0 || sharbsRow.odds_market === '') && i === 0) {
                    validate = false;
                    sharbsRow['odds_market_err'] = 'Please select market.';
                }
                if ((sharbsRow.odds_bm_market === 0 || sharbsRow.odds_bm_market === '') && i === 0) {
                    validate = false;
                    sharbsRow['odds_bm_market_err'] = 'Please select market bookmakers.';
                }
                if ((sharbsRow.odds_sel === 0 || sharbsRow.odds_sel === '') && i === 0) {
                    validate = false;
                    sharbsRow['odds_sel_err'] = 'Please select sel.';
                }
                return sharbsRow;
            });
            this.setState({ arrList: newSharbs });
            if (validate) {
                const { arrbookmaker, arrsels } = this.state;
                var newSharbs = sharbsRows.map(function (sharbsRow, i) {
                    var odds_cid = sharbsRows[0].odds_cid;
                    var odds_matchid = sharbsRows[0].odds_matchid;
                    var odds_market = sharbsRows[0].odds_market;
                    var odds_bm_market = sharbsRows[0].odds_bm_market;
                    var odds_sel = sharbsRows[0].odds_sel;
                    var marketDropDown = arrbookmaker[0];
                    var selsDropDown = arrsels[0];
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid) {
                        sharbsRow.odds_market = odds_market;
                        arrbookmaker[i] = marketDropDown;
                    }
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid
                        && odds_market == sharbsRow.odds_market) {
                        sharbsRow.odds_bm_market = odds_bm_market;
                        arrsels[i] = selsDropDown;
                    }
                    if (i !== 0 && odds_cid == sharbsRow.odds_cid
                        && odds_matchid == sharbsRow.odds_matchid
                        && odds_market == sharbsRow.odds_market
                        && odds_bm_market == sharbsRow.odds_bm_market) {
                        sharbsRow.odds_sel = odds_sel;
                    }
                    return sharbsRow;
                });
                this.setState({
                    arrList: newSharbs,
                    arrbookmaker: arrbookmaker,
                    arrsels: arrsels
                });
            }
        }
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
                                            </a> : ''
                                    }


                                </div>
                            </div>
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                <thead>
                                    <tr className="bg-light">
                                        <th>#</th >
                                        <th>League</th>
                                        <th>Match </th>
                                        <th>Markets <input onChange={this.handleMarketCheckBoxChange} id="marketAll" type="checkbox" name="marketAll" /></th>
                                        <th>PN </th>
                                        <th>Market Bookmakers <input onChange={this.handleBookmakerCheckBoxChange} id="mbookmakerAll" type="checkbox" name="mbookmakerAll" /></th>
                                        <th>SEL <input onChange={this.handleSelCheckBoxChange} id="selAll" type="checkbox" name="selAll" /></th>
                                        <th>Bookmaker </th>
                                        <th>Tag </th>
                                        <th>Color </th>
                                        <th>Events </th>
                                        <th>Home Odds </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <TableListContent arrsels={this.state.arrsels} arrbookmaker={this.state.arrbookmaker} uogoal={this.state.uogoal} arrMarkets={this.state.arrMarkets} arrTags={this.state.arrTags} updateBookmakers={this.updateBookmakers} handleDeleteRow={this.handleDeleteRow} arrMatches={this.state.arrMatches} arrBookmakerTags={this.state.arrBookmakerTags} sharbsRows={this.state.arrList} handleMulipleInputChange={this.handleMulipleInputChange} arrLeague={this.state.arrLeague} updateSite={this.updateSite} pageLimit={this.state.pageLimit} activePage={this.state.activePage} arrlist={this.state.arrList} loading={this.state.loading} />

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
    console.log('props.arrlist', props.arrlist);
    return (
        <tbody>

            {
                (props.loading) ?
                    <tr><td colSpan="14" >
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
                                                    }) : <option value=""> No matches found</option>
                                            }
                                        </select>

                                    </div>
                                    <p className="help is-danger">{dataRow.odds_matchid_err}</p>
                                </td>
                                <td><div className="select is-fullwidth">
                                    <select name="odds_market" id={dataRow._id} value={dataRow.odds_market} onChange={props.handleMulipleInputChange(index)}>
                                        <option value="0">Select Market </option>
                                        {
                                            props.arrMarkets[index] && props.arrMarkets[index].length > 0 ?
                                                props.arrMarkets[index].map(function (dataRow) {

                                                    return (
                                                        <option value={dataRow.maketId}>{dataRow.market_name}</option>

                                                    )

                                                }) : ''
                                        }
                                        {
                                            props.uogoal[index] ? <option value="uogoal">Under/Over goals </option> : null
                                        }
                                    </select>
                                </div>
                                    <p className="help is-danger">{dataRow.odds_market_err}</p>
                                </td>
                                <td><div className="select is-fullwidth">
                                    <select name="odds_pn" id={dataRow._id} onChange={props.handleMulipleInputChange(index)}>

                                        <option value="0" >0</option>
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                    </select>
                                </div></td>
                                <td><div className="select is-fullwidth">
                                    <select name="odds_bm_market" value={dataRow.odds_bm_market} id={dataRow._id} onChange={props.handleMulipleInputChange(index)}>
                                        <option value="0">Select Bookmaker</option>
                                        {
                                            props.arrbookmaker[index] && props.arrbookmaker[index].length > 0 ?
                                                props.arrbookmaker[index].map(function (dataRow) {
                                                    return (
                                                        <option value={dataRow.bmid}>{dataRow.bm_name}</option>
                                                    )
                                                }) : <option value=""> No bookmaker found</option>
                                        }
                                    </select>
                                </div>
                                    <p className="help is-danger">{dataRow.odds_bm_market_err}</p>
                                </td>
                                <td><div className="select is-fullwidth">
                                    <select name="odds_sel" id={dataRow._id} value={dataRow.odds_sel} onChange={props.handleMulipleInputChange(index)}>
                                        <option value="0">Select Sel</option>
                                        {
                                            props.arrsels[index] && props.arrsels[index].length > 0 ?
                                                props.arrsels[index].map(function (dataRow) {
                                                    return (
                                                        <option value={dataRow.name}>{dataRow.value}</option>
                                                    )
                                                }) : <option value="0">No sels found </option>
                                        }
                                    </select>
                                </div>
                                    <p className="help is-danger">{dataRow.odds_sel_err}</p>
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
                                <td>
                                    <div className="select is-fullwidth">
                                        <select name="odds_tag" onChange={props.handleMulipleInputChange(index)}>
                                            <option value="0">Select League</option>

                                            {
                                                props.arrTags.length > 0 ?
                                                    props.arrTags.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow.tagName}>{dataRow.tagName}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div className="select is-fullwidth">
                                        <select name="odds_tag_color" onChange={props.handleMulipleInputChange(index)}>
                                            <option value="0">Select</option>
                                            <option value="#7CFC00">Green</option>
                                            <option value="#FFC200">Amber</option>
                                            <option value="#FF0000">Red</option>
                                        </select>


                                    </div>
                                </td>
                                <td><input className={"input "} type="text" name="odds_events" placeholder="Events" value={dataRow.odds_events} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td><input className={"input "} type="text" name="odds_xo" placeholder="Home Win Odds" value={dataRow.odds_xo} onChange={props.handleMulipleInputChange(index)} /></td>
                                <td>  <button data-tip="Delete" onClick={props.updateBookmakers.bind(this, 'delete', dataRow._id, index)} className="button is-danger is-small tooltip" data-tooltip="Delete">
                                    <span className="icon has-text-white">
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </button>
                                    <ReactTooltip /></td>
                            </tr>
                        }) : <tr><td colSpan="14" style={{ 'textAlign': 'center' }} >No records found.</td></tr>


            }


        </tbody>
    )

}





