import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import CKEditor from "react-ckeditor-component";
export default withRouter(class email_temp_manager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageData: {
                _id: '',
                pageTitle: '',
                pageContent: "",

            },
            errors: {
                pageTitle: null,
                pageContent: null,

            },

            editForm: false,

        }


    }
    componentDidMount = () => {
        const tempId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {
                this.setState({

                })
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })

        if (tempId) {
            this.getUserRow(tempId);
        }
    }

    getUserRow = (tempId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/pages-row?_id=' + tempId)
            .then(res => {
                var pageData = res.data.results;

                this.setState({ pageData: pageData, editForm: true, })
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/pages`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { pageData } = this.state;
        const allFields = {
            pageTitle: {
                message: "Please enter the  subject.",
                doValidate: () => {
                    const value = _.trim(_.get(pageData, 'pageTitle', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            pageContent: {
                message: "Please enter the mail content.",
                doValidate: () => {
                    const value = _.trim(_.get(pageData, 'pageContent', ""));
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
        fieldNeedToValidate = ['pageTitle', 'pageContent'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                this.updateAdminAccount();
            }
        });

    }

    updateAdminAccount = () => {
        const { pageData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-page', {
            pageData: pageData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/pages`);
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
        const { pageData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        pageData[name] = value;
        this.setState({
            pageData: pageData
        })
    }
    handleEditorChange = (e) => {
        const { pageData } = this.state;
        const value = e.editor.getData();
        pageData['pageContent'] = value;
        this.setState({
            pageData: pageData
        })
    }


    render() {
        const { pageData, error } = this.state;

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
                                        <li>
                                            <Link href="/pages" prefetch>
                                                <a href="#">Page</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Page</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Page  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Subject  </label>
                                    <input className={"input " + (_.get(error, 'pageTitle') ? ' is-danger' : '')} name="pageTitle" type="text" placeholder="Name" value={pageData.pageTitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'pageTitle')}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Mail Content  </label>
                                    <CKEditor activeClass="p10"
                                        content={pageData.pageContent}
                                        events={{

                                            "change": this.handleEditorChange
                                        }} />
                                    <p className="help is-danger">{_.get(error, 'pageContent')}</p>
                                </div>
                            </div>

                        </div>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Title </label>
                                    <input className={"input " + (_.get(error, 'pageMetaTitle') ? ' is-danger' : '')} name="pageMetaTitle" type="text" placeholder="Meta title" value={pageData.pageMetaTitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'pageMetaTitle')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Keywords </label>
                                    <textarea className={"textarea " + (_.get(error, 'pageMetaKeywords') ? ' is-danger' : '')} name="pageMetaKeywords" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={pageData.pageMetaKeywords} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'pageMetaKeywords')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'pageMetaDescription') ? ' is-danger' : '')} name="pageMetaDescription" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={pageData.pageMetaDescription} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'pageMetaDescription')}</p>
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




