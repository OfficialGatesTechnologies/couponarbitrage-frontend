import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class manage_faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            faqData: {
                _id: '',
                faqQuestion: '',

            },
            errors: {
                faqQuestion: null,
            },
            editForm: false,
        }
    }
    componentDidMount = () => {
        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {

            }).catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        if (editId) {
            this.getCatRow(editId);
        }

    }



    getCatRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/faq-row?_id=' + editId)
            .then(res => {
                var faqData = res.data.results;
                this.setState({ faqData: faqData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/faqs`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { faqData } = this.state;
        const allFields = {

            faqCategory: {
                message: "Please select a category.",
                doValidate: () => {
                    const value = _.trim(_.get(faqData, 'faqCategory', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },faqQuestion: {
                message: "Please enter the question.",
                doValidate: () => {
                    const value = _.trim(_.get(faqData, 'faqQuestion', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },faqAnswer: {
                message: "Please enter the answer.",
                doValidate: () => {
                    const value = _.trim(_.get(faqData, 'faqAnswer', ""));
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
        fieldNeedToValidate = ['faqCategory','faqQuestion','faqAnswer'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createSite() : this.updateSite();

            }
        });

    }
    createSite = () => {
        const { faqData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/create-faq', {
            faqData: faqData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/faq`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateSite = () => {
        const { faqData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-faq', {
            faqData: faqData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/faq`);
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
        const { faqData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        faqData[name] = value;
        this.setState({
            faqData: faqData
        })
    }




    render() {
        const { faqData, error } = this.state;

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
                                        <li className="is-active"><a href="#">Master Data</a></li>
                                        <li>
                                            <Link href="/faq" prefetch>
                                                <a href="#"> Faqs List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Faqs </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Faqs   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Category  </label>
                                    <div className="select is-fullwidth">
                                        <select name="faqCategory" value={faqData.faqCategory} onChange={this.handleInputChange}>
                                            <option value="0" selected="selected">Select Category</option>
                                            <option value="Asianconnect">Asianconnect Cashback</option>
                                            <option value="Skrill">Skrill</option>
                                            <option value="SBObet">SBObet</option>
                                            <option value="Neteller">Neteller</option>
                                            <option value="RAF">RAF</option>
                                            <option value="Ecopayz">Ecopayz</option>
                                            <option value="Home">Home</option>
                                            <option value="Affiliate">Affiliate</option>
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'faqCategory')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Question  </label>
                                    <input className={"input " + (_.get(error, 'faqQuestion') ? ' is-danger' : '')} type="text" name="faqQuestion" placeholder="Question" value={faqData.faqQuestion} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'faqQuestion')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">

                             
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Answer  </label>
                                    <textarea className={"textarea " + (_.get(error, 'faqAnswer') ? ' is-danger' : '')} name="faqAnswer" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={faqData.faqAnswer} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'faqAnswer')}</p>
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




