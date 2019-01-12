import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl, hearAboutUs,getCountries } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
 
export default withRouter(class manage_user_accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                name: '',
                last_name: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
                accountPhone: "",
                accountCountry: "",
                skrillEmail: "",
                netellerEmail: "",
                paypalEmail: "",
                accountName: "",
                sortCode: "",
                accountNo: "",
            },
            errors: {
                name: null,
                last_name: null,
                username: null,
                email: null,
                password: null,
                cpassword: null,
                skrillEmail: null,
                netellerEmail: null,
                paypalEmail: null,
            },
            changePass: null,
            editForm: false,
        }


    }
    componentDidMount = () => {
        const accoutId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(res => {
                this.setState({
                    // userData: {
                    //     _id: res.data._id,
                    //     name: res.data.name,
                    //     username: res.data.username,
                    //     email: res.data.email,
                    // }
                })
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
        
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/user/user-row?_id=' + accountid)
            .then(res => {
                var userData = res.data.results;
                
                this.setState({ userData: userData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/user-accounts`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { userData } = this.state;
        const allFields = {
            name: {
                message: "Please enter the  name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'name', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            username: {
                message: "Please enter the user name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'username', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            password: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(userData, 'password', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, cpassword: {
                message: "Confirm password does't match with password.",
                doValidate: () => {
                    const vpassword = _.trim(_.get(userData, 'password', ""));
                    const vcpassword = _.trim(_.get(userData, 'cpassword', ""));
                    if (vpassword.length > 0 && vpassword === vcpassword) {
                        return true;
                    }
                    return false;
                }
            }
            , email: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(userData, 'email', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            }, accountPhone: {
                message: "Please enter the phone number..",
                doValidate: () => {
                    const accountPhone = _.trim(_.get(userData, 'accountPhone', ""));

                    if (accountPhone.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, 


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
        const { changePass } = this.state;
        let fieldNeedToValidate = [];
        if (changePass || this.state.editForm === false) {
            fieldNeedToValidate = ['name', 'username', 'email',  'password', 'cpassword', 'accountPhone'];
        } else {
            fieldNeedToValidate = ['name', 'username', 'email',  'accountPhone'];
        }
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createUseraccount() : this.updateUserAccount();

            }
        });

    }
    createUseraccount = (e) => {
        const { userData, changePass } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/user/create-user', {
            userData: userData,
            changePass: changePass
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/user-accounts`);
        }).catch(error => {

            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');

        });
    }
    updateUserAccount = (e) => {
        const { userData, changePass } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/user/update-useraccount', {
            userData: userData,
            changePass: changePass,
            updateUser: 1
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
             Router.push(`/user-accounts`);
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
        const { userData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        userData[name] = value;
        this.setState({
            userData: userData
        })
    }
    handleCheckBoxChange = (e) => {
        var checked = e.target.checked;
        let errors = this.state.errors;
        this.setState({ changePass: checked });
        if (!checked) {
            errors['password'] = null;
            errors['cpassword'] = null;
        }
    }
    
    

    render() {
        const { userData, changePass, error, editForm } = this.state;
        const passContent = changePass || editForm === false ?
            <div className="columns">
                <div className="column is-6">
                    <div className="control ">
                        <label className="label has-text-grey">Password</label>
                        <input className={"input " + (_.get(error, 'password') ? ' is-danger' : '')} name="password" type="password" placeholder="Password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                        <p className="help is-danger">{_.get(error, 'password')}</p>
                    </div></div>
                <div className="column is-6">
                    <div className="control ">
                        <label className="label has-text-grey">Confirm password </label>
                        <input className={"input " + (_.get(error, 'cpassword') ? ' is-danger' : '')} type="password" name="cpassword" placeholder="Confirm password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                        <p className="help is-danger">{_.get(error, 'cpassword')}</p>
                    </div>
                </div></div>
            : null;
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
                                        <Link href="/user_accounts" as="/user-accounts" prefetch>
                                                <a href="#">Users</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} User Account</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Account Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">First Name </label>
                                    <input className={"input " + (_.get(error, 'name') ? ' is-danger' : '')} name="name" type="text" placeholder="Name" value={userData.name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'name')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Last Name</label>
                                    <input className={"input " + (_.get(error, 'last_name') ? ' is-danger' : '')} type="text" name="last_name" placeholder="last name" value={userData.last_name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'last_name')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Username </label>
                                    <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" placeholder="Username" value={userData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'username')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">E-Mail </label>
                                    <input className={"input " + (_.get(error, 'email') ? ' is-danger' : '')} name="email" type="text" placeholder="E-Mail" value={userData.email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'email')}</p>
                                </div>
                            </div>
                        </div>
                        

                        {
                            this.state.editForm ? <div className="columns">
                                <div className="column is-6">
                                    <div className="field">
                                        <input onChange={this.handleCheckBoxChange} id="changepassword" type="checkbox" name="accessPrivilege" />
                                        <label htmlFor="changepassword"> Change Password?</label>
                                    </div>
                                </div>
                            </div> : ''
                        }

                        {passContent}

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Phone Number </label>
                                    <input className={"input " + (_.get(error, 'accountPhone') ? ' is-danger' : '')} name="accountPhone" type="text" placeholder="Phone Number" value={userData.accountPhone} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'accountPhone')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Country </label>
                                    <div className="select is-fullwidth">
                                        <select name="accountCountry" onChange={this.handleInputChange}>
                                            <option value="">Select Country</option>
                                            {/* userData.email this.state.editForm */}
                                            {getCountries().map(country => (

                                                
                                
                                 <option selected={`${(this.state.editForm && userData.accountCountry ==country.code )}`} value={country.code}>{country.name}</option>
                              ))}
                                            <option value="Administrator">Administrator</option>
                                            <option value="SubAdmin">Sub Admin</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'accountCountry')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Where did you hear about us?  </label>
                                    <div className="select is-fullwidth">
                                        <select name="accountReferrence" onChange={this.handleInputChange}>
                                            <option value="">Where did you hear about us?</option>
                                            {hearAboutUs().map(aboutus => (
                                 <option selected={`${(this.state.editForm && userData.accountReferrence ==aboutus.code )}`} value={aboutus.code}>{aboutus.name}</option>
                              ))}
                                        
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'accountReferrence')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
 
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Payment Details  </h3>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Skrill email address </label>
                                    <input className={"input " + (_.get(error, 'accountSkrillEmail') ? ' is-danger' : '')} name="accountSkrillEmail" type="text" placeholder="Email address" value={userData.accountSkrillEmail} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'accountSkrillEmail')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Netller email address</label>
                                    <input className={"input " + (_.get(error, 'accountNetellerEmail') ? ' is-danger' : '')} type="text" name="accountNetellerEmail" placeholder="Email address" value={userData.accountNetellerEmail} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'accountNetellerEmail')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">PayPal email address </label>
                                    <input className={"input " + (_.get(error, 'accountPaypalEmail') ? ' is-danger' : '')} name="accountPaypalEmail" type="text" placeholder="Email address" value={userData.accountPaypalEmail} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'accountPaypalEmail')}</p>
                                </div>
                            </div>
                            
                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Payout by bank transfer - BACS  </h3>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Account Holder Name </label>
                                    <input className={"input " + (_.get(error, 'bankAccountName') ? ' is-danger' : '')} name="bankAccountName" type="text" placeholder="Name" value={userData.bankAccountName} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bankAccountName')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Account Number</label>
                                    <input className={"input " + (_.get(error, 'bankAccountNumber') ? ' is-danger' : '')} type="text" name="bankAccountNumber" placeholder="Number" value={userData.bankAccountNumber} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bankAccountNumber')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Sort code </label>
                                    <input className={"input " + (_.get(error, 'bankAccountSortCode') ? ' is-danger' : '')} name="bankAccountSortCode" type="text" placeholder="Sort code" value={userData.bankAccountSortCode} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bankAccountSortCode')}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Sharbs Software </label>
                                    <div className="select is-fullwidth">
                                        <select name="paymentStatus" onChange={this.handleInputChange}>
                                            <option value="">Select Status</option>
                                            <option selected={`${(this.state.editForm && userData.paymentStatus ==1 )}`} value="1">Active</option>
                                            <option selected={`${(this.state.editForm && userData.paymentStatus ==0 )}`} value="0">In-Active</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'paymentStatus')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">VIP User </label>
                                    <div className="select is-fullwidth">
                                        <select name="uservip" onChange={this.handleInputChange}>
                                            <option value="">Select Status</option>
                                            <option selected={`${(this.state.editForm && userData.uservip ==1 )}`} value="1">Active</option>
                                            <option selected={`${(this.state.editForm && userData.uservip ==0 )}`} value="0">In-Active</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'uservip')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Cut Odds permission ? </label>
                                    <div className="select is-fullwidth">
                                        <select name="cutodds_auth" onChange={this.handleInputChange}>
                                            <option value="">Select Status</option>
                                            <option selected={`${(this.state.editForm && userData.cutodds_auth ==1 )}`} value="1">Active</option>
                                            <option selected={`${(this.state.editForm && userData.cutodds_auth ==0 )}`} value="0">In-Active</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'cutodds_auth')}</p>
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




