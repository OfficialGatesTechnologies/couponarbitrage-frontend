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

export default withRouter(class manage_cashback_offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            storeData: [],
            affData: [],
            bannerData: [],
            showcashback_type: '',
            offerData: {
                _id: '',
                store_id: "",
                cashback_type: '',
                description: "",
                expiry_date: '',
                exclusive_rate: "",
                vip_offer: '',
            },
            errors: {
                store_id: null,
                cashback_type: null,
                description: null,
                expiry_date: null,
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
        this.getDropDownData();
    }



    getRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/offer-row?_id=' + editId)
            .then(res => {
                var offerData = res.data.results;

                this.setState({ offerData: offerData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_offers`);
                }
            })
    }

    getDropDownData = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/get-all-stores')
            .then(res => {
                var storeData = res.data.results;
                this.setState({ storeData: storeData })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_offers`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { offerData } = this.state;
        const allFields = {
            store_id: {
                message: "Please select store.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'store_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            cashback_type: {
                message: "Please select type.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'cashback_type', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            network_commission: {
                message: "Please enter the network commission.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'network_commission', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, cashback: {
                message: "Please enter the cashback value.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'cashback', ""));
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
        fieldNeedToValidate = ['store_id', 'cashback_type', 'network_commission', 'cashback', 'cashback_type'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createOffers() : this.updateOffers();

            }
        });

    }
    createOffers = () => {
        const { offerData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/create-offer', {offerData:offerData}).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_offers`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateOffers = () => {
        const { offerData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/update-offer',  {offerData:offerData}).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_offers`);
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
        const { offerData } = this.state;
        const target = e.target;  
        const value = target.value;
        const name = target.name;
        offerData[name] = value;
        this.setState({
            offerData: offerData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { offerData } = this.state;
        offerData[fieldName] = e.toLocaleDateString();
        this.setState({
            offerData: offerData
        })

    }
  
    render() {
        const { offerData, error } = this.state;


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
                                            <Link href="/cashback_offers" prefetch>
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
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Store    </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'store_id') ? ' is-danger' : '')} value={`${(offerData.store_id) ? offerData.store_id : null}`} name="store_id" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select Site</option>

                                            {
                                                this.state.storeData.length > 0 ?
                                                    this.state.storeData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.aid?dataRow.aid.name:''} - {dataRow.title}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'store_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Cashback Type   </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'cashback_type') ? ' is-danger' : '')} value={`${(offerData.cashback_type) ? offerData.cashback_type : null}`} name="cashback_type" onChange={this.handleInputChange}>
                                            <option value="">Select Type</option>
                                            <option value="percentage">Percentage</option>
                                            <option value="fixed">Fixed</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'cashback_type')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Network Commission </label>
                                    <input className={"input " + (_.get(error, 'network_commission') ? ' is-danger' : '')} type="text" name="network_commission" placeholder="Network commission" value={offerData.network_commission} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'network_commission')}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Cashback  </label>
                                    <input className={"input " + (_.get(error, 'cashback') ? ' is-danger' : '')} type="text" name="cashback" placeholder="cashback" value={offerData.cashback} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'cashback')}</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Network Offer URL </label>
                                    <input className={"input " + (_.get(error, 'newtwork_cashback_url') ? ' is-danger' : '')} type="text" name="newtwork_cashback_url" placeholder="URL" value={offerData.newtwork_cashback_url} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'newtwork_cashback_url')}</p>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Expiry Date</label>
                                    <DayPickerInput value={offerData.expiry_date} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'expiry_date')} />

                                    <p className="help is-danger">{_.get(error, 'expiry_date')}</p>

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description  </label>

                                    <textarea className={"textarea " + (_.get(error, 'description') ? ' is-danger' : '')} name="description" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={offerData.description} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'description')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Exclusive offers?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(offerData.exclusive_rate) ? offerData.exclusive_rate : 0}`} name="exclusive_rate" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'exclusive_rate')}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">VIP offers ?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(offerData.vip_offer) ? offerData.vip_offer : 0}`} name="vip_offer" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'vip_offer')}</p>
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




