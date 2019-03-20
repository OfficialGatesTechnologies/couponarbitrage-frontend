import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl, ADMINMODULES } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import CheckBoxComp from '../components/CheckBoxComp';
export default withRouter(class manage_plans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planData: {
                _id: '',
                plan_name: '',
                plan_duration_upto: '',
                plan_price: "",
                plan_duration: "",
                plan_duration_type: "week",
                plan_features: "",
            },
            errors: {
                plan_name: null,
                plan_duration_upto: null,
                plan_price: null,
                plan_duration: null,
                plan_features: null,
            },
            editForm: false,
            arrplan_features: [],
            plan_features: [
                { id: 1, value: "Shop Arbs", text: "Shop Arbs", isChecked: false },
                { id: 2, value: "Odds Comparison ", text: "Odds Comparison ", isChecked: false },
                { id: 3, value: " All Bookmakers ", text: " All Bookmakers ", isChecked: false },
                { id: 4, value: " All Markets ", text: " All Markets ", isChecked: false },
                { id: 4, value: " Member Chat ", text: " Member Chat ", isChecked: false },
                { id: 4, value: " Web, iOS and Android ", text: " Web, iOS and Android ", isChecked: false }
            ]
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
            this.getUserRow(accoutId);
        }
    }

    getUserRow = (accountid) => {
        let plan_features = this.state.plan_features
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/bookmaker/plan-row?_id=' + accountid)
            .then(res => {
                var planData = res.data.results;
                var arrplan_features = planData.plan_features;
                plan_features.forEach(plan_features => {
                    if (arrplan_features.indexOf(plan_features.value) >= 0) {
                        plan_features.isChecked = true
                    }
                })
                this.setState({ arrplan_features: arrplan_features, planData: planData, editForm: true, plan_features: plan_features })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/plans`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { planData } = this.state;
        const allFields = {
            plan_name: {
                message: "Please enter the plan name.",
                doValidate: () => {
                    const value = _.trim(_.get(planData, 'plan_name', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            plan_price: {
                message: "Please enter the plan price.",
                doValidate: () => {
                    const value = _.trim(_.get(planData, 'plan_price', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            plan_duration: {
                message: "Please enter the subscription cycle.",
                doValidate: () => {
                    const value = _.get(planData, 'plan_duration', '');
                    if (value) {
                        return true;
                    }
                    return false;
                }
            }, plan_description: {
                message: "Please enter the plan description.",
                doValidate: () => {
                    const type = _.trim(_.get(planData, 'plan_description', ""));
                    if (type.length > 0) {
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
        fieldNeedToValidate = ['plan_name', 'plan_price', 'plan_description', 'plan_duration'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createPlan() : this.updatePlan();
            }
        });

    }
    createPlan = () => {
        const { planData, changePass } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/create-plan', {
            planData: planData,
            changePass: changePass
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/plans`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updatePlan = () => {
        const { planData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/update-plan', {
            planData: planData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/plans`);
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
        const { planData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        planData[name] = value;
        this.setState({
            planData: planData
        })
    }
    handleCheckBoxChange = (e) => {
        var checked = e.target.checked;
        this.setState({ changePass: checked });
        
    }
    handlePrivilegesCheckBox = (e) => {
        const { planData } = this.state;
        let errors = this.state.errors;
        let plan_features = this.state.plan_features
        plan_features.forEach(plan_features => {
            if (plan_features.value === e.target.value) {
                plan_features.isChecked = e.target.checked
                if (e.target.checked === true) {
                    this.state.arrplan_features.push(e.target.value);
                } else {
                    this.state.arrplan_features.pop(e.target.value);
                }
            }
        })
        planData['plan_features'] = this.state.arrplan_features;
        this.setState({ plan_features: plan_features, planData: planData })
        let fieldNeedToValidate = ['plan_features'];
        errors['plan_features'] = null;
        this.formValidation(fieldNeedToValidate);
    }


    render() {
        const { planData, error } = this.state;

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Subscription Plans  </title>
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
                                            <Link href="/plans" prefetch>
                                                <a href="#">Subscription Plans</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Plan</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Plan Info  </h2>
                        <hr></hr>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Name </label>
                                    <input className={"input " + (_.get(error, 'plan_name') ? ' is-danger' : '')} name="plan_name" type="text" placeholder="Name" value={planData.plan_name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'plan_name')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Price </label>
                                    <input className={"input " + (_.get(error, 'plan_price') ? ' is-danger' : '')} type="text" name="plan_price" placeholder="plan_price" value={planData.plan_price} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'plan_price')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Cycle Duration </label>
                                    <input className={"input " + (_.get(error, 'plan_duration') ? ' is-danger' : '')} name="plan_duration" type="text" placeholder="Duration" value={planData.plan_duration} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'plan_duration')}</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Duration Type </label>
                                    <div className="select is-fullwidth">
                                        <select name="plan_duration_type" value={planData.plan_duration_type} onChange={this.handleInputChange}>
                                            <option value="week">Week</option>
                                            <option value="month">Month</option>
                                            <option value="year">Year</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'plan_duration_type')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Discount </label>
                                    <input className={"input " + (_.get(error, 'plan_discount') ? ' is-danger' : '')} name="plan_discount" type="text" placeholder="Discount" value={planData.plan_discount} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'plan_discount')}</p>
                                </div>
                            </div>
                        </div>





                        <div className="columns">
                            <div className="column is-12">
                                <div class="field">
                                    <div class="control ctrl-lab">
                                        <label className="label has-text-grey">Plan Features  </label>
                                        {
                                            this.state.plan_features.map((plan_features) => {
                                                return (<CheckBoxComp handleCheckChieldElement={this.handlePrivilegesCheckBox} {...plan_features} />)
                                            })
                                        }
                                        <p className="help is-danger">{_.get(error, 'plan_features')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Plan Description  </label>

                                    <textarea className={"textarea " + (_.get(error, 'plan_description') ? ' is-danger' : '')} name="plan_description" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={planData.plan_description} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'plan_description')}</p>
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




