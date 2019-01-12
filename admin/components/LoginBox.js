import React, { Component } from 'react';
import axios from 'axios';
import '../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../utils/Common';
import _ from 'lodash';
import Router from 'next/router'
import ReCAPTCHA from "react-google-recaptcha";
import toastr from 'toastr'
export default withRouter(class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            signedIn: false,
            loginData: {
                username: '',
                password: '',
                googleRecaptcha: '',

            },
            errors: {
                username: null,
                password: null,
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
            }).catch((error) => { })
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
        const { loginData } = this.state;
        const allFields = {
            username: {
                message: "Please enter the user name.",
                doValidate: () => {
                    const value = _.trim(_.get(loginData, 'username', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            password: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(loginData, 'password', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            googleRecaptcha: {
                message: "Please verify the captcha.",
                doValidate: () => {
                    const value = _.get(loginData, 'googleRecaptcha', '');
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
    handleInputChange = (e) => {
        const { loginData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        loginData[name] = value;
        this.setState({
            loginData: loginData
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        toastr.clear();
        const { loginData } = this.state;
        let fieldNeedToValidate = ['username', 'password', 'googleRecaptcha'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'admin/auth/login', {
                    username: loginData.username,
                    password: loginData.password,
                    googleRecaptcha: loginData.googleRecaptcha,
                }).then((result) => {
                    localStorage.setItem('jwtAdminToken', result.data.token);
                    setInterval(() => {
                        window.location = "/dashboard";
                    }, 3000) 
                     
                }).catch(error => {
                    window.grecaptcha.reset();
                    loginData['googleRecaptcha'] = '';
                    this.setState({ disableBtn: true, loginData });
                    if (error.response.status === 401) {
                        let errorMsg = error.response.data.msg;
                        toastr.error(errorMsg, 'Error!');
                    }
                });
            }
        });
    }
    
    recaptchaChange = (value) => {
        const { loginData } = this.state;
        loginData['googleRecaptcha'] = value;
        this.setState({ loginData: loginData })
        let fieldNeedToValidate = ['googleRecaptcha'];
        this.formValidation(fieldNeedToValidate);

    }
    render() {
        const { error, disableBtn } = this.state;
        return (
            <div>
                <section className="hero is-bold is-fullheight h-img">
                    <div className="hero-body">
                        <div className="container has-text-centered">

                            <div className="column is-4 is-offset-4">

                                <div className="box center-align">
                                    <figure className="avatar cus-avat-login">
                                        <img src="/static/images/football.svg" width="120px" />
                                    </figure>
                                    <div className="has-text-grey-dark mg-b-30">
                                        <h3 className="title theme-color">Login</h3>
                                    </div>

                                    <div className="field">
                                        <p className="control has-icons-left has-icons-right">
                                            <input className={"input is-medium " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" placeholder="username" name="username" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                            </span>
                                        </p>
                                        <p className="help is-danger">{_.get(error, 'username')}</p>
                                    </div>

                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input className={"input is-medium " + (_.get(error, 'password') ? ' is-danger' : '')} type="password" placeholder="Password" name="password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </p>
                                        <p className="help is-danger">{_.get(error, 'password')}</p>
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
                                    <button onClick={this.handleSubmit} disabled={!disableBtn} className="button is-block is-theme is-large is-fullwidth">Login</button>
                                    <p className="has-text-centered mg-t-20">
                                        <Link href="/forgotPassword" as="forgot-password">
                                            <a className="heading theme-color is-capitalized is-light">Forgot Password?</a>
                                        </Link>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
})





