import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class manage_cashback_categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: {
                _id: '',
                cat_parent: 0,
                cat_title: '',
                cat_desc: "",

            },
            errors: {
                cat_parent: null,
                cat_title: null,
                cat_desc: null,

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
            this.getCatRow(editId);
        }
        this.getCashbackMenus();
    }

    getCashbackMenus = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/cashback-offer/parent-menu?type=cashback';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getCatRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/cat-row?_id=' + editId)
            .then(res => {
                var catData = res.data.results;

                this.setState({ catData: catData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_categories`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { catData } = this.state;
        const allFields = {
            cat_parent: {
                message: "Please select parent.",
                doValidate: () => {
                    const value = _.trim(_.get(catData, 'cat_parent', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            cat_title: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(catData, 'cat_title', ""));
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
        fieldNeedToValidate = ['cat_parent', 'cat_title'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createUseraccount() : this.updateUserAccount();

            }
        });

    }
    createUseraccount = () => {
        const { catData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/create-cat', {
            catData: catData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_categories`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateUserAccount = () => {
        const { catData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/update-cat', {
            catData: catData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_categories`);
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
        const { catData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        catData[name] = value;
        this.setState({
            catData: catData
        })
    }




    render() {
        const { catData, error } = this.state;

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
                                        <li className="is-active"><a href="#">Cashback Offers</a></li>
                                        <li>
                                            <Link href="/cashback_categories" prefetch>
                                                <a href="#"> Cashback Category List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Category </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Category  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Parent  </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(catData.cat_parent) ? catData.cat_parent : null}`} name="cat_parent" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select category</option>

                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'cat_parent')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Title</label>
                                    <input className={"input " + (_.get(error, 'cat_title') ? ' is-danger' : '')} type="text" name="cat_title" placeholder="last name" value={catData.cat_title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'cat_title')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'cat_desc') ? ' is-danger' : '')} name="cat_desc" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={catData.cat_desc} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'cat_desc')}</p>
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




