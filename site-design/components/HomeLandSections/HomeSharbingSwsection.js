import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class HomeSharbingSwsection extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="sharbing-section">
                <div className="sharbing-wrap">
                <div className="container">
                        <div className="columns is-desktop">
                            
                            <div className="column is-6 sharb-rt is-pulled-right">
                           
                                <a ><img src="/static/images/sharbing-mob.png" alt="sharbing-image" /></a>
                           
                            </div>
                            <div className="column is-6 is-pulled-left sharb-rt">
                            <a ><h2>SHARBING SOFTWARE APP </h2></a>
                            <span class="shar-line">&nbsp;</span>
                            <h3>Our arbitrage software scans all the major bookies and exchanges and provides you with shop arbs, online arbs and odds comparison across a range of markets on multiple platforms.</h3>
                            <ul>
                                    <li><span>Shop Arbs</span></li>
                                    <li><span>Odds Comparison</span></li>
                                    <li><span>Cross Platform - Web, iOS and Android</span></li>
                                    <li><span>Built in Calculators</span></li>
                                    <li><span>Chat with other members</span></li>
                                </ul>
                                <div class="shar-app">
                                    <ul>
                                        <li><a href="#"><img src="/static/images/others/app-01.png" alt="image"/></a></li>
                                        <li><a href="//bit.ly/1XYkJEt"><img src="/static/images/others/app-02.png" alt="image"/></a></li>
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





