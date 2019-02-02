import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class view_cashback_voucher extends Component {

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
        axios.get(apiUrl + 'admin/cashback-offer/voucher-row?_id=' + editId)
            .then(res => {
                var offerData = res.data.results;

                this.setState({ offerData: offerData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_vouchers`);
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
                                            <Link href="/cashback_vouchers" prefetch>
                                                <a href="#">Cashback Voucher Code  List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">View Voucher Code  </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Voucher Code     Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Store    </label>
                                    <p>{offerData.store_id}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Voucher Mode   </label>
                                    
                                    <p>{offerData.voucher_mode}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Voucher Type </label>
                               
                                    <p>{offerData.voucher_type}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Voucher Code </label>
                               
                                    <p>{offerData.vouchers_code}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Title  </label>
                                    <p>{offerData.voucher_title}</p>
                                 
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Link </label>
                                    <p>{offerData.voucher_link}</p>
                                
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Issue Date</label>
                                    <p>{offerData.issue_date}</p>
                                 

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Expiry Date</label>
                                    <p>{offerData.expiry_date}</p>
                                 

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Summary  </label>
                                    <p>{offerData.voucher_summary}</p>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description  </label>
                                    <p>{offerData.voucher_description}</p>
                                   
                                </div>
                            </div>
                        </div>
 

                    </div>
                </div>

            </div>
        )
    }

})




