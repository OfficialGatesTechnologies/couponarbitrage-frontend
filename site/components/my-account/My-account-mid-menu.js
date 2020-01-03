import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class MyAccountMidMenu extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                
                
                    <div className="fwid learn-boxs learn-list mg-t-40">
                    <div className="bg-white colors-box">
                        <div className="bread-crumbs-wrap">
                            <div className="fwid two-box bread-crumbs">
                                
                                <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="active " role="presentation">
                                            <Link href="/my-account"><a title="Overview">Overview</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/earnings"><a title="Earnings">Earnings</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/payout"><a title="Payout">Payout</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/payment-details"><a title="Payment Details" >Payment Details</a></Link>
                                            </li>
                                            <li className="" role="presentation">
                                            <Link href="/profile"><a title="My Profile">My Profile</a></Link></li>
                                            <li className="" role="presentation">
                                            <Link href="/affiliates"><a title="Refer-A-Friend">Refer-A-Friend</a></Link></li>
                                            <li className="" role="presentation">
                                            <Link href="/my-plan"><a title="My Plan">My Plan</a></Link></li>
                                            <li className="" role="presentation">
                                            <Link href="/activity"><a title="Activity">Activity</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
           </div> 
        )
    }
})





