import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
import { apiUrl } from '../utils/Common';
import jsCookie from 'js-cookie';
import CustomLoader from '../components/custome-loader';
export default withRouter(class Reminder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offerRow: [],
            offerId: '',
            jwtToken: '',
            loading: false,
        }

    }
    componentDidMount = () => {
        this.setState({ jwtToken: jsCookie.get('jwtToken') });
        const offerId = this.props.router.query.offerId;
        if (offerId) {
            this.setState({ offerId: offerId });
            setTimeout(() => { this.getStoreRow(); }, 300);
        } else {
            Router.push(`/`);
        }
    }
    getStoreRow = () => {
        let listUrl = apiUrl + 'offers/offer-row?_id=' + this.state.offerId;
        axios.get(listUrl).then(res => {
            var offerRow = res.data.results;
            this.setState({ offerRow: offerRow });
        }).catch(() => {
            Router.push(`/`);
        })
    }
    gotoAffilates = () => {
        this.setState({ loading: true });
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'offers/track-cashback?_id=' + this.state.offerId)
            .then(res => {
                setTimeout(() => { window.location = res.data.link; }, 3000);
            }).catch((error) => {
                Router.push(`/signin`);
            })
    }
    render() {
        const { offerRow, jwtToken, loading } = this.state;

        console.log('jwtToken', (jwtToken ? jwtToken : 'No'))
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Cashback On Heart Bingo Cashback</title>
                </Head>
                <HeaderIn />
                <div className="container">
                    <div className="inner-wrapper full-width">

                        <div className="ramainter-sect-box bg-white">
                            {offerRow.length === 0 ? 
                             <div className="columns is-centered">
                             <div class="column is-half">
                            <div className="text-center remainter">
                                <img src="/static/images/logo.png" alt="i" />
                               <p></p>,
                                    <CustomLoader type="reminder" />
                                </div> </div></div> : <div className="text-center remainter">
                                    <img src="/static/images/logo.png" alt="i" />
                                    <h2>We are now <span>tracking</span> your <span>cashback</span> for <br />
                                        {offerRow.store_id && offerRow.store_id.aid ? offerRow.store_id.aid.name : ''} -  {offerRow.store_id ? offerRow.store_id.title : ''}</h2>
                                    <h4>Please review the cashback offer information below before proceeding</h4>
                                    <h3>Reminder</h3>
                                    <p>You much ensure the following</p>
                                    <div className="remainter-btn">
                                        <a className="btn-block outline">Account must be ID verified if requested</a>
                                        {
                                            loading ? <a className="btn-block fill"> Please wait your are redirecting... </a> :
                                                jwtToken ?
                                                    <a onClick={this.gotoAffilates} className="btn-block fill">CONTINUE TO {offerRow.store_id && offerRow.store_id.aid ? offerRow.store_id.aid.name : ''} -  {offerRow.store_id ? offerRow.store_id.title : ''} </a>
                                                    : <Link href="/signin">
                                                        <a className="btn-block fill">CONTINUE TO {offerRow.store_id && offerRow.store_id.aid ? offerRow.store_id.aid.name : ''} -  {offerRow.store_id ? offerRow.store_id.title : ''} </a>
                                                    </Link>
                                        }



                                    </div>
                                </div>}



                        </div>


                    </div>
                </div>
                <Footer />
            </div>
        )
    }
})


