import React, { Component } from 'react';
import '../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class LearnSportsArbitrage_Box extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="fwid learn-boxs mg-t-40 columns is-multiline is-variable is-1">
                        <div className="column is-6 pd-t-b-4 is-relative">
                            <div className="bg-white colors-box">
                                <div className="fwid two-box">
                                    <h4><i className="icon-learnbox">&nbsp;</i> What Is Sports Arbitrage?</h4>
                                    <p>Sports Arbitrage Trading or arbing is the process of placing a number of sports bets, with different bookmakers, in order to lock in a profit regardless of which team wins…</p>
                                    <a title="More" className="icon-more">&nbsp;</a>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6 pd-t-b-4 is-relative">
                            <div className="bg-white colors-box">
                                <div className="fwid two-box">
                                    <h4><i className="icon-learnbox">&nbsp;</i> What Do I Need?</h4>
                                    <p>Success in sports arbitrage largely comes down to organisation and preparation. From bookmakers and e-wallets to alert services and calculators we cover everything you need to know and prepare to…</p>
                                    <a title="More" className="icon-more" >&nbsp;</a>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6 pd-t-b-4 is-relative">
                            <div className="bg-white colors-box">
                                <div className="fwid two-box">
                                    <h4><i className="icon-learnbox">&nbsp;</i> Handicaps</h4>
                                    <p>There is a range of betting handicaps that are used in sports arbitrage including Asian Handicaps and European Handicaps, of which there are many different variables and types such as…</p>
                                    <a title="More" class="icon-more">&nbsp;</a>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6 pd-t-b-4 is-relative">
                        
                            <div className="bg-white colors-box">
                                <div className="fwid two-box">
                                    <h4><i className="icon-learnbox">&nbsp;</i> Betting Agents</h4>
                                    <p>In order to become a successful sports arbitrage trader, you will need to access odds from a small group of essential bookmakers. In some cases, you may be restricted from…</p>
                                    <a title="More" className="icon-more">&nbsp;</a>
                                </div>
                            </div>
                        </div>
        </div>
                
              
           </div> 
        )
    }
})





