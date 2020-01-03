import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from '../components/my-account/My-account-top';
import Link from 'next/link';
import _ from 'lodash';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                accountSkrillEmail: '',
                accountNetellerEmail: '',
                accountPaypalEmail: '',
                bankAccountName: '',
                bankAccountNumber: '',
                bankAccountSortCode: '',
            },
            errors: {
                accountSkrillEmail: null,
                accountNetellerEmail: null,
                accountPaypalEmail: null,
                bankAccountName: null,
                bankAccountNumber: null,
                bankAccountSortCode: null,
            },
            disableBtn: false
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                let userData = res.data;
                this.setState({
                    userData: userData,
                });
            }).catch(() => {
                Router.push(`/signin`);
            })

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
    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);

    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { userData } = this.state;
        const allFields = {
            accountSkrillEmail: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'accountSkrillEmail', ""));
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
            accountNetellerEmail: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(userData, 'accountNetellerEmail', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
            accountPaypalEmail: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(userData, 'accountPaypalEmail', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
            bankAccountName: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(userData, 'bankAccountName', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            bankAccountNumber: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(userData, 'bankAccountNumber', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            bankAccountSortCode: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(userData, 'bankAccountSortCode', '');
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

    handleSubmit = (type, e) => {
        e.preventDefault();

        const { userData } = this.state;
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.post(apiUrl + 'account/update-payment-details', {
            userData: userData,
            type: type
        }).then((result) => {
            let successMsg = result.data.msg;
            toast.success(successMsg, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 13
            });
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toast.error(errorMsg, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 13
            });
        });

    }

    render() {
        const { error, userData } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Payment Details</title>
                </Head>
                <HeaderIn />
                <div className="container">
                    <div className="inner-brd-crmp">
                        <ul>
                            <li>
                                <Link href="/"><a>Home</a></Link></li>
                            <li>
                                <Link href="javascript:void(0);"><a>My Account</a></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="inner-wrapper">
                    <div className="container">
                        <MyAccountTop userData={this.state.userData} />
                        <MyAccountMidMenu />
                        <div className="fwid mg-t-40">
                            <div className="fwid new-title has-text-left">
                                <h1><span className="tables-title">Payment Details</span></h1>
                            </div>
                            <div className="fwid bg-white">
                                <div className="fwid tables-topsec">
                                    <div className="sm-content">
                                        <p>Update your payout details below</p>
                                        <p>IMPORTANT: please be careful when entering your payout details below as mistakes may mean your cash will not credit your account</p>
                                    </div>
                                </div>
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by Skrill - (Free)
                                        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <span className="is-fullwidth max-panel-bdy">

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Skrill email address</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className={"input " + (_.get(error, 'accountSkrillEmail') ? ' is-danger' : '')} value={userData.accountSkrillEmail} name="accountSkrillEmail" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'accountSkrillEmail')}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" onClick={this.handleSubmit.bind(this, 1)} className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: NETELLER - (Free)</p>
                                        <div className="panel-block pan-border-color-cus">
                                            <span className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">NETELLER email address</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className={"input " + (_.get(error, 'accountNetellerEmail') ? ' is-danger' : '')} value={userData.accountNetellerEmail} name="accountNetellerEmail" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'accountNetellerEmail')}</p>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" onClick={this.handleSubmit.bind(this, 2)} id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </span>
                                        </div>
                                    </div>

                                </div>
                                {/* Optional: Payout by PayPal (Free)* */}
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by PayPal (Free)*
        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <span className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />
                                                <div className="pag-cont has-text-grey">
                                                    <p>*PayPal may charge a fee for certain PayPal accounts, such as Business and Premier accounts.</p><br />
                                                </div>

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">PayPal email address
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className={"input " + (_.get(error, 'accountPaypalEmail') ? ' is-danger' : '')} value={userData.accountPaypalEmail} name="accountPaypalEmail" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'accountPaypalEmail')}</p>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" onClick={this.handleSubmit.bind(this, 3)} id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </span>
                                        </div>
                                    </div>

                                </div>
                                {/* Optional: Payout by bank transfer - BACS (Free) */}
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by bank transfer - BACS (Free)
        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <span className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />


                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Account Holder Name
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                            <input className={"input " + (_.get(error, 'bankAccountName') ? ' is-danger' : '')} value={userData.bankAccountName} name="bankAccountName" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'bankAccountName')}</p>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Sort code
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control ">
                                                            <input className={"input " + (_.get(error, 'bankAccountSortCode') ? ' is-danger' : '')} value={userData.bankAccountSortCode} name="bankAccountSortCode" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'bankAccountSortCode')}</p>
                                                            </p>
                                                            
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Account Number
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                            <input className={"input " + (_.get(error, 'bankAccountNumber') ? ' is-danger' : '')} value={userData.bankAccountNumber} name="bankAccountNumber" onChange={this.handleInputChange}  type="text" />
                                                                <p className="help is-danger">{_.get(error, 'bankAccountNumber')}</p>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" onClick={this.handleSubmit.bind(this, 4)} id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>
                                                <div className="pag-cont is-inline-block is-fullwidth has-text-grey">
                                                    <p>Please note that our payout system supports payouts to bank accounts with six-digit sort codes and eight-digit account numbers only. We cannot pay in to bank accounts with longer account numbers or those requiring a roll number or other additional information to identify them.</p>
                                                </div>

                                            </span>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <Footer />
            </div>
        )
    }
});


