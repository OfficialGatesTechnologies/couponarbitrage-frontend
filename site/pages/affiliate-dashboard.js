import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official';
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}
 
export default withRouter(class AffiliatesDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                  type: 'column'
                },
                data: {
                    table: 'datatable'
                },
                title: {
                  text: 'Period Comparison'
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">Date : {point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Cashback Count',
                    data: []
            
                }, {
                    name: 'App Subscriptions',
                    data: []
            
                }]   
            }
        }
    }
    getAffliateComm = () =>{
        
        const { options } = this.state;
        let  option = {
          };
          
    }
    render() {
        const {  options} = this.state;
        return (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Affiliate Dashboard</title>
        </Head>
        <HeaderIn />
        <div className="container">
        <div className="columnns">
            <div className="column">
            <div className="dash-menu pd-t-b-15">
            <div className="cbk-at-list">
            <ul>
                  <li className="active"><Link href="/affiliate-dashboard"><a>Dashboard</a></Link>
                  </li>
                  <li><Link href="/affiliate-banner"><a>Banners</a></Link>
                  </li>
                  <li><Link href="/affiliate-earnings"><a>Earnings</a></Link>
                  </li>
                  <li><Link href="/affiliate-payout"><a>Payout</a></Link>
                  </li>
              </ul>
          </div>
          </div>
        </div>
        </div>
          </div>
          <div className="container">
          <div className="column">
          <h3 className="dash-title mg-b-20">Dashboard</h3>
          </div>
            <div className="columns">
              <div className="column is-7 ">
             
              <div className="tab-top mg-b-30">
                <table className="dashtop-data table is-striped" style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th colSpan="4">Quick Stats</th>

                            <th className="lst-mth">
                                <select >
                                    <option value="month">MTD</option>
                                    <option value="year">YTD</option>
                                    <option value="today">TODAY</option>
                                    <option value="yesterday">YESTERDAY</option>
                                    <option value="lastmonth">LAST MONTH</option>
                                </select></th>
                        </tr>
                    </thead>
           
                    <tbody id="getchartComm"><tr style={{background: 'transparent'}}>
                                          <th style={{border: '0px'}}>&nbsp;</th>
                                          <th style={{border: '0px'}}>&nbsp;</th>
                                          <th style={{border: '0px'}}>&nbsp;</th>
                                          <th style={{border: '0px'}}>&nbsp;</th>
                                          <th style={{border: '0px'}}>&nbsp;</th>
                                      </tr>
                                      <tr>
                                          <th>Product</th>
                                          <th>Clicks</th>
                                          <th>Registration</th>
                                          <th>Active Customers</th>
                                          <th>Commission</th>
                                      </tr>
                                      <tr>
                                          <th style={{fontWeight: 'normal'}}>Cashback Customers</th>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>£0</td>
                                      </tr>
                                      <tr>
                                          <th style={{fontWeight: 'normal'}}>App Subscriptions</th>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>£0</td>
                                      </tr>
                      </tbody>
                </table>
            </div>
            <div className="tab-top">
                <table className="dashtop-data table is-striped mg-b-20" style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th colSpan="4">Period Stats</th>

                            <th className="lst-mth" style={{width: '20%'}}>
                                <select onChange={this.getAffliateComm}>
                                    <option value="month">MTD</option>
                                    <option value="year">YTD</option>
                                    <option value="today">TODAY</option>
                                    <option value="yesterday">YESTERDAY</option>
                                    <option value="lastmonth">LAST MONTH</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    
                </table>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="tab-top">
            <table id="datatable" className="table is-striped is-bordered mg-b-20 text-center-table" style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cashback Count</th>
                            <th>App Subscriptions</th>
                        </tr>       
                    </thead>
                    <tbody>
                    <tr>
                        <td>01</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>1</td>
                        <td>0</td>
                    </tr>
                   
                    </tbody>      
                </table>
            </div>
              </div>
              <div className="column is-5">
              <div className="tab-top">
                <table className="dashtop-data table is-striped mg-b-20" style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th colSpan="4">Commission Breakdown</th>

                            <th className="lst-mth" style={{width: '20%'}}>
                                <select d="quiState" onchange="getAffliate(this.value)">
                                    <option value="month">MTD</option>
                                    <option value="year">YTD</option>
                                    <option value="today">TODAY</option>
                                    <option value="yesterday">YESTERDAY</option>
                                    <option value="lastmonth">LAST MONTH</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    
                </table>
            </div>
            <div className="tab-top">
                <table className="dashtop-data table is-striped mg-b-20" style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th>Referral URL's</th>
                            <th></th>
                           
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>Cashback Customers</td>
                            <td>http://www.couponarbitrage.com/cashbackref/gman</td>
                        </tr>
                        <tr>
                            <td>App Subscriptions</td>
                            <td>http://www.couponarbitrage.com/appsubscribe/gman</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
              </div>
            </div>
          </div>

         <Footer />
    </div>
         )
        }
    });
