import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import EcopayzCashbackScheme from '../components/turnover-cashback/Ecopayz-cashback-scheme';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
import RangeSliderTop from '../components/Range-slider';
import Link from 'next/link';

const EcopayzCashbackScheme_page = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Learn Sports Arbitrage</title>
            
           
        </Head>

        <HeaderIn />
        <div className="container">

            <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                    <h4><Link href="/"><a>Home</a></Link>&nbsp; / &nbsp;<b>Trunover Cashback</b>&nbsp; /&nbsp;<b>Ecopayz Cashback Scheme</b></h4>
                </div>
                <div className="banner-layer innerban-layer">&nbsp;</div>
                <div className="innerban-img"> <img src="/static/images/banner/eco-innerbanner.png" alt="Ecopayz Cashback Scheme" /></div>
            </div>
        </div>
        
        <div className="inner-wrapper">
            <div className="container">
                <EcopayzCashbackScheme />
                <div className="fwid learn-boxs learn-list mg-t-40">
                    <div className="bg-white colors-box">
                        <div className="bread-crumbs-wrap">
                            <div className="fwid two-box bread-crumbs">
                                <h3 className="bread-title">Ecopayz Cashback Scheme</h3>
                                <div className="fwid texts-box">
                                    <div className="fwid free-arbs-menus mg-t-30 mg-b-30">
                                        <ul role="tablist" className="no-style clearfix">
                                            <li className="active" role="presentation"><Link href="#!"><a title="Ecopayz Cashback Scheme">Ecopayz Cashback Scheme</a></Link></li>
                                            <li className="" role="presentation"><Link href="#!"><a title="Skrill Cashback Scheme">Skrill Cashback Scheme</a></Link></li>
                                            <li className="" role="presentation"><Link href="#!"><a title="SBOBET Cashback Program">SBOBET Cashback Program</a></Link></li>
                                            <li className="" role="presentation"><Link href="#!"><a title="Neteller Cashback Scheme" >Neteller Cashback Scheme</a></Link></li>
                                            <li className="" role="presentation"><Link href="#!"><a title="Asianconnect Cashback">Asianconnect Cashback</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fwid purple-txt mg-t-40">
                    <div className="bg-white colors-box">
                        <div className="bread-crumbs-wrap">
                            <div className="fwid two-box bread-crumbs">
                                <h3 className="bread-title">Ecopayz Cashback Scheme</h3>
                                <p>Welcome to the Ecopayz&nbsp;cashback program where you can earn cashback by using your Ecopayz account to transfer&nbsp;money to gambling sites and other merchants.</p>
                                <p>Once your Ecopayz account is accepted onto our scheme, you will receive a generous cashback bonus each&nbsp;time you use your Ecopayz&nbsp;account to make a deposit at a casino, bookmaker, bingo site and more or by using your Ecopayz account to purchase items. The more you transact, the more you earn as the rate of cashback increases as you transfer more! Sign up below and send your details using the quick form below&nbsp;to apply. New &amp; Existing customers welcome. See FAQ's below for more info.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fwid bg-white clearfix is-inline-block mg-t-40">
                    <article>
                        <div className="post-2470 page type-page status-publish hentry ecopayz-color" id="post-2470">
                            <div className="omsc-full-width-section bg-medium section-pricing">
                                <div className="omsc-full-width-section-inner">
                                    <div className="omsc-full-width-section-content">
                                        <div className="container">
                                            <div className="container-inner xs-mg-0">
                                                <div className="demo">
                                                <div className="sliderbox w-100">
                                                <RangeSliderTop />
                                               
                                                </div>
                                                <div className="color-full custom-modal">
                                                {/* <AutoModalPopup /> */}
                                                </div>
                                                
                                                  
                                                    <div className="fwid twobox-value">
                                                        <div className="fwid values-list">
                                                            <div className="mem-level">Ecopayz VIP Membership Level: <span className="valuebox vip-level-1" id="membership_level">Not eligible for Ecopayz VIP</span></div>
                                                            <div className="mem-bonus-1">Monthly Bonus From Couponarbitrage: <span className="valuebox prime-3" id="coupon_bonus">0 EUR</span></div>

                                                            <div className="mem-bonus-total">Total Monthly Couponarbitrage & Ecopayz Bonus: <span className="valuebox" id="total_bonus">0 EUR</span></div>
                                                        </div>
                                                        <div className="fwid values-benefits">
                                                            <div className="mem-head-text">

                                                                <h4 className="green-txt">Your Benefits with Us</h4>
                                                            </div>
                                                            <div className="boxslist">
                                                                <ul className="no-style rect-list">
                                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="125000" style={{ display: 'none' }}>
                                                                        <div className="rect-content">0.65% Cashback</div>
                                                                    </li>
                                                                    <li className="rect-item  limit-visibility is-visible" data-min="126000" data-max="250000" >
                                                                        <div className="rect-content">0.85% Cashback</div>
                                                                    </li>
                                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                                        <div className="rect-content">Instant Gold VIP Level</div>
                                                                    </li>
                                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                                        <div className="rect-content">Fast Track Verification</div>
                                                                    </li>
                                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                                        <div className="rect-content">Free P2P Account Transfers</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="fwid twobox-animate">
                                                        <div className="circle  green-circle">
                                                            <div className="icon-charts">
                                                                <div className="chart-circle-mask">
                                                                    <div className="sprite-circle-mask"></div>
                                                                    <div className="bg"></div>
                                                                </div>
                                                            </div>
                                                            {/* <input className="knob knob_cou input" type="text" /> */}
                                                            <input className="knob knob_cou" data-width="200" data-readOnly="true" data-displayInput="true" value="0" data-thickness=".3" data-fgColor="#76B127" />
                                                            <div className="circle-text"><i className="icon-circletxt c-primary-3">&nbsp;</i>Couponarbitrage Cashback </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="omsc-full-width-section bg-light section-join section-sbobet">
                            <div className="container-inner pd-b-40 max-wp80">
  
                            <header id="join-us" className="has-text-centered">
                              <h2 className="content-head"><strong>Join Us</strong> for <strong>Free</strong></h2>
                            </header>
                            <div className="omsc-one-half omsc-last xs-pd0 fwid">
                                <h3>New Ecopayz Customer</h3>
                                
                                <ul className="no-style">
                                  <li>
                                      <Link href="https://secure.ecopayz.com/Registration.aspx?_atc=ix543q481bjmjwat1p0wghb73">
                                      <a className="button button-ecopayz is-fullwidth" target="new">
                                      <img src="static/images/ecopayz-logo.png" alt="eco" /> Registration</a>
                                      {/* <strong>Ecopayz</strong> Registration</a> */}
                                      </Link>
                                  
                                  </li>
                                  <li>
                                  Send the data of your new account on the below to join our FREE Ecopayz Bonus Program.</li>
                                </ul>
                              </div>
                              <div className="ecopayz is-inline-block is-fullwidth">
                              <div className="mg-b-30">
                              <div className="level field bor-bot-e1">
                                <div className="titl level-left">
                                    <h3 className="is-no-border bor-0">Application Form</h3>
                                </div>
                                <div className="titl level-right">
                                <span className="is-small fon-10">Existing Ecopayz Customer Info <Link href="#"><a data-toggle="tooltip" title="" data-placement="top" className="tooltip-icon" data-original-title="Existing Ecopayz users may apply but we cannot guarantee you will be accepted onto the bonus scheme"><img src="/static/images/icons/info-round.png" alt="info" /></a></Link></span>
                                </div>
                              </div>
                              </div>
                              
                              
                              <div className="field">
                                <label className="label">Name</label>
                                <div className="control"><input type="text" className="input" />
                                
                                </div>
                              </div>
                              <div className="field">
                                <label className="label">Ecopayz Email Address <span className="gfield_required">*</span></label>
                                <div className="control"><input type="text" className="input" />
                                <p className="err_msg" style={{display: 'none'}}>Please enter the email address.</p>
                                </div>
                              </div>
                              <div className="field">
                                <label className="label">EcoPayz 10 Digit Account ID <span className="gfield_required">*</span></label>
                                <div className="control"><input type="text" className="input" />
                                <p className="err_msg" style={{display: 'none'}}>Please enter the acount id.</p>
                                </div>
                              </div>
                              <div className="field gfield_description">
                              <Link href="">
                                <a className="fancybox">What is my account ID?</a>
                              </Link>
                              </div>
                              <div className="field">
                              <label className="label">Currency</label>
                              <div className="select is-fullwidth">
                                <select>
                                    <option value="GBP">GBP</option>
                                            <option value="USD">USD</option>
                                            <option selected="selected" value="EUR">EUR</option>
                                            <option value="CAD">CAD</option>
                                            <option value="PLN">PLN</option>
                                            <option value="any other currency">any other currency</option>
                                </select>
                                </div>
                              </div>
                                <div className="field pd-t-b-15">
                                        <input className="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked" />
                                        <label for="exampleRadioInline1">New Customer</label>
                                        <input className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline" />
                                        <label for="exampleRadioInline2">Existing Customer</label>
                                </div>
                                <div className="field">
                                    <div className="control level-left">
                                        <img src="static/images/captcha.jpg"/>
                                        <input type="text" className="input captcha-box ecoCaptcha" />
                                        <p className="err_msg" style={{display: 'none'}}>Please enter the acount id.</p>
                                    </div>
                                  

                                </div>
                                <div className="field">
                                    <div className="checkbox join-check-wrap">
                                    <label>
                                        <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check"/>                       
                                    <span className="cr chck-bor"><i className="cr-icon fas fa-check"></i></span>
                                    <span className="has-text-black">I have read and accept the </span> 
                                    <Link href="javascript:void(0);"><a target="_blank" className="jo-trms">Terms and conditions</a></Link><span>.*</span>
                                    </label>
                                    <div className="full-width"><span className="err_msg err_msg_add" id="err_termsCond"></span></div>
                                    </div>
                                    <p className="err_msg" style={{display: 'none'}}>Please accept the terms and conditions.</p>
                                </div>
                                <div className="field text-center gform_footer">
                                    <button name="sendData" type="submit" id="sendData" className="btn btn-default purple-btn xm-full-btn" value="Register">SUBMIT FORM TO APPLY</button>
                                </div>
                                

                              </div>
                            </div>
                            <div className="fwid two-box bread-crumbs">
                            <div className="fwid tabdivsec-wrap">
                            <div>
                            <Accordion allowZeroExpanded>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        How does the Ecopayz Cashback Scheme Work?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                        The Ecopayz cashback scheme allows you to earn cashback on all your transactions using your&nbsp;Ecopayz&nbsp;account. All transactions qualify for cashback and the rate of cashback increases as you transfer more.&nbsp;
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Who is eligible to join the Ecopayz Cashback Scheme?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                        Every&nbsp;new&nbsp;Ecopayz customer who registers via our link is eligible to join the scheme. For&nbsp;existing&nbsp;customers, please feel free to apply and Ecopayz will assess each application on a case-by-case basis which is usually dependant on whether you have been referred by another affiliate already and your recent activity on your account.  
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Are any merchants excluded from the Ecopayz cashback scheme?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                        All merchants are included therefore you will receive cashback on all your transactions with Ecopayz<br/>  
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Are any merchants excluded from the Ecopayz cashback scheme?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    
                                        <div className="maintabdiv">
                                            You can view your earnings <Link href="https://couponarbitrage.com/turnover/ecopayz"><a  target="">here</a></Link> and request a payout <Link href="https://couponarbitrage.com/turnover-payout/ecopayz">
                                            <a target="">here</a>
                                            </Link> .</div>
                                    
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        How does instant Gold VIP and fast-track verification work?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                            Once you are successfully accepted onto our Ecopayz cashback scheme, simply email affiliatedocs@ecopayz.com with a copy of your ID and proof of address and you will be instantly upgraded to Gold VIP and fully verified.</div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        How often will my cashback stats be updated?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                            Your cashback stats will be updated once-per-month. On the 7th of the succeeding month, your stats will be updated for the previous month and any cashback added to your account will be payable immediately.</div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            </Accordion>
                            </div>
                            
                                   
                                    </div>
                            </div>
                            
                            </div>
                        </div>
                    </article>
                </div>

            </div>

        </div>

        <Footer />
    </div>
)

export default EcopayzCashbackScheme_page;

