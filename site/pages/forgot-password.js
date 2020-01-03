
import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import axios from 'axios';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router'
import _ from 'lodash';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
export default withRouter(class forgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            googleRecaptcha: '',
            errors: {
                email: null,
                googleRecaptcha: null
            },
            disableBtn: false
        }
    }
    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(res => {
                Router.push(`/dashboard`);
            })
            .catch((error) => { })
    }
    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);

    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { email, googleRecaptcha } = this.state;

        const allFields = {
            email: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.trim(email);
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
            googleRecaptcha: {
                message: "Please verify the captcha.",
                doValidate: () => {
                    const value = _.trim(googleRecaptcha);
                    if (value && value.length > 0) {
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


    handleSubmit = (e) => {
        e.preventDefault();

        let fieldNeedToValidate = ['email', 'googleRecaptcha'];
        const { email, googleRecaptcha } = this.state;
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'auth/forgot-password', { email, googleRecaptcha })
                    .then((res) => {
                        if (res.data.success) {
                            let successMsg = res.data.msg;
                            toast.success(successMsg, {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId: 13
                            });
                            window.grecaptcha.reset();
                        }
                    })
                    .catch(error => {
                        window.grecaptcha.reset();
                        this.setState({ disableBtn: true });
                        if (error.response.data.success === false) {
                            let errorMsg = error.response.data.msg;
                            toast.error(errorMsg, {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId: 13
                            });
                        }
                    });
            }
        });

    }
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    recaptchaChange = (value) => {
        this.setState({ googleRecaptcha: value })
        let fieldNeedToValidate = ['googleRecaptcha'];
        this.formValidation(fieldNeedToValidate);

    }
    render() {
        const { error, disableBtn } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Forgot Password</title>

                </Head>
                <HeaderIn />
                <div className="container">
                    <div className="log-bg">
                        <img src="/static/images/backgrounds/log-bg.jpg" />
                        <div className="inner-ban-txt">
                            <ul>
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Forgot your password?</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="inner-wrapper full-width">
                        <div className=" log-form">
                            <div className="log-form-top">
                                <span className="box-white-line">&nbsp;</span>
                                <h1>Forgot your password?</h1>
                            </div>
                            <div className="log-form-body full-width">
                                <div className="field">
                                    <label className="label">Email address</label>
                                    <div className="control">

                                        <input className={"input " + (_.get(error, 'email') ? ' is-danger' : '')} type="text" placeholder="email" name="email" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    </div>
                                    <p className="help is-danger">{_.get(error, 'email')}</p>
                                </div>
                                <div className="field">
                                    <p className="control has-text-centered mg-t-20">
                                        <ReCAPTCHA
                                            className={" " + (_.get(error, 'password') ? ' is-danger' : '')}
                                            sitekey="6Le1I4gUAAAAACJP3hdjuWUAX7teX-BdjrXN-GWZ"
                                            onChange={this.recaptchaChange}
                                        />
                                    </p>
                                    <p className="help is-danger">{_.get(error, 'googleRecaptcha')}</p>
                                </div>

                                <div className="m-t-3">
                                    <div className="level sign-bot">
                                        <div className="level-left">
                                            <Link href="/signin"><a className="m-t-0">Return to Login?</a></Link>
                                        </div>
                                        <div className="level-right">
                                            <button onClick={this.handleSubmit} name="signinBut" type="submit" id="signinBut" className="purple-btn" value="login">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }
})

