import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class HomeArbsection extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="arb-section">
                <div className="container">
                <div className="arb-wrap">
                        <div className="columns is-desktop">
                            <div className="column is-5 is-pulled-left arb-lt">
                            <Link href=""><a href="#!"><h2>FREE ARBS</h2></a></Link>
                                <span className="arb-title-line">&nbsp;</span>
                                <h3>Online Arbitrage Interface allows you to make
                                    guaranteed profits from online sports betting:</h3>
                                    <ul>
                                    <li><span>Arbitrage alerts auto-refreshed every minute so odds are always up to date</span></li>
                                    <li><span>Many markets covered including 3 way match results, total goals and all Asian Handicap cross market combinations</span></li>
                                    <li><span>Set Minimum arb percentage threshold</span></li>
                                    <li><span>Odds comparison &amp; Asian Lines available for your analysis</span></li>
                                </ul>
                            </div>
                            <div className="column is-7 is-pulled-right arb-lt">
                            <div className=" arb-rt">
                               <Link href=""> 
                               <a ><img src="/static/images/arb-lap.png" alt="arb-image" /></a>
                               </Link>
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





