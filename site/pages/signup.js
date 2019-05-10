import React, { Component } from 'react';
import Head from 'next/head';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import axios from 'axios';
import '../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie';
import { site_name, apiUrl, siteUrl } from '../utils/Common';
toast.configure();
export default withRouter(class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: '',
                last_name: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
                accountPhone: "",
                googleRecaptcha: "",
                termsCond: "",
            },
            errors: {
                name: null,
                last_name: null,
                username: null,
                email: null,
                password: null,
                cpassword: null,
            },
            disableBtn: false
        }
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
            last_name: {
                message: "Please enter the  last name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'last_name', ""));
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
                message: "Password does't match.",
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

            }, googleRecaptcha: {
                message: "Please verify the captcha.",
                doValidate: () => {
                    const value = _.get(userData, 'googleRecaptcha', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            termsCond: {
                message: "Please accept the terms and conditions.",
                doValidate: () => {
                    const value = _.get(userData, 'termsCond', '');
                    if (value) {
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
            this.setState({ disableBtn: true });
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                    this.setState({ disableBtn: false });
                }
            });
            callback(isValid);
        })
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
    recaptchaChange = (value) => {
        const { userData } = this.state;
        userData['googleRecaptcha'] = value;
        this.setState({ userData: userData })
        let fieldNeedToValidate = ['googleRecaptcha'];
        this.formValidation(fieldNeedToValidate);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['name', 'last_name', 'username', 'email', 'password', 'cpassword', 'accountPhone', 'googleRecaptcha', 'termsCond'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                const { userData } = this.state;
                axios.post(apiUrl + 'auth/register', {
                    userData: userData,
                }).then((result) => {
                    jsCookie.set('jwtToken', result.data.token);
                    setInterval(() => {
                        window.location = "/dashboard";
                    }, 3000) 
                }).catch(error => {
                    window.grecaptcha.reset();
                    userData['googleRecaptcha'] = '';
                    this.setState({ disableBtn: true, userData });
                    let errorMsg = error.response.data.msg;
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                });
            }
        });

    }
    handleCheckBoxChange = (e) => {
        const { userData } = this.state;
        var checked = e.target.checked;
        userData['termsCond'] = checked;
        this.setState({ userData: userData });
        let fieldNeedToValidate = ['termsCond'];
        this.formValidation(fieldNeedToValidate);
    }
    render() {
        const { userData, error, disableBtn } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Signup</title>
                    <meta name="description" content="Join Couponarbitrage.com today for free! Learn sports arbitrage while earn from our wide range of cashback deals." />
                    <link rel="canonical" href={`${siteUrl}signup`} />
                </Head>

                <HeaderIn />
                <div className="container">
                    <div className="inner-brd-crmp">
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>

                            <li><Link href="javascript:void(0);"><a>Signup</a></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="inner-wrapper full-width">
                        <div className="sign-up-form">
                            <div className="sign-up-top has-text-centered">
                                <h1>Sign up</h1>
                                <div className="join-via">
                                    <p>Join With <Link href="javascript:void(0);"><a><img src="/static/images/icons/jo-fb.png" /></a></Link></p>
                                </div>
                            </div>
                            <div className="sign-form-in">
                                <from>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="control">

                                                <input className="input frm-input" type="text" name="name" placeholder="First Name" value={userData.name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger">{_.get(error, 'name')}</p>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" type="text" placeholder="Last Name" name="last_name" value={userData.last_name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'last_name')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" type="text" placeholder="User Name" name="username" value={userData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'username')}</p>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" type="text" placeholder="Email Address" name="email" value={userData.email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'email')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" placeholder="Password" name="password" type="password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'password')}</p>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" placeholder="Verify Password" type="password" name="cpassword" placeholder="Confirm password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'cpassword')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="control">
                                                <input className="input frm-input" type="text" placeholder="Phone Number" name="accountPhone" value={userData.accountPhone} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                <p className="help is-danger" >{_.get(error, 'accountPhone')}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <ReCAPTCHA
                                                className={" " + (_.get(error, 'password') ? ' is-danger' : '')}
                                                sitekey="6Le1I4gUAAAAACJP3hdjuWUAX7teX-BdjrXN-GWZ"

                                                onChange={this.recaptchaChange}
                                            />
                                            <p className="help is-danger" >{_.get(error, 'googleRecaptcha')}</p>
                                        </div>


                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <div className="checkbox join-check-wrap">
                                                <label>
                                                    <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check" onChange={this.handleCheckBoxChange} />
                                                    <span className="cr"><i className="cr-icon fas fa-check"></i></span>
                                                    <span className="has-text-black jo-acpt">Accept</span>
                                                    <Link href="javascript:void(0);">
                                                    <a target="_blank" className="jo-trms">Terms and conditions</a></Link>
                                                </label>

                                            </div>
                                            <p className="help is-danger" >{_.get(error, 'termsCond')}</p>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="sign-bot column has-text-centered">
                                            <button disabled={!disableBtn} onClick={this.handleSubmit} className="btn is-btn-smt">Submit</button>
                                            <Link href="/signin"><a>Return to Login?</a></Link>
                                        </div>
                                    </div>
                                </from>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
})

