import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class ArbitrageCalculatorsMenu extends Component {

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
                                <h3 className="bread-title">Sports Arbitrage & Betting Calculators</h3>
                                <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus mg-t-30 mg-b-30">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="active " role="presentation"><Link href="/back-lay-calculator"><a title="Back & Lay">Back & Lay</a></Link></li>
                                            <li className="" role="presentation"><Link href="/asian-handicaps-calculator"><a title="Asian Handicaps">Asian Handicaps</a></Link></li>
                                            <li className="" role="presentation"><Link href="/european-handicaps-calculator"><a title="European Handicaps">European Handicaps</a></Link></li>
                                            <li className="" role="presentation"><Link href="/multiback-calculator"><a title="Multi Back" >Multi Back</a></Link></li>
                                            <li className="" role="presentation"><Link href="/draw-nobet-calculator"><a title="Draw No Bet">Draw No Bet</a></Link></li>
                                            <li className="" role="presentation"><Link href="/cross-market-arbitrage-calculator"><a title="Cross Market Arb Calculator">Cross Market Arb Calculator</a></Link></li>
                                            <li className="" role="presentation"><Link href="/arb-cruncher-calculator"><a title="Arb Cruncher Calculator">Arb Cruncher Calculator</a></Link></li>
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





