import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';

export default withRouter(class EuropeanHandicapsCalculatorForm extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                
                <div className="fwid arb-cruncher bg-white mg-t-40">
                    <div className="arb-cruncher-head">
                        <h4>European Handicaps Calculator</h4>
                    </div>
                    <div className="calc_form arb-cruncher-body">
                    <div className="table-responsive">
                    <table className="table arb-table is-fullwidth">
                    <colgroup>
                    <col width="120px" />
                    <col width="150px"/>
                    <col width="150px"/>
                    <col width="120px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    </colgroup>
                    <tbody>
                    <tr className="arb-th">
                        <td style={{textAlign: 'left'}}>H/Cap</td>
                        <td style={{textAlign: 'left'}}>Home Team Score	</td>
                        <td style={{textAlign: 'left'}}>Away Team Score</td>
                        <td style={{textAlign: 'left'}}>Price £</td>
                        
                        <td style={{textAlign: 'left'}}>Stake £</td>
                        <td style={{textAlign: 'left'}}>Return £</td>
                        <td style={{textAlign: 'left'}}>Profit £</td>
                        <td style={{textAlign: 'left'}}>Yield  %</td>
                    </tr>
                    <tr>
                <td><span data-toggle="tooltip" title="" data-placement="right" className="tooltip is-tooltip-right has-text-grey" data-tooltip="Home team to win with at least two goals margin.">EH1 (-1)</span>
                 <input type="hidden" id="h_cap_1" value="1" />
                <input type="hidden" id="h_cap_1_1" value="3.00" />
                 <input type="hidden" id="h_cap_2_1" value="None"/>
                 </td>
                <td><div className="select is-fullwidth">
                <select name="home_team" id="home_team_1">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                </select>
                </div>
                    </td>
                <td>
                <div className="select is-fullwidth">
                <select className="input" name="away_team" id="away_team_1">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                </select>
                </div></td>
                <td><input id="e_price_1" type="text" className="input amountOnly" value="0.00" name="e_price"/></td>
                 <td><input id="e_stack_1" type="text" className="input amountOnly" value="0.00" name="e_stack"/></td>
                <td><input type="text" className="input default-txbx" name="e_return" id="e_return_1" value="0.00" readonly=""/></td>
                <td><input type="text" className="input default-txbx" name="e_profit" id="e_profit_1" value="0.00" readonly=""/></td>
                <td><input type="text" className="input default-txbx" name="e_yield" id="e_yield_1" value="0.00" readonly=""/></td>
              </tr>
              {/* AH-2.75 Section */}
              <tr>
                <td><span data-toggle="tooltip" title="" data-placement="right" className="tooltip is-tooltip-right has-text-grey" data-tooltip="Home team to win with at least three goals margin.">EH1 (-2)</span>
                 <input type="hidden" id="h_cap_1" value="1" />
                <input type="hidden" id="h_cap_1_1" value="3.00" />
                 <input type="hidden" id="h_cap_2_1" value="None"/>
                 </td>
                <td><div className="select is-fullwidth">
                <select name="home_team" id="home_team_1">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                </select>
                </div>
                    </td>
                <td>
                <div className="select is-fullwidth">
                <select className="input" name="away_team" id="away_team_1">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                </select>
                </div></td>
                <td><input id="e_price_1" type="text" className="input amountOnly" value="0.00" name="e_price"/></td>
                 <td><input id="e_stack_1" type="text" className="input amountOnly" value="0.00" name="e_stack"/></td>
                <td><input type="text" className="input default-txbx" name="e_return" id="e_return_1" value="0.00" readonly=""/></td>
                <td><input type="text" className="input default-txbx" name="e_profit" id="e_profit_1" value="0.00" readonly=""/></td>
                <td><input type="text" className="input default-txbx" name="e_yield" id="e_yield_1" value="0.00" readonly=""/></td>
              </tr>
                    <tr>
                        <td colspan="8" align="center" className="text-center">
                        <input type="reset" className="btn purple-btn normal-btn rst" value="Reset" />
                        <input type="button" className="btn green-btn normal-btn" value="Calculate" onClick="calculateBackRay()" />
                        </td>
                    </tr>
                    </tbody>
                </table>
                    </div>
                   
                    </div>
                </div>
                
              
           </div> 
        )
    }
})





