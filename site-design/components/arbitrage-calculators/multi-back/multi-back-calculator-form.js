import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';


export default withRouter(class MultiBackCalculatorForm extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                
                <div className="fwid arb-cruncher bg-white mg-t-40">
                    <div className="arb-cruncher-head">
                        <h4>Multi Back Calculator</h4>
                    </div>
                    <div className="calc_form arb-cruncher-body">
                    <div className="table-responsive">
                    <table className="table arb-table is-fullwidth">
                    <colgroup>
                    <col width="150px"/>
                    <col width="30px"/>
                    <col width="120px"/>
                    <col width="120px"/>
                    <col width="120px"/>
                    <col width="120px"/>
                    <col width="120px"/>
                    </colgroup>
                    <tbody>
                    <tr className="arb-th">
                        <td style={{textAlign: 'right'}}></td>
                        <td style={{textAlign: 'right'}}></td>
                        <td style={{textAlign: 'right'}}>Price £</td>
                        <td style={{textAlign: 'right'}}>Commission %</td>
                        
                        <td style={{textAlign: 'right'}}>Stake £</td>
                    
                        <td style={{textAlign: 'right'}}>Profit £</td>
                        <td style={{textAlign: 'right'}}>Yield  %</td>
                    </tr>
                    
                    <tr>
                        <td className="has-text-grey">Back Selection 1</td>
                        <td>
                        <div className="field">
                                        <input className="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked" />
                                        <label for="exampleRadioInline1"></label>
                                        
                                </div>
                        </td>
                        <td><input id="b_price" type="text" className="input amountOnly" value="0.00" name="b_price" /></td>
                        <td><input id="b_comm" type="text" className="input default-txbx" value="0.00" name="b_comm" readonly=""/></td>
                        <td><input type="text" className="input amountOnly" name="b_stack" id="b_stack" value="0.00"/></td>
                        <td><input type="text" className="input default-txbx" name="b_profit" id="b_profit" value="0.00" readonly=""/></td>
                        <td><input type="text" className="input default-txbx" name="b_yield" id="b_yield" value="0.00" readonly=""/></td>
                    </tr> 
                    {/* Back Selection 2 */}
                    <tr>
                        <td className="has-text-grey">Back Selection 2</td>
                        <td >
                        <div className="field">
                                        <input className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline" />
                                        <label for="exampleRadioInline2"></label>
                                        
                                </div>
                        </td>
                        <td><input id="b_price" type="text" className="input amountOnly" value="0.00" name="b_price" /></td>
                        <td>
                        {/* <div className="input-group-bulma bulma-touchspin">
    <span className="input-group-addon bulma-touchspin-prefix" style={{display: 'none'}}></span>
    <input id="l_comm" type="text" value="0.00" name="l_comm" className="input" style={{display: 'block'}} />
    <span className="input-group-addon bulma-touchspin-postfix" style={{display: 'none'}}></span>
    <span className="input-group-btn-vertical">
        <button className="btn btn-default-bulma bulma-touchspin-up" type="button"><i className="fas fa-chevron-up"></i></button>
          <button className="btn btn-default-bulma bulma-touchspin-down" type="button"><i className="fas fa-chevron-down"></i></button></span>
</div> */}
<input id="l_comm" type="text" value="0.00" name="l_comm" className="input" style={{display: 'block'}} />
                        </td>
                        <td ><input type="text" className="input amountOnly default-txbx" name="b_stack" id="b_stack" value="0.00"/></td>
                        <td><input type="text" className="input default-txbx" name="b_profit" id="b_profit" value="0.00" readonly=""/></td>
                        <td><input type="text" className="input default-txbx" name="b_yield" id="b_yield" value="0.00" readonly=""/></td>
                    </tr>
                    <tr >
                        <td></td>
                        <td colspan="2"><label className="control-label-01 back-all">Back selections on same betting exchange</label>
                        {/* <input type="checkbox" className="dis-inblock dis-vt" name="s_exchange_radio" id="s_exchange_radio" /> */}
                        <div className="checkbox join-check-wrap">
                        <label>
                                <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check"/>                       
                            <span className="cr chck-bor"><i className="cr-icon fas fa-check"></i></span>
                        
                            </label>
                        </div>
                        
                        </td>
                        <td><input id="s_exchange" type="text" value="0.00" name="s_exchange" className="input" /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                   
                    <tr>
                    <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="2" align="right" valign="middle" className="has-text-right"><label className="control-label-01 back-all " style={{fontWeight:  'Bold'}}>Book %</label></td>
                        <td><input type="text" className="input default-txbx" value="0.00" id="laybet_amount"/></td>
                    </tr>
                    <tr>
                    <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="3" align="right" valign="middle" className="has-text-right">
                        <label className="control-label-01 back-all mg-tp-8" style={{fontWeight:  'Bold'}}>Total Stake £</label>  </td>
                        <td><input type="text" className="input default-txbx" value="0.00" id="total_stake" /></td>
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





