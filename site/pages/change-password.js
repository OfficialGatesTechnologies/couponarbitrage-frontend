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
toast.configure();
export default withRouter(class changePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: '',
            googleRecaptcha: '',
            token: '',
            errors: {
                password: null,
                passwordConfirm: null,
                googleRecaptcha: null
            },
            disableBtn: false
        }

    }

    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                Router.push(`/dashboard`);
            })
            .catch((error) => { })
        this.setState({
            token: this.props.router.query.token
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
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { password, passwordConfirm, googleRecaptcha } = this.state;

        const allFields = {
            password: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.trim(password);
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, passwordConfirm: {
                message: "Confirm password does't match with password.",
                doValidate: () => {
                    const vpassword = _.trim(password);
                    const vcpassword = _.trim(passwordConfirm);
                    if (vpassword.length > 0 && vpassword === vcpassword) {
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
      
        let fieldNeedToValidate = ['password', 'passwordConfirm', 'googleRecaptcha'];
        const { password, googleRecaptcha, token } = this.state;
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'auth/reset-password', { password, token, googleRecaptcha })
                    .then((res) => {
                        if (res.data.success) {
                            let successMsg = res.data.msg;
                            toast.success(successMsg, {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId: 13
                            });
                            Router.push(`/signin`);
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
                    <title>{site_name} | Reset Password</title>

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
                                <h1>Reset Password</h1>
                            </div>
                            <div className="log-form-body full-width">
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">

                                        <input className={"input " + (_.get(error, 'password') ? ' is-danger' : '')} type="password" placeholder="Password" name="password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    </div>
                                    <p className="help is-danger">{_.get(error, 'password')}</p>
                                </div>
                                <div className="field">
                                <label className="label">Verify Password</label>
                                    <p className="control">
                                        <input className={"input " + (_.get(error, 'passwordConfirm') ? ' is-danger' : '')} type="password" placeholder="Confirm password" name="passwordConfirm" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                       
                                    </p>
                                    <p className="help is-danger">{_.get(error, 'passwordConfirm')}</p>
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

