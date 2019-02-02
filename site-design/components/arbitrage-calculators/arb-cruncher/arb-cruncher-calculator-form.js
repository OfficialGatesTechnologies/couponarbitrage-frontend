import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';

export default withRouter(class ArbCruncherCalculatorForm extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
               


                <div className="fwid arb-cruncher bg-white mg-t-40">
                    <div className="arb-cruncher-head">
                        <h4>Arb Cruncher Calculator</h4>
                    </div>
                    <div className="calc_form arb-cruncher-body">
                    <div className="iframe-wrap text-center">
          <iframe id="iframe-id" src="//www.arbcruncher.com/webmaster_calc.asp?type=1" frameborder="0" height="600px" width="495px" scrolling="no" name="ArbCruncher"></iframe> 
                 </div>
     
                    
                   
                    </div>
                </div>
                
              
           </div> 
        )
    }
})





