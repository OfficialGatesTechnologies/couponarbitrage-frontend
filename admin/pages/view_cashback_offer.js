import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class view_cashback_offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            offerData: {
                _id: '',
                store_id: "",
                cashback_type: '',
                description: "",
                expiry_date: '',
                exclusive_rate: "",
                vip_offer: '',
            },
          

            editForm: false,
        }


    }
    componentDidMount = () => {
        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => { })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        if (editId) {
            this.getRow(editId);
        }
      
    }



    getRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/offer-row?_id=' + editId)
            .then(res => {
                var offerData = res.data.results;

                this.setState({ offerData: offerData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_offers`);
                }
            })
    }

    
    
  
    render() {
        const { offerData } = this.state;


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
                                            <Link href="/dashboard" prefetch>
                                                <a href="#">Dashboard</a>
                                            </Link>
                                        </li>
                                        <li className="is-active"><a href="#">Cashback Offers</a></li>
                                        <li>
                                            <Link href="/cashback_offers" prefetch>
                                                <a href="#"> Cashback Offer List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">View Cashback Offer </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Cashback Offer    Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Store    </label>
                                    <p>{offerData.store_id}</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Cashback Type   </label>
                                    
                                    <p>{offerData.cashback_type}</p>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Network Commission </label>
                               
                                    <p>{offerData.network_commission}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Cashback  </label>
                                    <p>{offerData.cashback}</p>
                                 
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Network Offer URL </label>
                                    <p>{offerData.newtwork_cashback_url}</p>
                                
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Expiry Date</label>
                                    <p>{offerData.expiry_date}</p>
                                 

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description  </label>
                                    <p>{offerData.description}</p>
                                   
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Exclusive offers?</label>
                                   
                                    <p>{offerData.exclusive_rate?'Yes':'No'}</p>
                                      
                                     

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">VIP offers ?</label>
                                   
                                    <p>{offerData.vip_offer?'Yes':'No'}</p>

                                </div>
                            </div>

                        </div>
                      


                    </div>
                </div>

            </div>
        )
    }

})




