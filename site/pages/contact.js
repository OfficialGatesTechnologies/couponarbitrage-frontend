 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';

const Contact = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Contact</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
            <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>Contact Us</a></Link></li>
                </ul>
            </div>
        </div>
        <div className="container">
        <div className="inner-wrapper full-width">
            <div className="sign-up-form pd-b-40">
                <div className="sign-up-top has-text-centered">
                    <h1>Get in Touch</h1>
                    <div className="join-via">
                    <div className="cnct-via">
                            <div className="mob-type">
                                <img src="static/images/icons/whats-app.png" alt="i" />
                                <span>+44 7784 449531</span>
                            </div>
                            <div className="mob-type mail-type">
                                <img src="static/images/icons/mail-box.png" alt="i" />
                           <Link href="mailto:support@couponarbitrage.com"><a><span>support@couponarbitrage.com</span></a></Link> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sign-form-in">
                    <from>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <input className="input frm-input" type="text" placeholder="Your Name"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                <input className="input frm-input" type="text" placeholder="Email Address"/>
                                </div>
                            
                            </div>
                            <div className="field">
                                <div className="control">
                                <input className="input frm-input" type="text" placeholder="Subject"/>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                        <div className="field">
                            <div className="control">
                                <textarea className="input frm-textarea" type="text" name="message" placeholder="Your Message" cols="40" rows="3" ></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                            
                            </div>
                        </div>
                            
                        </div>
                        
                    </div>
                    
                    <div className="columns">
                        <div className="sign-bot column has-text-centered">
                        <button className="is-btn-smt">Send Message</button>
                       
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

export default Contact;

