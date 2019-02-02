import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class ArbitrageCalculatorsTop extends Component {

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
                                            <h2 className="box-head">Arbitrage Calculators Calculator</h2>
                                            <span className="icon-box icon-calculator">&nbsp;</span>
                                        </div>
                                    
                                </div>
                                <div className="column is-6 col-md-height bg-white texts-box">
                                        <div className="fwid two-box">
                                            <div className="fwid learn-box">
                                            
                                             <p>No professional gambler or arbitrageur can operate successfully without having good knowledge of all types of handicaps, betting combinations and the concept of backing and laying. From Asian Handicaps, European Handicaps to Cross Market calculations our arbitrage betting calculators do the hard work for you.</p>
                                             <p>Use the sub menus below to select which calculator you wish to use.</p>
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





