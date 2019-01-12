import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr'
export default withRouter(class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                firstName: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
            },
            errors: {
                firstName: null,
                username: null,
                email: null,
                password: null,
                cpassword: null
            },
            changePass: null
        }

    }
    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(res => {
                this.setState({
                    userData: {
                        _id: res.data._id,
                        firstName: res.data.firstName,
                        username: res.data.username,
                        email: res.data.email,
                    }
                })
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { userData } = this.state;
        const allFields = {
            firstName: {
                message: "Please enter the  name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'firstName', ""));
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
            }, email: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(userData, 'email', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
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
        const { userData, changePass } = this.state;
        let fieldNeedToValidate = [];
        if (changePass) {
            fieldNeedToValidate = ['firstName', 'username', 'email', 'password', 'cpassword'];
        } else {
            fieldNeedToValidate = ['firstName', 'username', 'email'];
        }
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
                axios.post(apiUrl + 'admin/account/update-myaccount', {
                    userData: userData,
                    changePass: changePass
                }).then((result) => {
                    let sucMsg = result.data.msg;
                    toastr.success(sucMsg, '');
                }).catch(error => {
                    if (error.response.status === 401) {
                        let errorMsg = error.response.data.msg;
                        toastr.error(errorMsg, 'Error!');
                    }
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
        const { userData, changePass, error } = this.state;
        const passContent = changePass ?
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
                                        <Link href="/admin_accounts" prefetch>
                                            <a href="#">Administrators</a>
                                            </Link>
                                        </li>
                                        
                                        <li className="is-active"><a href="#">My Account</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">My Account  </h2>
                        <hr></hr>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Name </label>
                                    <input className={"input " + (_.get(error, 'firstName') ? ' is-danger' : '')} name="firstName" type="text" placeholder="Name" value={userData.firstName} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'firstName')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Username </label>
                                    <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" placeholder="Username" value={userData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'username')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">E-Mail </label>
                                    <input className={"input " + (_.get(error, 'email') ? ' is-danger' : '')} name="email" type="text" placeholder="Email" value={userData.email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'email')}</p>
                                </div>
                            </div>

                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div class="field">



                                    <input onChange={this.handleCheckBoxChange} id="changepassword" type="checkbox" name="exampleCheckbox" />
                                    <label for="changepassword"> Change Password?</label>
                                </div>
                            </div>
                        </div>
                        {passContent}
                        <div className="columns">
                            <div className="column is-6">
                                <p class="buttons">

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




