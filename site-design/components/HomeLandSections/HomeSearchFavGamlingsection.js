import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class HomeSearchFavGamlingsection extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="fav-gamb">
                    <div className="container">
                    <div className="columns">
                        <div className="column">
                        <h3 className="has-text-centered">Search for your favourite gambling sites below</h3>
                        <div className="fav-gamb-list">
                            <ul>
                                <li>
                                    <a  title="">
                                    <div id="flip-this" class="flip-horizontal">
                                        <div class="front">
                                    <img src="/static/images/eToro_Trading__Investing_1506946344.png" width="125" alt="EToro - Trading &amp; Investing" />
                                        </div>
                                        <div className="back"  >
                                            <h4>£70 <br/>Cashback</h4>
                                        </div>
                                        </div>
                                    </a>
                                </li>
                                                               

                            </ul>

                        </div>
                        </div>
                    </div>
                        
                    </div>
                </div>
                
              
           </div> 
        )
    }
})





