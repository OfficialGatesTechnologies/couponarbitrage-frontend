import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import Image from 'react-image-resizer';
import YouTube from 'react-youtube';
 

export default withRouter(class view_cashback_stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            siteData: [],
            affData: [],
            bannerData: [],
            showUploadtype: '',
            storeData: {
                _id: '',
                aid: "",
                cat_id: '',
                network_id: "",
                title: "",
                uploadType: '',
                imageFile: "",
                details: "",
                details_default: "",
                banner: '',
                internal_banner: "",
                link: "",
                value: '',
                comm: "",
                valid_to: "",
                vaild_from: '',
                tweet: "",
                send_mail: "",
                vip_store: '',
                top_list: "",
                home_list: "",
                merchant_tc: '',
                merchant_tc_default: "",
                youtube_video: "",
                satisfied_customers: '',
                avg_payment_speed: "",
                auto_tracking_success: "",
                manual_chase_possible: '',
                manual_chase_required: "",
                manual_chase_success_rate: "",
                payment_performance: '',
                meta_title: "",
                meta_keywords: "",
                meta_description: '',
            },
            errors: {
                aid: null,
                cat_id: null,
                network_id: null,
                title: null,
                uploadType: null,
                imageFile: null,
                details: null,
                banner: null,
                internal_banner: null,
                link: null,
                value: null,
                comm: null,
                valid_to: null,
                vaild_from: null,
                internal_banner: null,

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
        axios.get(apiUrl + 'admin/cashback-offer/store-row?_id=' + editId)
            .then(res => {
                var storeData = res.data.results;
                this.setState({ storeData: storeData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_stores`);
                }
            })
    }


    render() {
        const { storeData, error } = this.state;

        const opts = {
            height: '200',
            width: '500',

        };
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
                                            <Link href="/cashback_stores" prefetch>
                                                <a href="#"> Cashback Store List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">View Cashback Store </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className="box is-shadowless has-background-white" >
                    
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Store   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Site   </label>
                                    <p>{storeData.aid}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Category   </label>

                                    <p>{storeData.cat_id}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Affiliate Network   </label>
                                    <p>{storeData.network_id}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                   <label className="label has-text-grey">Title</label>
                                    <p>{storeData.title}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description </label>
                                    <p>{storeData.details}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Upload Type  </label>
                                    <p>{storeData.uploadType}</p>
                                </div>
                            </div>
                            {
                                storeData.uploadType == 'internal_banner' ? <div className="column is-4">
                                    <div className="control">
                                      <label className="label has-text-grey"> Internal Banner </label>
                                        <Image
                                            src={`${apiUrl}resources/cashbackbanners/${storeData.internal_banner}`}
                                            width={100}
                                            height={70}

                                        />

                                    </div>
                                </div> : null
                            }



                            {
                                storeData.uploadType == 'imageFile' ?
                                    <div className="column is-3">
                                        <div className="control">
                                            <label className="label has-text-grey">Image</label>
                                            {
                                                this.state.editForm && storeData.imageFile ?
                                                    <Image
                                                        src={`${apiUrl}resources/cashbackbanners/${storeData.imageFile}`}
                                                        width={100}
                                                        height={70}

                                                    /> : ''
                                            }









                                        </div>
                                    </div> : null
                            }




                        </div>
                        {
                            storeData.uploadType == 'banner' ? <div className="columns">
                                <div className="column is-12">
                                    <div className="control">
                                        <label className="label has-text-grey">Banner  </label>
                                        <p>{storeData.banner}</p>
                                    </div>
                                </div>

                            </div> : null
                        }


                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Link </label>
                                    <p>{storeData.link}</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Value </label>
                                    <p>{storeData.value}</p>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Commission</label>
                                    <p>{storeData.comm}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Tweet </label>
                                   <p>{storeData.tweet}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Merchant Terms & Conditions </label>
                                    <p>{storeData.merchant_tc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Vaild From</label>
                                    <p>{storeData.vaild_from}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Vaild To</label>
                                    <p>{storeData.valid_to}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Youtube Video</label>
                                        <YouTube videoId={storeData.youtube_video_id} opts={opts} />                        
                                </div>
                            </div>
                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Tracking Statistics (%)  </h3>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                   <label className="label has-text-grey">Satisfied Customers</label>
                                    <p>{storeData.satisfied_customers}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Avg Payment Speed</label>
                                    <p>{storeData.avg_payment_speed}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Auto-Tracking Success</label>
                                    <p>{storeData.auto_tracking_success}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase required</label>
                                    <p>{storeData.manual_chase_possible}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase Success Rate</label>
                                    <p>{storeData.manual_chase_success_rate}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase Possible ?</label>
                                    <p>{storeData.manual_chase_required ? 'Active' : 'In-Active'}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Performance</label>
                                    <p>{storeData.payment_performance}</p>
                                </div>
                           </div>
                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Meta Info </h3>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Title</label>
                                    <p>{storeData.meta_title}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Keywords</label>
                                    <p>{storeData.meta_keywords}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Description </label>

                                    <p>{storeData.meta_description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Send Mail?</label>

                                    <p>{storeData.send_mail ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">VIP ?</label>

                                    <p>{storeData.vip_store ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Top 10 List ?</label>
                                    <p>{storeData.top_list ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Home Page ? </label>
                                    <p>{storeData.home_list ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

})




