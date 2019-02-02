 
 
import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';

const forgotPassword = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Forgot Password</title>
             
        </Head>
        <HeaderIn />
        <div className="container">
            <div className="log-bg">
            <img src="static/images/backgrounds/log-bg.jpg"/>
                <div className="inner-ban-txt">
                    <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="javascript:void(0);"><a>Forgot your password?</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="inner-wrapper full-width">
            <div className=" log-form">
                <div className="log-form-top">
                <span className="box-white-line">&nbsp;</span>
                    <h1>Forgot your password?</h1>
                </div>
                <div className="log-form-body full-width">
                <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                        <input className="input" type="email"/>
                    </div>
                    </div>
                   
                    <div className="m-t-3">
                    <div className="level sign-bot">
                    <div className="level-left">
                    <Link href="/login"><a className="m-t-0">Return to Login?</a></Link>
                    </div>
                    <div className="level-right">
                    <button name="signinBut" type="submit" id="signinBut" className="purple-btn" value="login">Submit</button>
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

export default forgotPassword;

