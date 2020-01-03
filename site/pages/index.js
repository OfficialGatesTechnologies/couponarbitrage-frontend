
import React, { Component } from 'react';
import Head from 'next/head';
import HomeIndex from '../components/landing-page/Home-index';
import { site_name, apiUrl } from '../utils/Common';
import axios from 'axios';
import { withRouter } from 'next/router';
import Router from 'next/router';
import jsCookie from 'js-cookie';
export default withRouter(class Index extends Component {
    static async getInitialProps({ res }) {
        if (jsCookie.get('jwtToken')) {
            axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
            const resAuth = await axios.get(apiUrl + 'auth/check-auth');
            if (resAuth) {
                if (res) {
                    res.writeHead(302, {
                        Location: '/cashback-bonuses'
                    })
                    res.end()
                } else {
                    Router.push('/cashback-bonuses')
                }
            }
        }
        return {}
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(() => {
                Router.push(`/cashback-bonuses`);
            }).catch(() => { })
    }
    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Home</title>
                    <meta name='subject' content='www.couponarbitrage.com' />
                    <meta name="distribution" content="Global" />
                    <meta name="revisit-after" content="1 days" />
                    <meta name="creator" content="officialgates (www.officialgates.com)" />
                    <meta name="publisher" content="officialgates (www.officialgates.com)" />
                </Head>

                <HomeIndex />
            </div>
        )
    }
})

