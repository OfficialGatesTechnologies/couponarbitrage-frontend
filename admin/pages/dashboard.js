import React, { Component } from 'react';
import Head from 'next/head';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
export default withRouter(class Dashboard extends Component {

    state = {
        expanded: false
    }
    componentDidMount = () => {

    }
    render() {

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Admin Controll Panel</title>
                </Head>



                <div className="page-wrapper" id="page-wrapper">
                    <div className="columns">
                        <div className="column">
                            <div className="box is-shadowless has-background-white">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li className="is-active"> Dashboard</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="columns settings">

                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-primary"></i>
                                </div>
                                <div className="amount_coup">1250</div>
                                <div className="sub_title_coup has-text-primary is-size-7">Unconfirmed</div>
                                <span className="sub_title_in">Cashback & Bonuses Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-danger"></i>
                                </div>
                                <div className="amount_coup">240</div>
                                <div className="sub_title_coup has-text-danger is-size-7">Unapproved</div>
                                <span className="sub_title_in">Cashback & Bonuses Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-success"></i>
                                </div>
                                <div className="amount_coup">1210</div>
                                <div className="sub_title_coup has-text-success is-size-7">Finished</div>
                                <span className="sub_title_in">Cashback & Bonuses Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-info"></i>
                                </div>
                                <div className="amount_coup">1240</div>
                                <div className="sub_title_coup has-text-info is-size-7">Paid</div>
                                <span className="sub_title_in">Cashback & Bonuses Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-warning"></i>
                                </div>
                                <div className="amount_coup">120</div>
                                <div className="sub_title_coup has-text-warning is-size-7">Cancelled</div>
                                <span className="sub_title_in">Cashback & Bonuses Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card_coup theme-bg min-hight-au">
                                <div className="chart chart_coup">
                                    <i className="fas fa-users fn-30 has-text-light"></i>
                                </div>
                                <div className="amount_coup has-text-white">1240</div>
                                <div className="sub_title_coup has-text-white is-size-7">User Accounts List</div>
                           
                            </div>
                        </div>
                    </div>
                    <div className="columns settings">

                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-warning"></i>
                                </div>
                                <div className="amount_coup">120</div>
                                <div className="sub_title_coup has-text-warning is-size-7">Cancelled</div>
                                <span className="sub_title_in">Revenue Share cashback Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-primary"></i>
                                </div>
                                <div className="amount_coup">40</div>
                                <div className="sub_title_coup has-text-primary is-size-7">Unconfirmed</div>
                                <span className="sub_title_in">Revenue Share cashback Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-danger"></i>
                                </div>
                                <div className="amount_coup">124</div>
                                <div className="sub_title_coup has-text-danger is-size-7">Unapproved</div>
                                <span className="sub_title_in">Revenue Share cashback Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-success"></i>
                                </div>
                                <div className="amount_coup">110</div>
                                <div className="sub_title_coup has-text-success is-size-7">Finished</div>
                                <span className="sub_title_in">Revenue Share cashback Claims</span>
                            </div>
                        </div>

                        <div className="column">
                            <div className="card card_coup">
                                <div className="chart chart_coup">
                                    <i className="fas fa-futbol fn-30 has-text-info"></i>
                                </div>
                                <div className="amount_coup">40</div>
                                <div className="sub_title_coup has-text-info is-size-7">Cashback Credtis</div>
                                <span className="sub_title_in">Revenue Share cashback Claims</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card_coup theme-bg min-hight-au">
                                <div className="chart chart_coup">
                                    <i className="fas fa-chart-pie fn-30 has-text-light"></i>
                                </div>
                                <div className="amount_coup has-text-white">1240</div>
                                <div className="sub_title_coup is-size-7 has-text-light">Turnover Registration Request</div>
                            
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        )
    }

})




