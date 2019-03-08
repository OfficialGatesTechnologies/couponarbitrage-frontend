import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import Image from 'react-image-resizer';

export default withRouter(class manage_sharbs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            arrTags: [],
            arrBookmakerTags: [],
            arrMatches: [],
            arrMarkets: [],
            arrbookmaker: [],
            arrsels: [],
            uogoal: false,
            articleData: {
                _id: '',
                odds_cid: '',
                odds_matchid: '',
                odds_bmid: "",
                odds_market: "",
                odds_bm_market: "",
                odds_pn: 0,
                odds_sel: "",
                odds_sel_val: "",
                odds_bmid: "",
                odds_ho: "",
                odds_xo: "",
                odds_ao: "",
                odds_ho_old: "",
                odds_xo_old: "",
                odds_ao_old: "",
                odds_events: "",
                odds_tag: "",
                odds_tag_color: "",
            },
            errors: {
                odds_cid: null,
                odds_matchid: null,
                odds_bmid: null,
                odds_ho: null,

            },

            editForm: false,
        }


    }
    componentDidMount = () => {

        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })

        if (editId) {
            this.getArticleRow(editId);
        }
        this.getAllBookmaker();
    }

    getAllBookmaker = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-league-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    arrTags: res.data.tags,
                    arrBookmakerTags: res.data.bookTags
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getArticleRow = (editId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/bookmaker/bookmaker-row?_id=' + editId)
            .then(res => {
                var articleData = res.data.results;
                this.setState({ articleData: articleData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/bookmakers`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { articleData } = this.state;
        const allFields = {

            odds_cid: {
                message: "Please select league.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'odds_cid', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            odds_matchid: {
                message: "Please select match.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'odds_matchid', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            odds_bmid: {
                message: "Please select bookmaker.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'odds_bmid', ""));
                    if (value.length > 0 && value != 0) {
                        return true;
                    }
                    return false;
                }
            },
            odds_ho: {
                message: "Please enter home win odds.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'odds_ho', ""));
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
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                }
            });
            callback(isValid);
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let fieldNeedToValidate = [];

        fieldNeedToValidate = ['odds_cid', 'odds_matchid', 'odds_bmid', 'odds_ho'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createSharbs() : this.updateSharbs();
            }
        });

    }
    createSharbs = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });
 
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/create-sharbs', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/sharbs`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateSharbs = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/update-sharbs', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/sharbs`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');

        });
    }

    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);

    }
    handleInputChange = (e) => {
        const { articleData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        articleData[name] = value;
        this.setState({
            articleData: articleData
        })
        if (name == 'odds_cid') this.getMatches(value);
        if (name == 'odds_matchid') this.getMarkets(articleData.odds_cid, value, 0);
        if (name == 'odds_market') this.getBookmakers(articleData.odds_cid, articleData.odds_matchid, value);
        if (name == 'odds_bm_market') this.getSel(articleData.odds_cid, articleData.odds_matchid, articleData.odds_market, value);
    }
    handleEditorChange = (name, e) => {
        const { articleData } = this.state;
        const value = e.editor.getData();
        articleData[name] = value;
        this.setState({
            articleData: articleData
        })
    }
    getMatches = (comp_id) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-matches-list?comp_id=' + comp_id;
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrMatches: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }
    getMarkets = (odds_cid, odds_matchid) => {
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
                this.setState({
                    arrMarkets: resMarketList,
                    uogoal: (res.data.layunovodds).length > 0 ? true : false
                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    getBookmakers = (odds_cid, odds_matchid, odds_market) => {
        let bookmaker;
        this.setState({
            arrbookmaker: [],

        });
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
                this.setState({
                    arrbookmaker: resBookmakerList,

                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    getSel = (odds_cid, odds_matchid, odds_market, odds_bm_market) => {
        const { articleData } = this.state;
        let sels;
        this.setState({
            arrsels: [],

        });
        let resSelsList = [];
        let selsIds = [];
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/get-sels-list?odds_cid=' + odds_cid + '&odds_matchid=' + odds_matchid + '&odds_market=' + odds_market + '&odds_bm_market=' + odds_bm_market + '&odds_pn=' + articleData.odds_pn;
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
                this.setState({
                    arrsels: resSelsList,
                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }



    render() {
        const { articleData, error } = this.state;

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} </title>
                </Head>
                <div className="page-wrapper" id="page-wrapper">
                    <div className="columns">
                        <div className="column">
                            <div className="box bread-box is-shadowless has-background-white">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li>
                                            <Link href="/dashboard" prefetch>
                                                <a href="#">Dashboard</a>
                                            </Link>
                                        </li>
                                        <li className="is-active"><a href="#">Betting Settings</a></li>
                                        <li>
                                            <Link href="/sharbs" as="/sharbs" prefetch>
                                                <a href="#">Sharbs List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Sharb </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Sharbs   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">League   </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_cid) ? articleData.odds_cid : 0}`} name="odds_cid" onChange={this.handleInputChange}>
                                            <option value="0">Select League</option>
                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow.c_id}>{dataRow.c_name}</option>

                                                        )
                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'odds_cid')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Match    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_matchid) ? articleData.odds_matchid : 0}`} name="odds_matchid" onChange={this.handleInputChange}>
                                            <option value="0">Select Match </option>
                                            {
                                                this.state.arrMatches.length > 0 ?
                                                    this.state.arrMatches.map(function (dataRow) {
                                                        return (
                                                            <option value={dataRow.match_id}>{dataRow.match_hometeam} VS {dataRow.match_awayteam}</option>
                                                        )
                                                    }) : <option value="0">No matches found </option>
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'odds_matchid')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Market   </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_market) ? articleData.odds_market : 0}`} name="odds_market" onChange={this.handleInputChange}>
                                            <option value="0">Select Market </option>
                                            {
                                                this.state.arrMarkets.length > 0 ?
                                                    this.state.arrMarkets.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow.maketId}>{dataRow.market_name}</option>

                                                        )

                                                    }) : ''
                                            }
                                            {
                                                this.state.uogoal ? <option value="uogoal">Under/Over goals </option> : null
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'odds_market')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">PN    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_pn) ? articleData.odds_pn : 0}`} name="odds_pn" onChange={this.handleInputChange}>
                                            <option value="0" >0</option>
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'odds_pn')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Market Bookmakers    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_bm_market) ? articleData.odds_bm_market : 0}`} name="odds_bm_market" onChange={this.handleInputChange}>
                                            <option value="0">Select Bookmakers </option>
                                            {
                                                this.state.arrbookmaker.length > 0 ?
                                                    this.state.arrbookmaker.map(function (dataRow) {
                                                        return (
                                                            <option value={dataRow.bmid}>{dataRow.bm_name}</option>
                                                        )
                                                  }) : <option value="0">No bookmakers found </option>
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'odds_bm_market')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">SEL     </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_sel) ? articleData.odds_sel : 0}`} name="odds_sel" onChange={this.handleInputChange}>
                                            <option value="0">Select  </option>
                                            {
                                                this.state.arrsels.length > 0 ?
                                                    this.state.arrsels.map(function (dataRow) {
                                                        return (
                                                            <option value={dataRow.name}>{dataRow.value}</option>
                                                        )

                                                    }) : <option value="0">No sels found </option>
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'odds_sel')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Bookmaker    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_bmid) ? articleData.odds_bmid : 0}`} name="odds_bmid" onChange={this.handleInputChange}>
                                            <option value="0">Select League</option>

                                            {
                                                this.state.arrBookmakerTags.length > 0 ?
                                                    this.state.arrBookmakerTags.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow.bm_id}>{dataRow.bm_name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'odds_bmid')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Home Win Odds  </label>
                                    <input className={"input " + (_.get(error, 'odds_ho') ? ' is-danger' : '')} type="text" name="odds_ho" placeholder="Home Win Odds" value={articleData.odds_ho} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'odds_ho')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Draw Odds   </label>
                                    <input className={"input " + (_.get(error, 'odds_xo') ? ' is-danger' : '')} type="text" name="odds_xo" placeholder="Draw Odds" value={articleData.odds_xo} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'odds_xo')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Away Odds   </label>
                                    <input className={"input " + (_.get(error, 'odds_ao') ? ' is-danger' : '')} type="text" name="odds_ao" placeholder="Away Odds" value={articleData.odds_ao} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'odds_ao')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Tag    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_tag) ? articleData.odds_tag : 0}`} name="odds_tag" onChange={this.handleInputChange}>
                                            <option value="0">Select League</option>

                                            {
                                                this.state.arrTags.length > 0 ?
                                                    this.state.arrTags.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow.tagName}>{dataRow.tagName}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'odds_tag')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Color  </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.odds_tag_color) ? articleData.odds_tag_color : 0}`} name="odds_tag_color" onChange={this.handleInputChange}>
                                            <option value="0">Select</option>
                                            <option value="#7CFC00">Green</option>
                                            <option value="#FFC200">Amber</option>
                                            <option value="#FF0000">Red</option>
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'odds_tag_color')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <p className="buttons">
                                    <button onClick={this.handleSubmit} className="button is-theme">Submit </button>
                                </p>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        )
    }

})




