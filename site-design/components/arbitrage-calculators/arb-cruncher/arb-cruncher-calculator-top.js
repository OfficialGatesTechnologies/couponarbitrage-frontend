import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
export default withRouter(class ArbCruncherCalculatorTop extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (

            <div>

                <div className="box-section mg-t0">
                    <div className="fwid box-sec-01">
                        <div className="row-same-height columns is-variable is-0">
                            <div className="column is-6 hero is-medium is-bold bg-green colors-box is-relative">

                                <div className="fwid two-box"> <span className="box-white-line">&nbsp;</span>
                                    <h2 className="box-head">Arb Cruncher Calculator</h2>
                                    <span className="icon-box icon-calculator">&nbsp;</span>
                                </div>

                            </div>
                            <div className="column is-6 col-md-height bg-white texts-box">
                                <div className="fwid two-box">
                                    <div className="fwid learn-box learn-box-link">

                                        <p>Arb Cruncher is a free online sports betting calculator that calculates level-profit stakes for arbitrage betting, trading and back and lay bets on betting exchanges. This back and lay calculator can be used for arbitrage calculations and for working out stakes for arbitrage betting calculations. Arb Cruncher is the most popular online betting calculator.</p>
                                        <p>The live online calculator is shown below and is also available in a convenient <a id="popup_window" href="#">popup window</a></p>
                                        <p>To work out the calculations used for cross market arbitrage betting use the free
                                         <Link href="/cross-market-arbitrage-calculator"><a> cross arbitrage calculator tool</a>
                                            </Link></p>
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





