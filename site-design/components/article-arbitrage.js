import React, { Component } from 'react';
import '../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class ArticleArbitrage extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                 <div className="fwid bg-white mg-t-40">
                        <div className="learn-box-detail">
                            <div className="fwid details-heading level">
                                <h2 className="level-left">How much can you earn from sports arbitrage?</h2>
                                <span className="level-right back-img">
                                <Link href=""><a><img src="static/images/icons/icon-back-arrow.png" alt="Icon" /> Back</a></Link></span></div>
                            <div className="fwid details-texts">   <p><strong>How much can you earn from sports arbitrage?</strong></p>
<p>The all-important question and the most commonly asked by our users - how much can I earn from sports arbitrage?</p>
<p>Unfortunately we cannot give you a specific answer as there are simply too many variables; how much capital do you have to invest; how many hours per week can you commit to trading; what skill level and experience do you have in sports arbitrage; which arbitrage alert service are you using.</p>
<p>If you've been researching sports arbitrage on other websites you may have seen the 'make 10-15% profit on your capital every month' quote bandied around. This is actually a fair assumption and reasonable target and the truth is, as long as you commit enough hours and have a decent enough skill level, you should be able to quite comfortably achieve the 10-15% profit margin every month.</p>
<p>So, let’s say you have £10k to invest, you can expect to make between £1k and £1.5k profit every month. If you have £25k to invest you can expect to make between £2.5k and £3.75k profit per month.</p>
<p>There is an upper limit of what you can earn from sports arbitrage - for example, if you have £1m to invest, it is highly unlikely you could make £100k-£150k per month. The reason for this is there are not enough arbs every month to be able to invest all your capital and even if there was, bookmakers’ limits on maximum bets will not allow you to invest all of your capital.</p>
<p>In our opinion, the upper limit of profits is about £10k-£15k per month, for which you would require at least £80k-£100k capital and would really need to have a good grasp on all the markets, work long hours every day and be fully committed as a full time arber.</p>
<p>The typical amount of capital that somebody either has to invest, or can borrow to invest, is in our experience around £25k. Therefore a monthly target of between £2.5k and £4k profit is a sensible and reasonable target to make. This does require full time commitment though.</p>
<p>A sensible target for a part-time arber, who can put in the all-important weekend hours, is around 5-10% per month. This is down to the fact that you will not have the chance to take advantage of all arbs throughout the week and will struggle with re-investing your capital in a quick enough turnaround time.</p>
<p>It is a misconception that you can wake up in the morning, place a few arbs and then have the rest of the day off to do what you please. To achieve this level of income you need to work up to 12 hours per day and be fully concentrated on the markets for the majority of your working day. You need to wait for markets to start moving, odds to shift and things to develop on the markets for you to make your profit. You will be collecting arbs throughout the course of the day and sometimes you can make your whole days income in a few minutes if there is a big shift in the market so you really can't afford to take too much time away from your screens!</p></div>
                            <div className="fwid details-navs"></div>
                        </div>
                    </div>
                    <div className="fwid bg-white mg-t-40">
                        <div className="blog-list-cmd fwid">
                            <div className="fwid two-box bread-crumbs">
                                <div className="row" id="successMessage">
                                                                    </div>
                                <h3><b><span id="commentCountDisplay">0</span></b> Comments</h3>
                            </div>
                            <div className="cmd-list-wrap fwid">
                                {/* <span id="commentCounter" data-comment_count="0" style="visibility: visible;"></span>  */}                          </div> 
                        </div>
                    </div>
                    <div className="fwid bg-white mg-t-40">
                        <div className="blog-list-cmd fwid">
                            <div className="fwid two-box bread-crumbs">
                                <div className="row" id="successMessage">
                                                                    </div>
                                <h3> Leave a comment</h3>
                            </div>
                            <div className="cmd-list-wrap fwid">
                            <div className="fwid fm-white-top">
                            <div className="field">
                                <label className="label">Your name</label>
                                <div className="control">
                                    <input className="input" type="text" name="commentName" id="commentName_parent" placeholder="Your Name"/>
                                    <p className="has-text-danger err_msg" id="err_commentName_parent"></p>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Your email</label>
                                <div className="control">
                                    <input className="input" type="text" name="commentEmail" id="commentEmail_parent" placeholder="Your Email" />
                                    <p className="has-text-danger err_msg" id="err_commentName_parent"></p>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Comment</label>
                                <div className="control">
                                <textarea placeholder="Comment" name="commentDesc" id="commentDesc_parent" className="input"></textarea>
                                    
                                    <p className="has-text-danger err_msg" id="err_commentName_parent"></p>
                                </div>
                            </div>
                           
                            <div className="field">
                                <label className="label">Security Code</label>
                                <div className="columns">
                                <div className="control column">
                                <input type="text" name="captchaCode" value="" id="captchaCode_parent" className="input numonly required"/> 
                                    
                                    <p className="has-text-danger err_msg" id="err_commentName_parent"></p>
                                </div>
                                <div className="control column">
                                <img src="static/images/captcha.jpg"/>
                                </div>
                                </div>
                                <div className="fwid sm-mg-t30"> 
                                            <div className="sign-bot"><div className="text-left">
                                                <button className="btn btn-default green-btn xm-full-btn" type="submit" name="commentSubmit" value="true">Send Comment</button>
                                                <button type="reset" className="btn btn-default purple-btn xm-full-btn">Cancel</button>
                                            </div></div>
                                        </div>
                                
                            </div>        
                           
                                       
                                    </div>
                                </div>
                            </div>
                            </div> 

                {/* Comments- sections */}

                
              
           </div> 
        )
    }
})





