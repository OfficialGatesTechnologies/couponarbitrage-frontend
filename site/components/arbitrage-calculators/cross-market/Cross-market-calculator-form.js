import React, { Component } from 'react';
import '../../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class CrossMarketCalculatorForm extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
               


                <div className="fwid arb-cruncher bg-white mg-t-40">
                    <div className="arb-cruncher-head">
                        <h4>Cross Market Arbitrage Calculator</h4>
                    </div>
                    <div className="calc_form arb-cruncher-body">
                    <div className="tabs custom-tab is-boxed is-fullwidth" id="tabs">
                            <ul>
                                <li className="is-active" data-tab="1">
                                <a>
                                    
                                    <span>STANDARD & CALCULATOR (1X2)</span>
                                </a>
                                </li>
                                <li data-tab="2">
                                <a>
                                    
                                    <span>0 AH , WIN SINGLE & DRAW CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="3">
                                <a>
                                   
                                    <span>0AH, +0.5AH & WIN SINGLE CALCULATOR</span>
                                </a>
                                </li>
                               
                            </ul>
                            </div>
                <div id="tab-content">
                    <div className="tabCus is-active" data-content="1">
                        <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                       
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 1 (Win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50">
                                <div className="control">
                                    <input type="text" className="input small-txtbx" onblur="calc1();" id="odds1" name="odds1" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50">
                                <div className="control">
                                <input type="text" className="input small-txtbx" onblur="calc1();" id="stake1" name="stake1" value="0"/>
                                </div>
                                </td>
                                
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50">
                                <div className="field">
                                <input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                            </tbody>
                             </table>
                            
                            </div>
                           
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 2 (Win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 3 (Draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        </div>
                    </div>
                    <div className="tabCus" data-content="2">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (0 ah)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="stake1" name="stake1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                           
                    <h5>Bookmaker 2 (Win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <div className="column is-4 text-center">
                           
                        <h5>Bookmaker 3 (Draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                    </div>
                    </div>
                    {/* tab 3 section */}
                    <div className="tabCus" data-content="3">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (0 ah)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" onblur="calc3();" className="input small-txtbx" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" onblur="calc3();" className="input small-txtbx" id="stake1" name="stake1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 2 (+0.5AH)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc3();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 3 (WIN SINGLE)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc3();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    </div>
                    </div>
                    </div>
                    
                   
                    </div>
{/* <!secound section of tabs start  */}
                    <div className="calc_form arb-cruncher-body">
                    <div className="tabs c2 custom-tab is-boxed is-fullwidth" id="tabs2">
                            <ul>
                                <li className="is-active" data-tab="4">
                                <a>
                                    
                                    <span>-0, 0.5 SPLIT AH, WIN SINGLE & DRAW CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="5">
                                <a>
                                    
                                    <span>+0, 0.5 SPLIT AH, WIN SINGLE & DRAW CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="6">
                                <a>
                                   
                                    <span>WIN SINGLE & + 0.5 AH</span>
                                </a>
                                </li>
                               
                            </ul>
                            </div>
                <div id="tab-content2">
                    <div className="tabCus is-active" data-content="4">
                        <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                       
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 1 (-0, 0.5)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50">
                                <div className="control">
                                    <input type="text" className="input small-txtbx" onblur="calc1();" id="odds1" name="odds1" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50">
                                <div className="control">
                                <input type="text" className="input small-txtbx" onblur="calc1();" id="stake1" name="stake1" value="0"/>
                                </div>
                                </td>
                                
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50">
                                <div className="field">
                                <input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                            </tbody>
                             </table>
                            
                            </div>
                           
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 2 ( win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        
                            <div className="column is-4 text-center">
                           
                            <h5>Bookmaker 3 (draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        </div>
                    </div>
                    <div className="tabCus" data-content="5">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (+0, 0.5)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="stake1" name="stake1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                           
                    <h5>Bookmaker 2 ( win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <div className="column is-4 text-center">
                           
                        <h5>Bookmaker 3 (draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                    </div>
                    </div>
                    {/* tab 3 section */}
                    <div className="tabCus" data-content="6">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-6 text-center">
                    <h5>Bookmaker 1 (Win Single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" onblur="calc3();" className="input small-txtbx" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" onblur="calc3();" className="input small-txtbx" id="stake1" name="stake1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-6 text-center">
                    <h5>Bookmaker 2 (+0.5 AH)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc3();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                   
                    </div>
                    </div>
                    </div>
                    
                   
                    </div>

{/* Section tab sectio three start */}

<div className="calc_form arb-cruncher-body">
                    <div className="tabs c3 custom-tab is-boxed is-fullwidth" id="tabs3">
                            <ul>
                                <li className="is-active" data-tab="7">
                                <a>
                                    
                                    <span>-1 AH, EHX -1, DRAW & WIN SINGLE CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="8">
                                <a>
                                    
                                    <span>+1 AH, WIN SINGLE & EH-1 CALCULATOR</span>
                                </a>
                                </li>
                                
                               
                            </ul>
                            </div>
                <div id="tab-content3">
                    <div className="tabCus is-active" data-content="7">
                        <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                       
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 1 (-1 ASIAN)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50">
                                <div className="control">
                                    <input type="text" className="input small-txtbx" onblur="calc1();" id="odds1" name="odds1" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50">
                                <div className="control">
                                <input type="text" className="input small-txtbx" onblur="calc1();" id="stake1" name="stake1" value="0" readonly="readonly"/>
                                </div>
                                </td>
                                
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50">
                                <div className="field">
                                <input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                            </tbody>
                             </table>
                            
                            </div>
                           
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 2 (EHX-1)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Handicap draw</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 3 (draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 4(win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        </div>
                    </div>
                    <div className="tabCus" data-content="8">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (0 ah)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="stake1" name="stake1" value="0" readonly="readonly"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                           
                    <h5>Bookmaker 2 (Win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <div className="column is-4 text-center">
                           
                        <h5>Bookmaker 3 (draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                    </div>
                    </div>
                    
                    
                    </div>
                    
                   
                    </div>
{/* Section tab sectio 4 start */}
<div className="calc_form arb-cruncher-body">
                    <div className="tabs c4 custom-tab is-boxed is-fullwidth" id="tabs4">
                            <ul>
                                <li className="is-active" data-tab="9">
                                <a>
                                    
                                    <span>-0.5,1 AH, EHX -1, DRAW & WIN SINGLE CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="10">
                                <a>
                                    
                                    <span>+0.5,1 AH, WIN SINGLE & EH-1 CALCULATOR</span>
                                </a>
                                </li>
                                
                               
                            </ul>
                            </div>
                <div id="tab-content4">
                    <div className="tabCus is-active" data-content="9">
                        <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                       
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 1 (-0.5,1 ASIAN)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50">
                                <div className="control">
                                    <input type="text" className="input small-txtbx" onblur="calc1();" id="odds1" name="odds1" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50">
                                <div className="control">
                                <input type="text" className="input small-txtbx" onblur="calc1();" id="stake1" name="stake1" value="0" readonly="readonly"/>
                                </div>
                                </td>
                                
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50">
                                <div className="field">
                                <input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                            </tbody>
                             </table>
                            
                            </div>
                           
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 2 (EHX-1)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 3 (draw)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 4(win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        </div>
                    </div>
                    <div className="tabCus" data-content="10">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (+0.5,1 ASIAN)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="stake1" name="stake1" value="0" /></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                           
                    <h5>Bookmaker 2 (WIN SINGLE)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <div className="column is-4 text-center">
                           
                        <h5>Bookmaker 3 (EH-1)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0" readonly="readonly"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                    </div>
                    </div>
                    
                    
                    </div>
                    
                   
                    </div>
{/* Section tab sectio 5 start */}
<div className="calc_form arb-cruncher-body">
                    <div className="tabs c5 custom-tab is-boxed is-fullwidth" id="tabs5">
                            <ul>
                                <li className="is-active" data-tab="11">
                                <a>
                                    
                                    <span>-1,1.5 AH, EHX -1, DRAW & WIN SINGLE CALCULATOR</span>
                                </a>
                                </li>
                                <li data-tab="12">
                                <a>
                                    
                                    <span>+1,1.5 AH, EH-1 & WIN SINGLE CALCULATOR</span>
                                </a>
                                </li>
                                
                               
                            </ul>
                            </div>
                <div id="tab-content5">
                    <div className="tabCus is-active" data-content="11">
                        <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                       
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 1 (-1,1.5)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50">
                                <div className="control">
                                    <input type="text" className="input small-txtbx" onblur="calc1();" id="odds1" name="odds1" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50">
                                <div className="control">
                                <input type="text" className="input small-txtbx" onblur="calc1();" id="stake1" name="stake1" value="0" readonly="readonly"/>
                                </div>
                                </td>
                                
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50">
                                <div className="field">
                                <input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/>
                                </div>
                                
                                </td>
                              </tr>
                            </tbody>
                             </table>
                            
                            </div>
                           
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 2 (EHX-1)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        
                            <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 3 (WIN SINGLE)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        <div className="column is-3 text-center">
                           
                            <h5>Bookmaker 3 (DRAW)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit">&nbsp;</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc1();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0" readonly="readonly"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
                        </div>
                        </div>
                    </div>
                    <div className="tabCus" data-content="12">
                    <div className="columns cal-tit-form has-text-weight-normal has-text-grey">
                    <div className="column is-4 text-center">
                    <h5>Bookmaker 1 (+1,1.5)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 1</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds1" name="odds1" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="stake1" name="stake1" value="0" /></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit1" name="profit1" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                    <div className="column is-4 text-center">
                           
                    <h5>Bookmaker 2 (win single)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds2" name="odds2" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake2" name="stake2" readonly="readonly" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit2" name="profit2" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <div className="column is-4 text-center">
                           
                        <h5>Bookmaker 3 (eh-1 or -1.5 ah)</h5>
                          <table cellspacing="0" cellpadding="3" border="0" style={{width: '100%'}}>
                            <tbody>
                              <tr>
                                <td align="center" colSpan="2"><span className="red-tit text-center">Team 2</span></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Odds:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" onblur="calc2();" id="odds3" name="odds3" value="0"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Stake:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="stake3" name="stake3"  value="0" readonly="readonly"/></td>
                              </tr>
                              <tr>
                                <td align="right" className="vtop td-50"><span>Profit:</span></td>
                                <td className="td-50"><input type="text" className="input small-txtbx" id="profit3" name="profit3" readonly="readonly" value="0"/></td>
                              </tr>
                            </tbody>
                          </table>
                            
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





