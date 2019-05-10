import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';


export default withRouter(class DrawNoBetCalculatorTop extends Component {

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
                                            <h2 className="box-head">Draw No Bet 
Calculator</h2>
                                            <span className="icon-box icon-calculator">&nbsp;</span>
                                        </div>
                                    
                                </div>
                                <div className="column is-6 col-md-height bg-white texts-box">
                                        <div className="fwid two-box">
                                            <div className="fwid learn-box">
                                            
                                             <p>Use our draw-no-bet calculator to work out your profit or loss when you place a bet on this market type. </p>
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





