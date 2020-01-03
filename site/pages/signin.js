import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import _ from 'lodash';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Link from 'next/link';
import { site_name, apiUrl, siteUrl } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie';
toast.configure();
export default withRouter(class Signin extends Component {
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
    static async getInitialProps({ res }) {
        if (jsCookie.get('jwtToken')) {
            //  jsCookie.remove('jwtToken');
            axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
            const resAuth = await axios.get(apiUrl + 'auth/check-auth');
            if (resAuth) {
                if (res) {
                    res.writeHead(302, {
                        Location: '/my-account'
                    })
                    res.end()
                } else {
                    Router.push('/my-account')
                }
            }
        }
        return {}
    }
    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                Router.push(`/my-account`);
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

        const { loginData } = this.state;
        let fieldNeedToValidate = ['username', 'password'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'auth/login', {
                    username: loginData.username,
                    password: loginData.password,
                }).then((result) => {
                    jsCookie.set('jwtToken', result.data.token);
                    setInterval(() => {
                        window.location = "/my-account";
                    }, 3000)
                }).catch(error => {
                    this.setState({ disableBtn: true, loginData });
                    let errorMsg = error.response.data.msg;
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                });
            }
        });
    }
    render() {
        const { error,disableBtn } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title> {site_name} | Login</title>
                    <meta name="description" content="Login to Couponarbitrage.com to earn cashback on a wide range of brands" />
                    <link rel="canonical" href={`${siteUrl}signin`} />
                </Head>

                <HeaderIn />
                <div className="container">
                    <div className="log-bg">
                        <img src="/static/images/backgrounds/log-bg.jpg" />
                        <div className="inner-ban-txt">
                            <ul>
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Login</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="inner-wrapper full-width">
                        <div className=" log-form">
                            <div className="log-form-top">
                                <span className="box-white-line">&nbsp;</span>
                                <h1>Login</h1>
                            </div>
                            <div className="log-form-body full-width">
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    </div>
                                    <p className="help is-danger">{_.get(error, 'username')}</p>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">

                                        <input className={"input " + (_.get(error, 'password') ? ' is-danger' : '')} type="password" name="password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    </div>
                                    <p className="help is-danger">{_.get(error, 'password')}</p>
                                </div>
                                <div className="login-soc">
                                    <p>Or login using</p>
                                    <a title="facebook"><img src="/static/images/icons/join-login-fb.png" alt="icon" /></a>
                                </div>
                                <div className="m-t-3">
                                    <div className="level">
                                        <div className="level-left">

                                        </div>
                                        <div className="level-right">
                                            <button disabled={!disableBtn}  name="signinBut" onClick={this.handleSubmit} type="submit" id="signinBut" className="btn purple-btn" value="login">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="log-form-bot full-width">
                                <Link href="/signup"><a>Sign up</a></Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link href="/forgot-password"><a>Forgot your password?</a></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
})

