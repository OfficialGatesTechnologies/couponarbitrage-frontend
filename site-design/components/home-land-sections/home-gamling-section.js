import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class HomeGamlingsection extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="gamb-cashbk">
                <div className="gamb-wrap">
                <div className="gamb-lt">
                                <div className="gam-image-desk">
                                <Link href="">
                                <a ><img src="/static/images/gamb-lap.png" alt="gambling-image" /></a>
                                </Link>
                                    
                                </div>
                                <div className="gamb-image-tap">
                                <Link href="">
                                <a ><img src="/static/images/gamb-lap-02.png" alt="gambling-image" /></a>
                                </Link>
                                    
                                </div>
                </div>
                <div className="container">
                
                        <div className="columns">
                            
                            {/* <div className="column is-6 gamb-rt is-pulled-right">
                           
                                <a href="/couponarbitrage/site/free-arbs"><img src="/static/images/sharbing-mob.png" alt="sharbing-image" /></a>
                           
                            </div> */}
                            <div className="column is-pulled-left">
                            <div className="gamb-rt">
                            <Link href="">
                            <a ><h2>GAMBLING CASHBACK</h2></a>
                            </Link>
                            
                            <span className="gam-line">&nbsp;</span>
                            <h3>Gambling Cashback section gives you the opportunity
                                    to earn cashback by referring your betting accounts
                                    through our partner links:</h3>
                                    <ul>
                                    <li><span>Cashback for Bookmakers, Casino, Bingo and Poker</span></li>
                                    <li><span>Earn Fixed Rate Cashback deals or get Cashback On Your Losses with our variety
                                            of cashback deals. Choose which offers suit you best</span></li>
                                    <li><span>Exclusive bonus offers only available at Couponarbitrage.com</span></li>
                                    <li><span>Cashback Payouts made within days of your registration to your preferred payment method</span></li>
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





