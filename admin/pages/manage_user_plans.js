import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default withRouter(class manage_user_plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            arrpLans: [],
            showcashback_type: '',
            planData: {
                _id: '',
                username: "",
                subscribed_on: '',
                notes: "",
                expired_on: '',
                status: "",

            },
            errors: {
                username: null,
                subscribed_on: null,
                notes: null,
                expired_on: null,
            },

            editForm: false,
        }


    }
    componentDidMount = () => {
        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => { })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        if (editId) {
            this.getRow(editId);
        }
        this.getAllPlans();
    }

    getAllPlans = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/all-plans';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrpLans: res.data.results,

                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/bookmaker/user-plan-row?_id=' + editId)
            .then(res => {
                var planData = res.data.results;

                this.setState({ planData: planData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/user_plans`);
                }
            })
    }


    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { planData } = this.state;
        const allFields = {
            plan_id: {
                message: "Please select a plan.",
                doValidate: () => {
                    const value = _.trim(_.get(planData, 'plan_id', ""));
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
        const { planData } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['plan_id'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/bookmaker/update-user-plan', planData).then((result) => {
                    let sucMsg = result.data.msg;
                    toastr.success(sucMsg, '');
                    Router.push(`/user_plans`);
                }).catch(error => {
                    let errorMsg = error.response.data.msg;
                    toastr.error(errorMsg, 'Error!');
                });
            }
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
        const { planData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        planData[name] = value;
        this.setState({
            planData: planData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { planData } = this.state;
        planData[fieldName] = e.toLocaleDateString();
        this.setState({
            planData: planData
        })

    }

    render() {
        const { planData, error } = this.state;


        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Subscription Plan Manager  </title>
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
                                        <li className="is-active"><a href="#">Betting Settings </a></li>
                                        <li>
                                            <Link href="/user_plans" prefetch>
                                                <a href="#">  Subsciption Plan  List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Subscription Plan   </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Subscription Plan  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Subscriber Name     </label>
                                    <p>{planData.user_id ? planData.user_id.username : ''}</p>
                                </div>
                            </div>


                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Name    </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(planData.plan_id) ? planData.plan_id : 0}`} name="plan_id" onChange={this.handleInputChange}>
                                            <option value="0">Select Plan</option>
                                            {
                                                this.state.arrpLans.length > 0 ?
                                                    this.state.arrpLans.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow._id}>{dataRow.plan_name}</option>

                                                        )
                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'plan_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Method</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(planData.plan_paymentmethod) ? planData.plan_paymentmethod : 0}`} name="plan_paymentmethod" onChange={this.handleInputChange}>
                                            <option value="0">Select Payment</option>
                                            <option value="Skrill">Skrill</option>
                                            <option value="PayPal" selected="selected">PayPal</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'plan_paymentmethod')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Date Joined</label>
                                    <DayPickerInput value={planData.subscribed_on?planData.subscribed_on:''} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'subscribed_on')} />
                                    <p className="help is-danger">{_.get(error, 'subscribed_on')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Date Confirmed</label>
                                    <DayPickerInput value={planData.expired_on?planData.expired_on:''} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'expired_on')} />
                                    <p className="help is-danger">{_.get(error, 'expired_on')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Notes  </label>
                                    <textarea className={"textarea " + (_.get(error, 'notes') ? ' is-danger' : '')} name="notes" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={planData.notes} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'notes')}</p>
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




