 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';
 
const terms = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Privacy policy</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="log-bg">
                <img src="static/images/backgrounds/log-bg.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>Terms & Conditions</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="inner-wrapper full-width">
        <div className="container">
                <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-mobile is-variable is-0">
                                <div className="fwid top-box bg-green is-fullwidth">
                                    
                                        <div className="fwid"> <span className="box-white-line">&nbsp;</span>
                                        <h1 className="box-head">Terms & Conditions</h1>
                                        </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="fwid fm-white-top pd-30 is-inline-block is-fullwidth">
                        <div className="fwid bot-box">
                            <div className="has-text-grey about-sec">
                            
                                <div className="fwid bot-box">
                                    <p>CASH BACK PROMOTIONAL TERMS AND CONDITIONS</p>
                                    <p>1. To claim cashback you must be a new "referred" user to the partner website. The referred account must have tracked correctly. In order for the new account to have tracked correctly you must have used a referral link on this site to link through to the partner site when opening your account.</p>
                                    <p>2. Coupon Arbitrage cannot and will not be held responsible if a claimants account does not track correctly. Coupon Arbitrage will only pay cashback when the referred gaming account has been identified by ourselves and the relevant gaming site. Affiliate links can be unreliable and we cannot always verify that a referral has tracked correctly.</p>
                                    <p>
                                    3. Coupon Arbitrage reserves the right to cancel any claim that has not tracked correctly or any claim that has not met the required deposit and wagering requirements or any claim that has been identified as fraudulent by Coupon Arbitrage. Coupon Arbitrage will have the final decision in all claim disputes. Coupon Arbitrage reserves the right to change or cancel any cash back offer at any time and with immediate effect.
                                    </p>
                                    <p>4. Before claiming cash back for your account you must meet the relevant deposit and wagering requirements for the cash back, as set out under each offer and within the time frames stated under each other. To meet the wagering requirements a claimant must wager the amount listed in their own deposited funds. Wagering bonus funds only is not accepted as meeting the wagering requirement. By accepting these terms and conditions you confirm that you have met the relevant deposit and wagering requirements.</p>
                                    <p>5. The majority of our cashback deals offer a higher value than the required deposit and wagering. Therefore, cashback will be declined if the customer engages in any of the following activities in order to activate the cashback:</p>
                                    <ol>
                                        <li>Requests the casino, bingo site or bookmaker to remove the bonus prior to playing.</li>
                                        <li>Wagers the minimum amount required to activate the cashback and then makes a withdrawal request at the gaming site, thereby forfeiting the remaining bonus amount.</li>
                                        <li>Deposits to the gaming site and withdraws within 15 minutes of first deposit.</li>
                                        <li>Engages in zero-risk or minimal-risk wagering strategies such as playing roulette and placing stakes on red AND black or odd AND even; playing less than £1 spins auto-play on slots in order to achieve wagering target; wagering exact amount required to activate cashback or any other similar strategies that are deemed by us to be clearly playing solely for the cashback. </li>
                                    </ol>
                                    <p>
                                    6. You are only permitted to claim cash back once per gaming group. For example if you have already claimed cash back for a William Hill Casino referral you will not be eligible to receive cash back for an account at William Hill Vegas. If you have previously held an account at any of the gaming group websites you will not be eligible to receive cash back, regardless of whether you claimed cash back or not. For example if you have previously had an account at William Hill, but did not open it through Coupon Arbitrage, you will not be able to claim cash back from any of the William Hill offers.
                                    </p>
                                    <p>
                                    7. Claims must be submitted using the claim form and contain details of the site you joined, date joined and time joined. By accepting these terms and conditions you must also agree to provide additional account details in rare cases where we are having difficulties in verifying your cash back claim. Details that may be required include: username, deposit method, total wagering turnover and previous betting history.
                                    </p>
                                    <p>
                                    8. Cashback claims must be submitted within 3 days of the claimant opening the referred account or they will not be valid.
                                    </p>
                                    <p>
                                    9. Valid claims will be processed as soon as possible but may have delays. Claimants should check each individual cash back listing for estimated processing times. However, this is purely an estimate and claims may take longer. Any outstanding pending claims will be chased up manually by Coupon Arbitrage at the end of each calendar month.
                                    </p>
                                    <p>
                                    10. Payments must be requested via email and will be paid via Skrill, NETELLER, Paypal and bank transfer only. When a payout is requested, the full balance of the account will be paid out. Any bank transfer payout requests that are less than £50 will be sent via an alternative payment method.
                                    </p>
                                    <p>
                                    11. English Law exclusively governs these terms and conditions and only English Law will adjudicate any disputes.
                                    </p>
                                </div>
        
                                <div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
        
        <Footer />
    </div>
  )

export default terms;

