 
 
import Head from 'next/head';
import {site_name} from '../utils/Common';
import Link from 'next/link';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
const SharbingSoftware = (props) => (
   
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Sharbing Software</title>
             
        </Head>

        <body data-spy="scroll" data-target="#main-navbar">
            <div id="page" className="page">
            <header>
            <nav className="head-nav navbar is-shadowless is-fixed-top pd-tb-10" role="navigation" aria-label="main navigation" style={{backgroundColor:'#020042' , color: '#fff'}}>
                <div className="container">
                
                    <div className="navbar-brand navbar-start">
                    <Link href="/">
                    <a className="max-log-img shar-logo">
                        
                        <img src="static/images/logo-dark.png"/>
                    </a></Link>
                        

                        <a role="button" className="navbar-burger burger sm-menu shar-sm-menu has-text-white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    
                    <div id="navbarBasicExample" className="navbar-menu shar-menu-nav">
                    
                        <div className="navbar-end is-uppercase sharb-nav">
                        <ul>
                        <li className="active"><Link href="#home"><a className="navbar-item">Home</a></Link></li>
                        <li className=""><Link href="#Key-Features"><a className="navbar-item">Key Features</a></Link></li>
                        <li className=""><Link href="#Simple-Price"><a className="navbar-item">Simple Price</a></Link></li>
                        <li className=""> <Link href="#FAQs"><a className="navbar-item">FAQ's</a></Link> </li>                       
                        <li className=""> <Link href="#Subscribe"><a className="navbar-item">Subscribe Now</a></Link></li>
                        <li className=""> <Link href="/login"><a className="navbar-item">Sign in</a></Link></li>
                        </ul>
                        
                        
                       
                        </div>
                    </div>
                    </div>
                </nav>
                
            </header>
            <section id="home" className="sharb-home-wrap home-app">
                <div className="overlay">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-7">
                                <div className="home-intro-left">
                                    
                                    <div className="intro-wrap">
                                      

                                        <h1>No.1 Sports Arbitrage App</h1>
                                        <h4>Our arbitrage software scans all the major bookies and exchanges and provides you with shop arbs, online arbs and odds comparison across a range of markets on multiple platforms.</h4>
										<ul style={{color: '#fff'}}>
						<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i>
 Shop Arbs </li>
						<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i>
 Odds Comparison </li>
						<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i>
 Cross Platform – Web, iOS and Android</li>
						<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i>
 Built in Calculators</li>
						<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i>
 Chat with other members</li>
											
										</ul>
										<br/>
										<Link href="#Simple-Price">
                                        <a id="subscribe-button" className="button green-btn is-large has-text-weight-normal is-rounded">Subscribe Now <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
</a>
                                        </Link>
                                       
                                        <div className="home-button">
                                        <Link href="#">
                                        <a ><img src="/static/images/apple-btn.png" alt="" /></a>
                                        </Link> 
                                           <Link href="//bit.ly/1XYkJEt">
                                           <a><img src="/static/images/android-btn.png" alt=""/></a>
                                           </Link> 

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-5">
                                <div className="intro-wrap intro-img-mobile">
                                    <img src="/static/images/mobile.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="Key-Features" className="sections-sharb has-text-grey has-text-weight-light">
                <div className="container">
                    <div className="coloricon">

                        <div className="heading sharb wow fadeIn animated is-inline-block is-fullwidth" data-wow-offset="120" data-wow-duration="1.5s">
                            <div className="title text-center has-text-grey">
                                <h1 className="has-text-weight-light">Key Features</h1>
                            </div>
                            <div className="subtitle text-center ">
                                <h5>We provide a range of benefits for our subscribers</h5>
                            </div>
                            <div className="separator_wrap"> 
                                <div className="separator2"></div>
                            </div>
                        </div>
                    <div className="columns is-multiline">
                        <div className="column">
                            <div className="service text-center wow fadeInLeft animated" data-wow-offset="120" data-wow-duration="1.5s">
                                <i className="fa fa-check-square"></i>
                                <h4>Shop Arbs</h4>
                                <p>
                                    As the only provider of UK shop arbs (sharbs) we pride ourselves in the quality of our service and the extensive coverage of markets from match results to correct score and HT/FT.
                                </p>
                            </div>
                        </div>

                        <div className="column">

                            <div className="service text-center wow fadeIn animated" data-wow-offset="120" data-wow-duration="1.5s">
                                <i className="fa fa-check-square"></i>
                                <h4>Online Odds</h4>
                                <p>
                                    Covering online odds allows you to compare the bookmaker online price against the coupon price. You can use this area of our service for either arbing online or for taking advantage of arbitrage opportunities in-shop.
                                </p>
                            </div>
                        </div>

                        <div className="column">
                            <div className="service text-center wow fadeInRight animated" data-wow-offset="120" data-wow-duration="1.5s">
                                <i className="fa fa-check-square"></i>
                                <h4>Odds comparison</h4>
                                <p>
                                    Provision of odds comparison for all the top competitions and all the top bookmakers. Stay up-to-date with the latest odds and movements.
                                </p>
                            </div>
                        </div>
						
                        <div className="column">
                            <div className="service text-center wow fadeInRight animated" data-wow-offset="120" data-wow-duration="1.5s">
                                <i className="fa fa-check-square"></i>
                                <h4>Cross Platform</h4>
                                <p>
                                    Whether you have an iOS device, an Android device or want to simply access our service via the web, we have the solution to fit your requirements.
                                </p>
                            </div>
                        </div>
    				</div>
						
                    </div>
                </div>
            </section>
            <section id="features" className="sections-sharb has-text-grey has-text-weight-light">
                <div className="container">
                    <div className="coloricon">

                        <div className="heading sharb wow fadeIn animated is-inline-block is-fullwidth" data-wow-offset="120" data-wow-duration="1.5s">
                            <div className="title text-center has-text-grey">
                                <h1 className="has-text-weight-light">Exclusive Features</h1>
                            </div>
                            <div className="subtitle text-center ">
                                <h5>Our app has extensive features and functionality allowing you to focus on what counts – making money.</h5>
                            </div>
                            <div className="separator_wrap"> 
                                <div className="separator2"></div>
                            </div>
                        </div>

						
                    </div>
                    <div className="columns is-multiline">
                    <div className="column wow fadeInLeft animated" data-wow-offset="10" data-wow-duration="1.5s">
                               
                                <div className="feature-items">
                                   
                                    <div className="feature-icon">
                                    <i className="far fa-money-bill-alt"></i>
                                    </div>

                                    <h5>Simple Pricing</h5>
                                    <p>
                                        Your subscription covers all features on the app
                                    </p>
                                </div>
                               
                                <div className="feature-items">
                                   
                                    <div className="feature-icon">
                                   
                                        <i className="features-icon fas fa-desktop"></i>
                                    </div>

                                    <h5>Ultra-responsive</h5>
                                    <p>
                                        One subscription allows access to iOS, Android &amp; Web.
                                    </p>
                                </div>
                               
                                <div className="feature-items">

                                   
                                    <div className="feature-icon">
                                        <i className="features-icon fas fa-mobile-alt"></i>
                                    </div>

                                    
                                    <h5>Push notifications</h5>
                                    <p>
                                        Receive notifications to your phone each time a new arb is found.
                                    </p>
                                </div>
                               

                            </div>
                            <div className="column">
                                <div className="features-img wow bounceIn animated" data-wow-offset="120" data-wow-duration="1.5s">
                                    <img src="/static/images/calendar_mockup1.png" alt="App Feature Image" />
                                </div>
                            </div>
                            <div className="column features-right wow fadeInRight animated" data-wow-offset="10" data-wow-duration="1.5s" >

                               
                                <div className="feature-items">

                                  
                                    <div className="feature-icon">
                                        <i className="features-icon far fa-lightbulb"></i>
                                    </div>

                                    <h5>Converted Odds</h5>
                                    <p>
                                        Online arbs and shop arbs presented in fractional &amp; decimal format
                                    </p>
                                </div>
                               
                                <div className="feature-items">
                                  
                                    <div className="feature-icon">
                                        <i className="features-icon fa fa-calculator"></i>
                                    </div>

                                    <h5>Arbitrage calculators</h5>
                                    <p>
                                        Integrated with each arb delivered, saving precious time.
                                    </p>

                                </div>
                               
                                <div className="feature-items">
                                    
                                    <div className="feature-icon">
                                        <i className="features-icon fa fa-comments"></i>
                                    </div>

                                    <h5>Chat</h5>
                                    <p>
                                        Share information and advice with other members
                                    </p>
                                </div>  

                            </div>
                    </div>
                </div>
            </section>

            <section id="describe" className="sections-sharb has-text-grey has-text-weight-light">
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column">
                            <div className="text-center describe-images wow fadeInRight" data-wow-offset="10" data-wow-duration="1.5s">
							<br/><br/>
                                <img src="/static/images/training_mockup.png" alt="" />
                            </div>
                        </div>

                        <div className="column">


                            <div className="heading-left black-text wow fadeIn" data-wow-offset="120" data-wow-duration="1.5s" >
                                <div className="title-half"><h2>Extensive coverage of markets</h2></div>
                                <div className="separator_wrap-left"> <div className="separator2"></div></div>
                            </div>

                            <div className="describe-details wow fadeInLeft" data-wow-offset="10" data-wow-duration="1.5s">
                                <p className="mg-b-30">
                                    Our app provides extensive coverage of football market shop arbs. Essentially, any betting markets that are offered on a football match on a shop based football coupon will be searched for sharbs and delivered by our software.                                
                                </p>

                                <div className="describe-list">
                                    <div className="describe-list-icon">
                                        <i className="fab fa-gg"></i>
                                    </div>
                                    <div className="describe-list-content">
                                        <h5>Shop arbs </h5>
                                        <p>We have a team working all hours collecting and uploading all the odds from bookmaker shops. We enter odds from all the betting markets shown on coupons including Match Result, Both Teams to Score, HT/FT, Under/Over Goals, Correct Score, Win to Nil, Match Odds &amp; BTTS and any other markets we can find in bookmaker shops.</p>
                                    </div>

                                </div>
                                <div className="describe-list">
                                    <div className="describe-list-icon">
                                        <i className="far fa-object-ungroup"></i>
                                    </div>
                                    <div className="describe-list-content">
                                        <h5>Odds comparison</h5>
                                        <p>Online odds are presented by scanning bookmakers’ websites and all the major leagues and matches. Our focus is on delivering high quality sharbs. However, the odds comparison section is a useful addition for you to check for online arbs or general comparison.</p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section id="Simple-Price" className="price-1 sections sections-sharb">
				<div id="Subscribe"></div>
                <div className="container">
                    

                        
                    <div className="heading sharb wow fadeIn animated is-inline-block is-fullwidth" data-wow-offset="120" data-wow-duration="1.5s">
                            <div className="title text-center has-text-grey">
                                <h1 className="has-text-weight-light">Simple Pricing Plans</h1>
                            </div>
                            <div className="subtitle text-center ">
                                <h5>Choose from our weekly, monthly, half yearly or annual subscriptions with buit in discounts for longer periods.</h5>
                            </div>
                            <div className="separator_wrap"> 
                                <div className="separator2"></div>
                            </div>
                        </div>
                        <div className="columns is-multiline">
                        <div className="column">
                            <div className="db-wrapper">
                                <div className="pricing-table">
                                <ul>
                                <li className="price">
                                <i className="far fa-gem"></i>1 Week -  £ 19.00</li>                                      
                                        
                                <li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Shop Arbs</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Odds Comparison</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Bookmakers</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Markets</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Member Chat</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Web, iOS and Android</li>

                                    </ul>
                                    <div className="pricing-footer">
    
                    <Link href="">
                    <a className="button green-btn is-medium is-fullwidth has-text-weight-normal is-success is-rounded btnxs btn-md btn-subs-hide" disabled>Subscribe Now <i className="fa fa-cart-arrow-down" ></i></a>
                    </Link>
                                        
                                            <p style={{color: 'red'}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="db-wrapper">
                                <div className="pricing-table">
                                <ul>
                                <li className="price">
                                <i className="far fa-gem"></i>1 Month -  £ 49.00</li>                                      
                                        
                                <li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Shop Arbs</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Odds Comparison</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Bookmakers</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Markets</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Member Chat</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Web, iOS and Android</li>

                                    </ul>
                                    <div className="pricing-footer">
    
                    <Link href="">
                    <a className="button green-btn is-medium is-fullwidth has-text-weight-normal is-success is-rounded btnxs btn-md btn-subs-hide" disabled>Subscribe Now <i className="fa fa-cart-arrow-down" ></i></a>
                    </Link>
                                        
                                            <p style={{color: 'red'}}>35% Discount</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="db-wrapper">
                                <div className="pricing-table">
                                <ul>
                                <li className="price">
                                <i className="far fa-gem"></i>6 Month -  £ 299.00</li>                                      
                                        
                                <li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Shop Arbs</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Odds Comparison</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Bookmakers</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Markets</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Member Chat</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Web, iOS and Android</li>

                                    </ul>
                                    <div className="pricing-footer">
    
                    <Link href="">
                    <a className="button green-btn is-medium is-fullwidth has-text-weight-normal is-success is-rounded btnxs btn-md btn-subs-hide" disabled>Subscribe Now <i className="fa fa-cart-arrow-down" ></i></a>
                    </Link>
                                        
                                            <p style={{color: 'red'}}>45% Discount</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="db-wrapper">
                                <div className="pricing-table">
                                <ul>
                                <li className="price">
                                <i className="far fa-gem"></i>1 Year -  £ 499.00</li>                                      
                                        
                                <li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Shop Arbs</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Odds Comparison</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Bookmakers</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> All Markets</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Member Chat</li>
					<li><i className="fa fa-check" aria-hidden="true" style={{color: '#41a940'}}></i> Web, iOS and Android</li>

                                    </ul>
                                    <div className="pricing-footer">
    
                    <Link href="">
                    <a className="button green-btn is-medium is-fullwidth has-text-weight-normal is-success is-rounded btnxs btn-md btn-subs-hide" disabled>Subscribe Now <i className="fa fa-cart-arrow-down" ></i></a>
                    </Link>
                                       
                                            <p style={{color: 'red'}}>55% Discount</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                
            </section>
            
            <section id="testmonial" className="testimonial">

                <div className="overlay-img">
                    <div className="container">
                    <div className="heading sharb wow fadeIn animated" data-wow-offset="120" data-wow-duration="1.5s">
                    <div className="title text-center has-text-grey"><h1 className="has-text-weight-light has-text-white">Testimonials</h1></div>

                                <div className="separator_wrap"> <div className="separator2"></div></div>
                            </div>
                        <div className="columns is-mobile is-centered">

                           
                            <div className="testimonialslide">
                                <div className="column is-10 is-offset-1">
                                <div className="carousel carousel-animated carousel-animate-slide">
                                <div className="carousel-container">
                                <ul className="control-dots">
                                        <li className="dot" value="0" role="button" tabindex="0"></li>
                                        <li className="dot" value="1" role="button" tabindex="0"></li>
                                        <li className="dot selected" value="2" role="button" tabindex="0"></li>
                                        <li className="dot" value="3" role="button" tabindex="0"></li>
                                    </ul>
                                    <div className="carousel-item has-background is-active">
                                    
                                    <div className="testimonialitem">
                                                        <p>I must say the whole app is very sleek and impressive. The speed and reliability of the sharbs provided has saved me tons of time searching manually – money well spent.</p>
                                                        <h3>- J. Forshaw -</h3>
                                                    </div>
                                    </div>
                                    <div className="carousel-item has-background">
                                    <div className="testimonialitem">
                                                        <p>There are so many arbitrage alert programs out there but your sharbing app definitely offers something unique. I’ve made my subscription cost back in one day of sharbing!</p>
                                                        <h3>- E. Chandler -</h3>
                                                    </div>
                                    </div>
                                    <div className="carousel-item has-background">
                                    <div className="testimonialitem">
                                                        <p>Loving this app! Shop arb section is brilliant…only wish you could add more sports</p>
                                                        <h3>- L. Harrison -</h3>
                                                    </div>
                                    </div>
                                    <div className="carousel-item has-background">
                                    <div className="testimonialitem">
                                                        <p>Loving this app! Shop arb section is brilliant…only wish you could add more sports</p>
                                                        <h3>- L. Harrison -</h3>
                                                    </div>
                                    </div>
                                </div>
                                <div className="carousel-navigation">
                                    <div className="carousel-nav-left">
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    </div>
                                    <div className="carousel-nav-right">
                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </div>
                                   
                                       
                                </div>
                                </div>


                                    {/* <div className="carousel carousel-animated carousel-animate-slide" >
                                    <div className="carousel-container">
                                    <ul className="control-dots">
                                        <li className="dot" value="0" role="button" tabindex="0"></li>
                                        <li className="dot" value="1" role="button" tabindex="0"></li>
                                        <li className="dot selected" value="2" role="button" tabindex="0"></li>
                                        <li className="dot" value="3" role="button" tabindex="0"></li>
                                    </ul>
                                       

                                        
                                        <div className="carousel-inner" role="listbox">
                                           
                                                <div className="carousel-item is-active">


                                                    <div className="testimonialitem">
                                                        <p>I must say the whole app is very sleek and impressive. The speed and reliability of the sharbs provided has saved me tons of time searching manually – money well spent.</p>
                                                        <h3>- J. Forshaw -</h3>
                                                    </div>

                                               
                                            </div>

                                         
                                                <div className="carousel-item">


                                                    <div className="testimonialitem">
                                                        <p>There are so many arbitrage alert programs out there but your sharbing app definitely offers something unique. I’ve made my subscription cost back in one day of sharbing!</p>
                                                        <h3>- E. Chandler -</h3>
                                                    </div>

                                                </div>
                                           

                                           
                                                <div className="carousel-item">

                                                    <div className="testimonialitem">
                                                        <p>Loving this app! Shop arb section is brilliant…only wish you could add more sports</p>
                                                        <h3>- L. Harrison -</h3>
                                                    </div>

                                                </div>
                                         
                                           
                                                <div className="carousel-item">

                                                    <div className="testimonialitem">
                                                        <p>I would highly recommend subscribing to this service. The great thing about shop arbing is the arb percentage gains are higher so you do not need as much capital.</p>
                                                        <h3>- J. Berg -</h3>
                                                    </div>

                                                </div>
                                            
                                        </div>
                                        </div>
                                    </div> */}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </section>
            
            <section id="FAQs" className="sections-sharb has-text-grey has-text-weight-light">
                <div className="container">
                    <div className="row">

                    <div className="heading sharb wow fadeIn animated is-inline-block is-fullwidth" data-wow-offset="120" data-wow-duration="1.5s">
                            <div className="title text-center has-text-grey">
                                <h1 className="has-text-weight-light">FAQ</h1>
                            </div>
                            <div className="subtitle text-center ">
                                <h5>Below you find a selection of the most commonly asked questions.</h5>
                            </div>
                            <div className="separator_wrap"> 
                                <div className="separator2"></div>
                            </div>
                        </div>
                        

                    <div className="custom_panel sharbing_panel has-text-weight-light">
                    <Accordion allowZeroExpanded>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Which bookmakers/exchanges are supported for shop arbs?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    Currently we provide sharbs for the following bookmakers:  Betfred, Coral, David Pluck, Ladbrokes, Paddy Power and William Hill. We search for sharbs between these bookmakers and the following exchanges: Betfair, Matchbook, Smarkets.
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        What markets are covered on your service?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                    Match Result, Both Teams to Score, HT/FT, Under/Over Goals, Correct Score, Win To Nil, 1st Goalscorer, Match Odds & BTTS and any other markets we can find in bookmaker shop coupons.
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Do you offer a free trial?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                    Unfortunately not – As we are limiting the number of subscribers, we will not be offering free trials to the app. You can try our service for 1 week for £19.
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        How can I pay for my subscription?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                    We accept Paypal or Skrill payments. All payments are made securely.
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Will you teach me how to do shop arbs or sports arbitrage in general?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                    Unfortunately we do not have the resources to spend time teaching you how to arb. You will find some useful articles in our ‘Learn Sports Arbitrage’ section but we cannot offer one-to-one training for free. Our service was designed to help existing sharbers or those with a basic knowledge to optimise their time and profits by removing the need to manually collect, compare and find arbs on bookmaker shop coupons.
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                        Do you limit the number of subscribers?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                    <div className="maintabdiv">
                                    We are very strict in only allowing 30 members at any one time in order to maintain value for everyone. If you subscribe now but all our places are full, your access to the sharbs will be activated once the next slot becomes available. Please contact us first if you want to enquire about availability.
                                    </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                </Accordion>
                        

</div>

						
	
                    </div>
                </div>
                <div className="clear"></div>
            </section>
            
            <footer id="Subscribe-Now">
                <div className="footer-1-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 text-center social">
                               <Link href="#Simple-Price"><a id="subscribe-button" className="button green-btn is-large has-text-weight-normal is-rounded">Subscribe Now <i className="fa fa-cart-arrow-down" aria-hidden="true"></i></a></Link>
							   
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
            </div>
            <div className="modal fade" id="myModal" role="dialog" >
        <div className="modal-dialog sub-pop-dialog" style={{background: '#f47429'}}>
            
            <div className="modal-content sub-pop-content arb-content">
                <div className="modal-header sub-pop-head">
                    
                    <a data-dismiss="modal"><img src="/static/images/others/close-icon.png" alt="close"/></a>
                </div>
                <div className="modal-body sub-pop-body columns">
                    <div className="sub-body-left column is-3">
                        <img src="/static/images/others/mobile.png" alt="mobile" />
                    </div>
                    <div className="sub-body-right arb-body sharb-body column is-9">
                        <h3>SHARBING SOFTWARE APP</h3>
                                                <div className="bot-line">&nbsp;</div>
                        <p>For your information</p>
                        <p>The maximum number of subscribers has now been reached so unfortunately in order to continue providing value for our existing subscribers we cannot take any more subscribers until further spots become available.</p>
                        <p>If you wish to be kept informed as to when a spot becomes available please leave your details below.</p>
                                                 
                         <div className="sharb-txt-box full-width">
                                <div className="form-group field">
                                    <input type="text" className="input" name="user_intrested_name" id="user_intrested_name" placeholder="Name" />
                                    <span id="err_user_intrested_name" className="err_msg" style={{color: 'white'}}></span>
                                </div>
                                <div className="form-group field">
                                    <input type="text" className="input" name="user_intrested_email" id="user_intrested_email" placeholder="Email address" />
                                    <span id="err_user_intrested_email" className="err_msg" style={{color: 'white'}}></span>
                                </div>
                        <div className="cashbk-btn arb-btn sharb-btn">
                        <div className="sub-cashbk-btn">
                            <button type="submit" name="intrestBtn" id="intrestBtn"  value="true" className="button green-btn font  has-text-weight-normal is-rounded">CONFIRM</button>
                        </div>
                                              </div>
                    </div>
                    
                </div>
            </div>

        </div>
    </div></div>
        </body>
         
    </div>
                                
  )
                               

export default SharbingSoftware;

