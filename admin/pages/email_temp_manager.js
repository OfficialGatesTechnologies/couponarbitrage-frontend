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
            tempData: {
                _id: '',
                template_subject: '',
                template_content: "",

            },
            errors: {
                template_subject: null,
                template_content: null,

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
        axios.get(apiUrl + 'admin/masterdata/email-temp-row?_id=' + tempId)
            .then(res => {
                var tempData = res.data.results;

                this.setState({ tempData: tempData, editForm: true, })
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/email_templates`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { tempData } = this.state;
        const allFields = {
            template_subject: {
                message: "Please enter the  subject.",
                doValidate: () => {
                    const value = _.trim(_.get(tempData, 'template_subject', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            template_content: {
                message: "Please enter the mail content.",
                doValidate: () => {
                    const value = _.trim(_.get(tempData, 'template_content', ""));
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
        fieldNeedToValidate = ['template_subject', 'template_content'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                this.updateAdminAccount();
            }
        });

    }

    updateAdminAccount = () => {
        const { tempData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-email-temp', {
            tempData: tempData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/email_templates`);
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
        const { tempData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        tempData[name] = value;
        this.setState({
            tempData: tempData
        })
    }
    handleEditorChange = (e) => {
        const { tempData } = this.state;
        const value = e.editor.getData();
        tempData['template_content'] = value;
        this.setState({
            tempData: tempData
        })
    }


    render() {
        const { tempData, error } = this.state;
       
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
                                            <Link href="/email_templates" prefetch>
                                                <a href="#">Mail Templates</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Mail Template</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Mail Template  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Subject  </label>
                                    <input className={"input " + (_.get(error, 'template_subject') ? ' is-danger' : '')} name="template_subject" type="text" placeholder="Name" value={tempData.template_subject} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'template_subject')}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Mail Content  </label>
                                    <CKEditor activeClass="p10"
                                        content={tempData.template_content}
                                        events={{

                                            "change": this.handleEditorChange
                                        }} />
                                    <p className="help is-danger">{_.get(error, 'template_content')}</p>
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




