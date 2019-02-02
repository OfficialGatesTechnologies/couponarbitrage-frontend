import Link from 'next/link';
import '../styles/styles.scss';


const Footer = () => (      
    <div>
    <footer className="footer full-width">
            <div className='container'>
                <div className='columns'>
                    <div className='column is-5 is-mobile-12'>                    
                        <h3 className="Foot-Title has-text-weight-bold">Stay up to date</h3>  
                        <h4 className="Foot-Des">and get the latest informations <br/>from Coupon Arbitrage</h4>
                        <div className="level is-desktop">
                        <ul className="level-left">
                        <li className="level-item">
                            <Link href="https://www.facebook.com/Couponarb/">
                        <a className="icon theme-txt-color" title="facebook" target="_blank">
                            <i className="fab fa-facebook-f"></i>
                            </a>
                            </Link>
                        </li>
                        <li className="level-item">
                        <Link href="https://twitter.com/Couponarbitrage">
                        <a className="icon theme-txt-color" title="Twitter">
                            <i className="fab fa-twitter"></i>
                            </a>
                            </Link>
                        </li>
                        <li className="level-item">
                        <Link href="https://www.instagram.com/?hl=en">
                        <a className="icon theme-txt-color" title="Instagram">
                            <i className="fab fa-instagram"></i>
                            </a>
                            </Link>
                        </li>
                        <li className="level-item">
                        <Link href="https://plus.google.com/u/0/b/116618093978931924144/116618093978931924144/posts">
                        <a className="icon theme-txt-color" title="Google Plus">
                            <i className="fab fa-google-plus-g"></i>
                            </a>    
                            </Link>
                        </li>
                        </ul>
                        </div>
                        <div className="search-box">
                        <div className="field has-addons">
                            <div className="control"><input className="input form-control" type="text" placeholder="Enter your email address"/></div>
                            <div className="control"><a className="button is-info is-info-cus">OK</a></div>
                        </div>
                            </div>
                    </div>
                    <div className='column is-7 is-mobile-12'>
                    <h3 className="Foot-Title has-text-weight-bold">Quick links</h3>
                        <div className='columns is-mobile foot-menu'>
                            <div className='column is-4'>
                                <ul>                                
                                <li> <Link href='/about'><a >About us</a></Link></li>
                                <li>  <Link href='/contact'><a >Contact us</a></Link></li>
                                <li><Link href='/signup'><a >Register now</a></Link></li>
                                </ul>         
                            </div>  
                            <div className='column is-4' >
                            <ul>                                
                            <li><Link href='/privacy'><a >Privacy policy</a></Link></li>
                            <li> <Link href='/faq'><a >FAQs</a></Link></li>
                            <li>  <Link href='/sitemap'><a >Site map</a></Link></li>
                            </ul>     
                            </div>
                            <div className='column is-4' >
                            <ul>                                
                            <li> <Link href='/terms'><a >Terms & Condition</a></Link></li>
                            <li> <Link href='/disclaimer'><a >Disclaimer</a></Link></li>
                            </ul>     
                            </div>  
                        </div>    
                    </div>                      
                </div>
                <div className="columns">
                    <div className="column">
                    <div className="footer-bot full-width">
                    <h3>Main partners</h3>
                    <div className="level is-desktop is-block">
                        <ul className="level-left sm-block">
                        <li className="level-item">
                       
                        <span>
                        <Link href='http://www.gambleaware.co.uk/'>
                        <a ><img src="/static/images/others/partner-01.png" alt="IMG" title="gambleaware.co.uk" /></a>
                        </Link>
                        </span>
                         
                        </li>
                            <li className="level-item">
                            <span>
                            <Link href='http://www.ibas-uk.com/'><a><img src="/static/images/others/partner-02.png" alt="IMG" title="ibas-uk.com" /></a></Link>
                            </span>
                            
                            </li>
                            <li className="level-item">
                            <span>
                            <Link href='http://gamcare.co.uk/'><a><img src="/static/images/others/partner-03.png" alt="IMG" title="gamcare.co.uk" /></a></Link>
                            </span>
                            </li>
                            <li className="level-item">
                            <span>
                            <Link href='http://certify.gpwa.org/verify/couponarbitrage.com/'><a><img src="/static/images/others/partner-04.png" alt="IMG" title="gpwa" /></a></Link>
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
                    </div>
                </div>
            </div>   
            
        </footer>
    </div> 
    
)  



export default Footer;