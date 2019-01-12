import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl, hearAboutUs, getCountries } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class view_user_accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                firstName: '',
                username: "",
                email: "",
                password: "",
            },
        }
    }
    componentDidMount = () => {
        const accoutId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {

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

                this.setState({ userData: userData })
            }).catch((error) => {
                if (error) {

                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/user-accounts`);
                }
            })
    }

    render() {
        const { userData } = this.state;

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
                                            <Link href="/dashboard"  prefetch>
                                                <a href="#">Dashboard</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/user_accounts" as="/user-accounts" prefetch>
                                                <a href="#">Users</a>
                                            </Link>
                                        </li>
                                        <li className="is-active"><a href="#">View Admin Account</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Account Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Name </label>
                                    <p>{userData.name}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Last Name  </label>
                                    <p>{userData.last_name}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Username </label>
                                    <p>{userData.username}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">E-Mail </label>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Usertype </label>
                                    <p>{userData.usertype ? userData.usertype : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Phone Number </label>
                                    <p>{userData.accountPhone ? userData.accountPhone : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Where did you hear about us?  </label>
                                    <p><p> {hearAboutUs().map(aboutus => (
                                        aboutus.code == userData.accountReferrence ? aboutus.name : ''

                                    ))}</p></p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Country </label>
                                    <p><p>  {getCountries().map(country => (
                                        country.code == userData.accountCountry ? country.name : ''

                                    ))}</p></p>
                                </div>
                            </div>

                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Payment Details  </h3>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Skrill email address </label>
                                    <p>{userData.accountSkrillEmail ? userData.accountSkrillEmail : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Neteller email address </label>
                                    <p>{userData.accountNetellerEmail ? userData.accountNetellerEmail : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">PayPal email address  </label>
                                    <p>{userData.accountPaypalEmail ? userData.accountPaypalEmail : '--'}</p>
                                </div>
                            </div>

                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Payout by bank transfer - BACS   </h3>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Account Holder Name </label>
                                    <p>{userData.bankAccountName ? userData.bankAccountName : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Account Number </label>
                                    <p>{userData.bankAccountNumber ? userData.bankAccountNumber : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Sort code  </label>
                                    <p>{userData.bankAccountSortCode ? userData.bankAccountSortCode : '--'}</p>
                                </div>
                            </div>

                        </div>

                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Account Access Info   </h3>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Last Login Time </label>
                                    <p>{userData.accountLatestLoginTime ? userData.accountLatestLoginTime : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Login Count </label>
                                    <p>{userData.accountLoginCount ? userData.accountLoginCount : '--'}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Last Login User Agent   </label>
                                    <p>{userData.accountLatestLoginUA ? userData.accountLatestLoginUA : '--'}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Last Login Ip    </label>
                                    <p>{userData.accountLatestLoginIP ? userData.accountLatestLoginIP : '--'}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

})




