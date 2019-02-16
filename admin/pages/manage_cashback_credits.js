import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import AsyncSelect from 'react-select/lib/Async';
 

export default withRouter(class manage_cashback_credits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            selectedOption:{value:'',label:''},
            creditData: {
                _id: '',
                revenueCreditUserId: "",
                revenueCreditType: '',
                revenueCreditAmount: "",
            },
            errors: {
                revenueCreditUserId: null,
                revenueCreditType: null,
                revenueCreditAmount: null,
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
            this.getCreditRow(editId);
        }     
    }


    getCreditRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-claims/credit-row?_id=' + editId)
            .then(res => {
                var creditData = res.data.results;
               
                var selectedOption = 
                
                
                {value:creditData.revenueCreditUserId._id,label: creditData.revenueCreditUserId.username+ ' ' + creditData.revenueCreditUserId.name + ' (' + creditData.revenueCreditUserId.email + ')'};

                 


                this.setState({ creditData: creditData, editForm: true,selectedOption:selectedOption })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_credits`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { creditData } = this.state;
        const allFields = {
            revenueCreditUserId: {
                message: "Please select an user.",
                doValidate: () => {
                    const value = _.trim(_.get(creditData, 'revenueCreditUserId', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            revenueCreditType: {
                message: "Please enter the type.",
                doValidate: () => {
                    const value = _.trim(_.get(creditData, 'revenueCreditType', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            revenueCreditAmount: {
                message: "Please enter the amount.",
                doValidate: () => {
                    const value = _.trim(_.get(creditData, 'revenueCreditAmount', ""));
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
        fieldNeedToValidate = ['revenueCreditUserId', 'revenueCreditType','revenueCreditAmount'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createCredits() : this.updateCredits();

            }
        });

    }
    createCredits = () => {
        const { creditData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-claims/create-credit', {
            creditData: creditData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_credits`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateCredits = () => {
        const { creditData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-claims/update-credit', {
            creditData: creditData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_credits`);
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
        const { creditData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        creditData[name] = value;
        this.setState({
            creditData: creditData
        })
    }

    handleChange = (option) => {
        const { creditData } = this.state;
        creditData['revenueCreditUserId'] = option.value; 
        this.setState({
            creditData: creditData,
            selectedOption:option
        })
    }

    searchUsers = (query, callback) => {
        if (!query) {
            return [];
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/user/search-users?query=' +encodeURIComponent(query))
            .then(function(response) {
                const items = response.data.results;
                let options = items.map(function(item) {
                    return {
                        value: item._id,
                        label: item.username + ' ' + item.name + ' (' + item.email + ')',
                    };
                });
                callback(options);
            });       
    }




    render() {
        const { creditData, error } = this.state;

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
                                        <li className="is-active"><a href="#">Revenue Share cashback</a></li>
                                        <li>
                                            <Link href="/cashback_credits" prefetch>
                                                <a href="#"> Cashback Credits   List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Credits </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Credits  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">User  </label>
                                    <div className="select is-fullwidth">
                                    {/* defaultOptions */}
                                        <AsyncSelect
                                            
                                            loadOptions={(query, callback) => this.searchUsers(query, callback)}
                                            placeholder="Type to search user..."
                                            onChange={this.handleChange}
                                            value = {this.state.selectedOption}
                                        />
                                        <p className="help is-danger">{_.get(error, 'revenueCreditUserId')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Type</label>
                                    <input className={"input " + (_.get(error, 'revenueCreditType') ? ' is-danger' : '')} type="text" name="revenueCreditType" placeholder="Type" value={creditData.revenueCreditType} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'revenueCreditType')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Amount  </label>
                                    <input className={"input " + (_.get(error, 'revenueCreditAmount') ? ' is-danger' : '')} name="revenueCreditAmount" placeholder="Amount" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={creditData.revenueCreditAmount} />
                                    <p className="help is-danger">{_.get(error, 'revenueCreditAmount')}</p>
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




