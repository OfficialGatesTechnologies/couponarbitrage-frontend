import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class HomeTurnOversection extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (

            <div>
                <div className="turn-section">
                    <div className="turn-wrap">
                        <div className="turn-lt">
                            <div className="turn-lt-desk">
                            <Link>
                            <a ><img src="/static/images/turn-lap-01.png" alt="gambling-image" /></a>
                            </Link>
                            
                            </div>
                            <div className="turn-lt-tap">
                                <Link href="/cashback-bonuses">
                                    <span>
                                        <a><img src="/static/images/turn-lap-02.png" alt="gambling-image" /></a>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="container">

                            <div className="columns is-mobile">


                                <div className="column is-12 is-offset-0">
                                    <div className="turn-rt">
                                        <Link href="/EcopayzCashbackScheme_page">
                                            <span>
                                                <a><h2>TURNOVER CASHBACK </h2></a>
                                            </span>
                                        </Link>
                                        <span className="turn-line">&nbsp;</span>
                                        <h3>Use the bonus calculator on each program for an estimate of the monthly cashback rewards you will receive</h3>
                                        <ul>
                                            <li><span>Earn over €2500 per month with our Skrill Bonus Scheme</span></li>
                                            <li><span>Earn over €2500 per month with our NETELLER Bonus Scheme</span></li>
                                            <li><span>Earn over £4,000 per month with our SBOBET Cashback Program</span></li>
                                            <li><span>Earn over €2,500 per month with our Asian Connect88 Cashback</span></li>
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





