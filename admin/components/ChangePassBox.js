import React, { Component } from 'react';
import '../styles/styles.scss';
import { apiUrl } from '../utils/Common';
import axios from 'axios';
import { withRouter } from 'next/router';
import Link from 'next/link'
import Router from 'next/router'
import _ from 'lodash';
import ReCAPTCHA from "react-google-recaptcha";
import toastr from 'toastr'
const qs = require('query-string');
export default withRouter(class ChangePassBox extends Component {

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
        axios.get(apiUrl + 'admin/auth/check-auth')
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
        toastr.clear();
        let fieldNeedToValidate = ['password', 'passwordConfirm', 'googleRecaptcha'];
        const { password, googleRecaptcha, token } = this.state;
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'admin/auth/reset-password', { password, token, googleRecaptcha })
                    .then((res) => {
                        if (res.data.success) {
                            let successMsg = res.data.msg;
                            toastr.success(successMsg, '');
                            Router.push(`/login`);
                        }
                    })
                    .catch(error => {
                        window.grecaptcha.reset();
                        this.setState({ disableBtn: true });
                        if (error.response.data.success === false) {
                            let errorMsg = error.response.data.msg;
                            toastr.error(errorMsg, 'Error!');
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
                <section className="hero is-bold is-fullheight h-img">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <div className="box center-align">
                                    <figure className="avatar cus-avat-login">
                                        <img src="/static/images/football.svg" width="120px" />
                                    </figure>
                                    <div className="has-text-grey-dark mg-b-30">
                                        <h3 className="title theme-color">Reset Password </h3>
                                    </div>
                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input className={"input is-medium " + (_.get(error, 'password') ? ' is-danger' : '')} type="password" placeholder="Password" name="password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </p>
                                        <p className="help is-danger">{_.get(error, 'password')}</p>
                                    </div>
                                    <div className="field">

                                        <p className="control has-icons-left">
                                            <input className={"input is-medium " + (_.get(error, 'passwordConfirm') ? ' is-danger' : '')} type="password" placeholder="Confirm password" name="passwordConfirm" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
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
                                    <button onClick={this.handleSubmit} disabled={!disableBtn} className="button is-block is-theme is-large is-fullwidth">Submit</button>
                                    <p className="has-text-centered mg-t-20">
                                        <Link href="/login" >
                                            <a className="heading theme-color is-capitalized is-light">Login?</a>
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





