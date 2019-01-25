 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/HeaderIn';
import Footer from '../components/Footer';
import Link from 'next/link';
const Signup = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Signup</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
            <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>Signup</a></Link></li>
                </ul>
            </div>
        </div>
        <div className="container">
        <div className="inner-wrapper full-width">
            <div className="sign-up-form">
                <div className="sign-up-top has-text-centered">
                    <h1>Sign up</h1>
                    <div className="join-via">
                        <p>Join With <Link href="javascript:void(0);"><a><img src="static/images/icons/jo-fb.png"/></a></Link></p>
                    </div>
                </div>
                <div className="sign-form-in">
                    <from>
                    <div className="columns">
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="text" placeholder="First Name"/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="text" placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="text" placeholder="User Name"/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="text" placeholder="Email Address"/>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="password" placeholder="Password"/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="password" placeholder="Verify Password"/>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="tel" placeholder="Phone Number"/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="columns">
                            <div className="column">
                            <div className="control">
                            <input className="input frm-input" type="text" placeholder="Security code"/>
                            </div>
                            </div>
                            <div className="column">
                            <img src="static/images/captcha.jpg"/>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                    <div className="column">
                    <div className="checkbox join-check-wrap">
                    <label>
                        <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check"/>                       
                    <span className="cr"><i className="cr-icon fas fa-check"></i></span>
                    <span className="has-text-black jo-acpt">Accept</span> 
                    <Link href="javascript:void(0);"><a target="_blank" className="jo-trms">Terms and conditions</a></Link>
                    </label>
                    <div className="full-width"><span className="err_msg err_msg_add" id="err_termsCond"></span></div>
                    </div>
                    </div>
                    </div>
                    <div className="columns">
                        <div className="sign-bot column has-text-centered">
                        <button className="is-btn-smt">Submit</button>
                        <Link href="/login"><a>Return to Login?</a></Link>
                        </div>
                    </div>
                    </from>
                </div>
            </div>
        </div>
        </div>

         <Footer />
    </div>
  )

export default Signup;

