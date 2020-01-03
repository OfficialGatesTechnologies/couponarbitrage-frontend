import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl, getCountries } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import MyAccountMidMenu from '../components/my-account/My-account-mid-menu';
import MyAccountTop from '../components/my-account/My-account-top';
import Link from 'next/link';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import jsCookie from 'js-cookie';
import _ from 'lodash';
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class MyPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
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


    render() {
        const { error, userData } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | MyPlan</title>


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

                    <div className="inner-wrapper">
                        <div className="container">
                            <MyAccountTop userData={this.state.userData} />
                            <MyAccountMidMenu />


                            <div className="fwid mg-t-40">
                                <div className="fwid new-title has-text-left">
                                    <h1><span className="tables-title">My Subscribed Plan</span></h1>
                                </div>
                                <div className="fwid bg-white">
                                    <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                        <div className="panel pan-border-color-cus">
                                            <p className="panel-heading pan-border-color-cus bg-head">
                                                Plan Information
        </p>
                                            <div className="panel-block pan-border-color-cus">
                                                <div className="max-1000">
                                                    <form className="is-fullwidth max-panel-bdy">

                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal is-paddingless">
                                                                <label className="label has-text-weight-light has-text-grey-light">Plan Information:</label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control">
                                                                        <strong>Weekly Subscription</strong>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal is-paddingless">
                                                                <label className="label has-text-weight-light has-text-grey-light">Plan Price:</label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control">
                                                                        <strong>£19.00 per 1 week(s)</strong>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal is-paddingless">
                                                                <label className="label has-text-weight-light has-text-grey-light">Plan Subscribed On:</label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control">
                                                                        <strong>05-05-2017</strong>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal is-paddingless">
                                                                <label className="label has-text-weight-light has-text-grey-light">Plan Description:</label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control">
                                                                        <strong>Weekly Subscription</strong>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal is-paddingless">
                                                                <label className="label has-text-weight-light has-text-grey-light">Plan Status:</label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control">
                                                                        <span className="tag is-danger">Expired</span>
                                                                        {/* <span className="tag is-success">Approved</span> */}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="field is-horizontal mg-t-40">
                                                            <div className="field is-block">
                                                                <Link href=""><a name="CancelPlan" type="submit" id="CancelPlan" className="btn purple-btn mg-t20 m-r-10" value="CancelPlan">Cancel Plan</a></Link>

                                                                <Link href=""><a name="ChangePlan" type="submit" id="ChangePlan" className="btn purple-btn mg-t20" value="ChangePlan">Change Plan</a></Link>
                                                            </div>
                                                        </div>


                                                    </form>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                    <Footer />
                </div></div>
        )
    }
});


