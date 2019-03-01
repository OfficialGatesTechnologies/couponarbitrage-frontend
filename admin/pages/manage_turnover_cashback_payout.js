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

export default withRouter(class manage_cashback_payout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            storeData: [],
            affData: [],
            bannerData: [],
            showcashback_type: '',
            payoutData: {
                _id: '',
                value: "",
                date_joined: '',
                notes: "",
                trans_date: '',
                payment_type: "",
            },
            errors: {
                value: null,
                date_joined: null,
                notes: null,
                trans_date: null,
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

    }



    getRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-payouts/turnover-payout-row?_id=' + editId)
            .then(res => {
                var payoutData = res.data.results;

                this.setState({ payoutData: payoutData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_claims/unconfirmed`);
                }
            })
    }


    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { payoutData } = this.state;
        const allFields = {
            payment_type: {
                message: "Please select payment method.",
                doValidate: () => {
                    const value = _.trim(_.get(payoutData, 'payment_type', ""));
                    console.log('value',value.length);
                    if (value != 0 && value.length > 0) {
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
        const { payoutData } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['payment_type'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/cashback-payouts/update-turnover-payout', payoutData).then((result) => {
                    let sucMsg = result.data.msg;
                    toastr.success(sucMsg, '');
                    Router.push(`/turnover_cashback_payouts`);
                    
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
        const { payoutData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        payoutData[name] = value;
        this.setState({
            payoutData: payoutData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { payoutData } = this.state;
        payoutData[fieldName] = e.toLocaleDateString();
        this.setState({
            payoutData: payoutData
        })

    }

    render() {
        const { payoutData, error } = this.state;
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
                                        <li className="is-active"><a href="#">Cashback Payouts</a></li>
                                        <li>
                                        <Link href="/turnover_cashback_payouts" prefetch>
                                                        <a href="#"> Turnover Cashback Payouts   </a>
                                                    </Link>

                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Payouts </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">{payoutData.user_id ? payoutData.user_id.name : ''} ({payoutData.user_id ? payoutData.user_id.email : ''}) Payment Methods   </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="table-responsive dash-table-res">
                                    <div className="level">

                                        <div>
                                        </div>
                                    </div>
                                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-size-6">
                                        <thead><tr className="bg-light">
                                            <th>Payment Method</th>
                                            <th>Payment Email</th>
                                            <th>Account Name </th>
                                            <th>Sort Code</th>
                                            <th>Account Number</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Skrill</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.accountSkrillEmail : '--'}</td>
                                                <td>--</td>
                                                <td>--</td>
                                                <td>--</td>
                                            </tr>
                                            <tr>
                                                <td>Neteller</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.accountNetellerEmail : '--'}</td>
                                                <td>--</td>
                                                <td>--</td>
                                                <td>--</td>
                                            </tr>
                                            <tr>
                                                <td>PayPal</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.accountPaypalEmail : '--'}</td>
                                                <td>--</td>
                                                <td>--</td>
                                                <td>--</td>
                                            </tr>
                                            <tr>
                                                <td>BACS</td>
                                                <td>--</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.bankAccountName : '--'}</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.bankAccountSortCode : '--'}</td>
                                                <td>{payoutData.user_id ? payoutData.user_id.bankAccountNumber : '--'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Payout Details  </h2>
                        <hr></hr>
                        <div className="columns">



                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">User    </label>
                                    <p>{payoutData.user_id ? payoutData.user_id.name : ''} ({payoutData.user_id ? payoutData.user_id.email : ''})</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Turnover Cashback Schemes     </label>
                                    <p>{payoutData.tb_type ? payoutData.tb_type.name : ''}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Amount    </label>
                                   <p>{payoutData.value}</p>
                                     
                                </div>
                            </div>


                        </div>
                        <div className="columns">
                           


                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Method</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(payoutData.payment_type) ? payoutData.payment_type : 0}`} name="payment_type" onChange={this.handleInputChange}>
                                            <option value="0">Select Payment Method</option>
                                            <option value="1">PayPal</option>
                                            <option value="2">Skrill</option>
                                            <option value="3">Bank Transfer</option>
                                            <option value="4">Neteller</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'payment_type')}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Email    </label>
                                    <input className={"input " + (_.get(error, 'payment_email') ? ' is-danger' : '')} type="text" name="payment_email" placeholder="Email" value={payoutData.payment_email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'payment_email')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Date</label>
                                    <DayPickerInput value={payoutData.trans_date} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'trans_date')} />

                                    <p className="help is-danger">{_.get(error, 'trans_date')}</p>

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Notes  </label>

                                    <textarea className={"textarea " + (_.get(error, 'notes') ? ' is-danger' : '')} name="notes" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={payoutData.notes} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'notes')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">



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




