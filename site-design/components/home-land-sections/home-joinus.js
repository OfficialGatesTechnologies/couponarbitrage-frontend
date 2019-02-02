import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';

export default withRouter(class HomeJoinUs extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="join-us">
                    {/* Join Us Index */}
                    <div className="container">
                    <div className="join-us-wrap">
                        <div className="columns is-desktop">
                            
                            <div className="column is-6 is-pulled-left join-lt">
                            <h2>Why Join Us?</h2>
                            <ul>
                                    <li><span>Earn Cashback for Bookmakers, Casino, Bingo and Poker</span></li>
                                    <li><span>Access Free arbs with our online arbitrage interface</span></li>
                                    <li><span>Download our sharbing app to make money on the high street</span></li>
                                    <li><span>Earn rebates on your betting and financial turnover</span></li>
                                    <li><span>Learn sports arbitrage and how to trade</span></li>
                                    <li><span>FAQ's</span></li>
                                </ul>
                            </div>
                            <div className="column is-6 is-pulled-right join-lt">
                            <a href="#" className="video" data-toggle="modal" data-target="#" data-video="/couponarbitrage/site/assets/videos/test-02.mp4"><img src="/static/images/join-video.jpg" alt="video" /></a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
              
           </div> 
        )
    }
})





