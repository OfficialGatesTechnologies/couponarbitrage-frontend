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

export default withRouter(class manage_cashback_claims extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            storeData: [],
            affData: [],
            bannerData: [],
            showcashback_type: '',
            claimData: {
                _id: '',
                username: "",
                date_joined: '',
                notes: "",
                date_confirmed: '',
                status: "",
               
            },
            errors: {
                username: null,
                date_joined: null,
                notes: null,
                date_confirmed: null,
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
        axios.get(apiUrl + 'admin/cashback-claims/cliam-row?_id=' + editId)
            .then(res => {
                var claimData = res.data.results;

                this.setState({ claimData: claimData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                   Router.push(`/cashback_claims/unconfirmed`);
                }
            })
    }


    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { claimData } = this.state;
        const allFields = {
            username: {
                message: "Please enter the username.",
                doValidate: () => {
                    const value = _.trim(_.get(claimData, 'username', ""));
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
        const { claimData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-claims/update-claim', claimData).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
           // Router.push(`/cashback_claims/unconfirmed`);
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
        const { claimData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        claimData[name] = value;
        this.setState({
            claimData: claimData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { claimData } = this.state;
        claimData[fieldName] = e.toLocaleDateString();
        this.setState({
            claimData: claimData
        })

    }

    render() {
        const { claimData, error } = this.state;


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
                                            <Link href="/cashback_claims/unconfirmed" prefetch>
                                                <a href="#"> Cashback Offer List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Offer </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Cashback Offer    Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Money Bookers Name    </label>
                                    <p>{claimData.affil_username}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Site    </label>
                                    <p>{claimData.aff_id ? claimData.aff_id.title : ''}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Type    </label>
                                    <p>{claimData.store_id ? claimData.store_id.title : ''}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Amount    </label>
                                    <p>{claimData.amount ? claimData.amount : ''}</p>
                                </div>
                            </div>




                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Username on Gambling Site   </label>
                                    <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" placeholder="username" value={claimData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'username')}</p>
                                </div>
                            </div>


                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Date Joined</label>
                                    <DayPickerInput value={claimData.date_joined} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'date_joined')} />

                                    <p className="help is-danger">{_.get(error, 'date_joined')}</p>

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Date Confirmed</label>
                                    <DayPickerInput value={claimData.date_confirmed} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'date_confirmed')} />

                                    <p className="help is-danger">{_.get(error, 'date_confirmed')}</p>

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Notes  </label>

                                    <textarea className={"textarea " + (_.get(error, 'notes') ? ' is-danger' : '')} name="notes" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={claimData.notes} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'notes')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Status</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(claimData.status) ? claimData.status : 0}`} name="status" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="N">Not tracked</option>
                                            <option value="A">Payable</option>
                                            <option value="M">More information requested </option>
                                           
                                            <option value="P">Pending</option>
                                            <option value="C">Confirmed</option>
                                            <option value="S">Paid</option>
                                            <option value="X">Cancelled</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'status')}</p>
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




