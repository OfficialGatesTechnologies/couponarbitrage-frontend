

import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
const Login = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Login</title>

        </Head>

        <HeaderIn />
        <div className="container">
            <div className="log-bg">
                <img src="static/images/backgrounds/log-bg.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>Login</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="inner-wrapper full-width">
                <div className=" log-form">
                    <div className="log-form-top">
                        <span className="box-white-line">&nbsp;</span>
                        <h1>Login</h1>
                    </div>
                    <div className="log-form-body full-width">
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input className="input" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" />
                            </div>
                        </div>
                        <div className="login-soc">
                            <p>Or login using</p>
                            <a  title="facebook"><img src="static/images/icons/join-login-fb.png" alt="icon" /></a>
                        </div>
                        <div className="m-t-3">
                            <div className="level">
                                <div className="level-left">
                                    <div className="field">
                                        <div className="control">
                                            <div className="checkbox join-check-wrap">
                                                <label>
                                                    <input type="checkbox" className="fm-check" />
                                                    <span className="cr chck-bor"><i className="cr-icon fas fa-check"></i></span>
                                                    <span className="has-text-black jo-acpt">Remember me</span>
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="level-right">
                                    <button name="signinBut" type="submit" id="signinBut" className="purple-btn" value="login">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="log-form-bot full-width">
                        <Link href="/signup"><a>Sign up</a></Link>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<Link href="/forgot-password"><a>Forgot your password?</a></Link>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
)

export default Login;

