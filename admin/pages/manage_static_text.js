import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
export default withRouter(class manage_plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            staticData: {
                _id: '',

                static_text_for: "",

            },
            errors: {

            },
            editForm: false,

        }


    }
    componentDidMount = () => {
        const accoutId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })

        if (accoutId) {
            this.getStaticTextRow(accoutId);
        }
    }


    getStaticTextRow(accountid) {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/static-row?_id=' + accountid)
            .then(res => {
                if (res.data.success) {
                    this.setState({ staticData: res.data.results, editForm: true });
                } else {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/static_text`);
                }

            })
            .catch((error) => {
                if (error) {
                    Router.push(`/static_text`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { staticData } = this.state;
        const allFields = {
            static_text_for: {
                message: "Please select text for.",
                doValidate: () => {
                    const value = _.trim(_.get(staticData, 'static_text_for', ""));
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            static_text_min_val: {
                message: "Please select min value.",
                doValidate: () => {
                    const value = _.trim(_.get(staticData, 'static_text_min_val', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            static_text_max_val: {
                message: "Please select max value.",
                doValidate: () => {
                    const value = _.trim(_.get(staticData, 'static_text_max_val', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, static_text: {
                message: "Please enter valid text.",
                doValidate: () => {
                    const value = _.trim(_.get(staticData, 'static_text', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
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
        fieldNeedToValidate = ['static_text_for', 'static_text_max_val', 'static_text', 'static_text_min_val'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createstaticText() : this.updatestaticText();
            }
        });

    }
    createstaticText() {
        const { staticData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/create', {
            staticData: staticData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/static_text`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updatestaticText() {
        const { staticData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-static', {
            staticData: staticData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/static_text`);
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
        const { staticData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        staticData[name] = value;
        this.setState({
            staticData: staticData
        })
    }


    handleOptionValue = () => {

        var textRange = [];

        for (var i = 0; i <= 250000; i += 1000) {

            textRange.push(<option value={i}>{i}</option>);
        }
        return (textRange)
    }

    render() {
        const { staticData, error } = this.state;

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Turnover Static  </title>
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
                                        <li>
                                            <Link href="/static_text" prefetch>
                                                <a href="#">Turnover Static Text List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Text</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Text Info  </h2>
                        <hr></hr>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">

                                    <label className="label has-text-grey">Text </label>
                                    <input className={"input " + (_.get(error, 'static_text') ? ' is-danger' : '')} name="static_text" type="text" placeholder="static_text" value={staticData.static_text} onChange={this.handleInputChange} onKeyUp={this._onTextFieldBlur} onBlur={this._onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'static_text')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Text For  </label>
                                    <div className="select is-fullwidth">
                                        <select name="static_text_for" value={staticData.static_text_for} onChange={this.handleInputChange}>
                                            <option value="0">Select Brand</option>
                                            <option value="Skrill">Skrill</option>
                                            <option value="Neteller">Neteller</option>
                                            <option value="Ecopayz">Ecopayz</option>
                                            <option value="AsianConnect88">Asianconnect</option>
                                            <option value="SBObet">SBObet</option>
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'static_text_for')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Min Value  </label>
                                    <div className="select is-fullwidth">
                                        <select name="static_text_min_val" value={staticData.static_text_min_val} onChange={this.handleInputChange}>

                                            <option>Select Min Value</option>
                                            {this.handleOptionValue()}
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'static_text_min_val')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Max Value  </label>
                                    <div className="select is-fullwidth">
                                        <select name="static_text_max_val" value={staticData.static_text_max_val} onChange={this.handleInputChange}>

                                            <option>Select Min Value</option>
                                            {this.handleOptionValue()}
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'static_text_max_val')}</p>
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




