import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from '../components/my-account/my-account-top';
import Link from 'next/link';
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
                                                Plan Information</p>
                                            <div className="panel-block pan-border-color-cus">
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal is-paddingless">
                                                        <label className="label has-text-weight-light has-text-grey-light">No active subscription</label>
                                                    </div>
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


