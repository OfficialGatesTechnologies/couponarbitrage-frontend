import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import Link from 'next/link';

const BettingSharbs = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Betting Sharbs</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="log-bg is-fullwidth innerban-img">
                <img src="/static/images/banner/banner-img-free-arbs.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>Abr Interface</a></Link></li>
                    </ul>
                </div>
            </div>
            {/* <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>Abr Interface</a></Link></li>
                </ul>
            </div> */}
        </div>
        
        <div className="inner-wrapper">
        <div className="container">
        <div className="box-section mg-t0">
            <div className="fwid box-sec-01">
                <div className="row-same-height columns is-variable is-0">
                    <div className="column is-12 hero is-medium is-bold bg-green colors-box is-relative">
                        
                            <div className="fwid two-box"> <span className="box-white-line">&nbsp;</span>
                                <h2 className="box-head">Arb Interface</h2>
                                
                            </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="fwid learn-boxs learn-list mg-t-40">
            <div className="bg-white colors-box">
                <div className="bread-crumbs-wrap">
                    <div className="fwid two-box bread-crumbs">
                        
                        <div className="fwid texts-box">
                            <div className="fwid free-arbs-menus mg-t-30 mg-b-30">
                                <ul role="tablist" className="no-style clearfix">
                                    <li className="" role="presentation"><Link href="/betting-odds-comparison"><a title="Odds Comparison">Odds Comparison</a></Link></li>
                                    <li className="active" role="presentation"><Link href="/betting-sharbs"><a title="Sharbs">Sharbs</a></Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="tab-top mg-t-30">
            <div className="bg-white pd-30">
            <div className="columns is-multiline">
            <div className="column is-4">
                <div className="field">
                    <label className="label">Sort By</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option value="League Name">League Name</option>
                            <option value="Arb %">Arb %</option>
                            <option value="Event Date">Event Date</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
                    <label className="label">Sort Order</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option value="Descending">Descending</option>
                            <option value="Ascending">Ascending</option>
                          
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="column is-4">
            <div className="field">
                    <label className="label">Min</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option selected="selected" value="0">0 %</option>
                            <option value="0.5">0.5 %</option>
                            <option value="1">1 %</option>
                            <option value="2">2 %</option>
                            <option value="3">3 %</option>
                            <option value="4">4 %</option>
                            <option value="5">5 %</option>
                          
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
                    <label className="label">Max</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                        <option value="0">0 %</option>
                        <option value="1">1 %</option>
                        <option value="2">2 %</option>
                        <option value="3">3 %</option>
                        <option value="5">5 %</option>
                        <option value="7">7 %</option>
                        <option value="10">10 %</option>
                        <option selected="selected" value="100">100 %</option>
                          
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
                    <label className="label">Settled in</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="7">7 days</option>
                            <option value="30">30 days</option>
                            <option selected="selected" value="all">All</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            <span className="cus-pd-check">
            <input className="is-checkradio" id="AlertAbove" type="checkbox" name="exampleCheckbox" />
                <label htmlFor="AlertAbove" className="label">Alert Above</label>

            </span>
              
             
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option value="0.40">0.40</option>
                            <option value="0.30">0.30</option>
                            <option value="0.20">0.20</option>
                            <option value="0.10">0.10</option>
                            <option selected="selected" value="0.00">0.00</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            <span className="cus-pd-check">
            <input className="is-checkradio" id="AutoRefresh" type="checkbox" name="exampleCheckbox" />
                <label for="AutoRefresh" className="label">Auto Refresh</label>

            </span>
              
             
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                        <option value="15">15 sec</option>
                        <option value="30">30 sec</option>
                        <option selected="selected" value="45">45 sec</option>
                        <option value="60">1 min</option>
                        <option value="120">2 mins</option>
                        <option value="300">5 mins</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            
                <label  className="label">Select Betfair Commission %</label>

                    <div className="control">
                    <div className="select full-width">
                    <select className="full-width">
                            <option value="4.6">4.6</option>
                            <option value="4.7">4.7</option>
                            <option value="4.8">4.8</option>
                            <option value="4.9">4.9</option>
                            <option selected="selected" value="5.0">5.0</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            
                <label  className="label">Select Matchbook Commission %</label>

                    <div className="control">
                    <div className="select full-width">
                    <select className="full-width">
                            <option value="0.4">0.4</option>
                            <option value="0.3">0.3</option>
                            <option value="0.2">0.2</option>
                            <option value="0.1">0.1</option>
                            <option selected="selected" value="1.0">1.0</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            
                <label className="label">Select SMarkets Commission %</label>

                    <div className="control">
                    <div className="select full-width">
                    <select className="full-width">
                            <option value="0.4">1.6</option>
                            <option value="0.3">1.7</option>
                            <option value="0.2">1.8</option>
                            <option value="0.1">1.9</option>
                            <option selected="selected" value="1.0">2.0</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
            <div className="field">
            
                <label className="label">Bookmaker Filter</label>

                    <div className="control">
                    <div className="select full-width">
                    <select className="full-width">
                            <option value="">All</option>
                            <option value="Coral">Coral</option>
                            <option value="William Hill">William Hill</option>
                            <option value="Paddy Power">Paddy Power</option>
                            <option value="David Pluck">David Pluck</option>
                            <option value="Ladbrokes">Ladbrokes</option>
                            <option value="Betfred">Betfred</option>
                    </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-2">
            <div className="field">
            
                <label className="label">Calculation Format</label>

                    <div className="control">
                    <div className="select full-width">
                    <select className="full-width">
                        <option value="1">Real Arbitrage %</option>
                        <option value="2">Profit on Stake %</option>
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className="column is-2">
            <div className="field text-right cus-btn-pos">
            <div className="control">
            <input type="submit" name="calculateArb" id="calculateArb" value="Update" className="green-btn normal-btn"></input>   
            </div>
            
            </div>
            </div>
            </div>

            </div>
        </div>
        <div className="tab-top mg-t-30">
        <label className="has-text-black">Last Updated: 12/02/2019 07:26:06</label>
    <table className="dashtop-data table is-striped m-b-0" style={{width: '100%'}}>
        <thead>
            <tr>
                <th >Event</th>
                <th >Arb Type</th>
                <th >Selection</th>
                <th >Bookmaker 1</th>
                <th >Bookmaker 2</th>
                <th >Arb %</th>
                <th>
                    <div className="counter-sharbs">
                    <Link href=""><a><img src="/static/images/icons/icon-ball.png" alt="ball" />
                    <span className="counts">0</span></a></Link>
                    
                    </div>
                </th>
                
            </tr>
        </thead>
        
    </table>
    <div className="bg-white pd-30">
        <div className="text-center">No Matches Found!</div>
    </div>
    
</div>  
            
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default BettingSharbs;

