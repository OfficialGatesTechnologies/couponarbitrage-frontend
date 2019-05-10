import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';

const BettingOddComparison = (props) => (
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
                                    <li className="active" role="presentation"><Link href="/betting-odds-comparison"><a title="Odds Comparison">Odds Comparison</a></Link></li>
                                    <li className="" role="presentation"><Link href="/betting-sharbs"><a title="Sharbs">Sharbs</a></Link></li>
                                    
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
            <div className="column is-6">
            <div className="columns">
            <div className="column is-8">
            <div className="field">
                    <label className="label">Search</label>
                    <div className="control">
                    <input className="input" type="text"></input>
                    </div>
                </div>
            </div>
            
                <div className="column is-4">
                <div className="field text-right cus-btn-pos-flex-start">
                    <div className="control">
                        <input type="submit" name="calculateArb" id="calculateArb" value="Search" className="green-btn normal-btn in-150"></input>   
                    </div>
                
                </div>
                </div>
               
            </div>
            <div className="columns">
            <div className="column is-8">
            <div className="field">
                    <label className="label">Sort Leagues By</label>
                    <div className="control">
                    <div className="select full-width">
                        <select className="full-width">
                            <option value="select">-- Select --</option>
                            <option value="asc">Ascending</option>
                            <option value="dsc">Descending</option>
                            
                        </select>
                    </div> 
                    </div>
                </div>
            </div>
            
                <div className="column is-4">
                <div className="field text-right cus-btn-pos-flex-start">
                    <div className="control">
                    <input type="submit" name="calculateArb" id="calculateArb" value="Reset Search" className="green-btn normal-btn"></input>  
                    </div>
                
                </div>
                </div>
               
            </div>   
            </div>
            
            <div className="column is-6">
            <div className="pd-30 d-is-inline-block is-fullwidth">
            <div className="columns">
            <div className="column is-8">
                <div className="field">
                    
                    <label className="label has-text-grey">The Best Odds Are</label>
                        
                </div>
            </div>
            
            <div className="column is-4">
                <label className="label"><u>Bold</u></label>
            </div>
               
            </div> 
            <div className="columns">
            <div className="column is-8">
                <div className="field">
                    
                    <label className="label has-text-grey">Odds Shortening</label>
                        
                </div>
            </div>
            
            <div className="column is-4">
                <label className="label"><span className="bg-shar-le-box shortening-odds is-inline-block"></span></label>
            </div>
               
            </div>
            <div className="columns">
            <div className="column is-8">
                <div className="field">
                    
                    <label className="label has-text-grey">Odds Lengthening</label>
                        
                </div>
            </div>
            
            <div className="column is-4">
                <label className="label"><span className="bg-shar-le-box lengthening-odds is-inline-block"></span></label>
            </div>
               
            </div>
            </div>
            </div>
            </div>
            <div className="bg-white pd-30">
            <h4 className="search-txt-size font-has-text-weight-normal mg-b-20">Search Result for <span>"match"</span> ...</h4>

            <div className="fwid cus-border mg-b-20">
                <div className="table-title text-left">
                    <h4>Matches:</h4>
                </div>
                <div className="table-sec table-responsive">
                    <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <td>Match Date</td>
                                <td>League</td>
                                <td>Teams</td>
                                
                            
                            </tr>
                        </thead>
                        <tbody className="has-text-grey border-td">
                            
                            <tr>
                                <td colspan="3">No Matches Found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="fwid cus-border">
                <div className="table-title text-left">
                    <h4>Leagues:</h4>
                </div>
                <div className="table-sec table-responsive">
                    <table className="table new-table emptys-tables table is-fullwidth" border="0" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <td>Match Date</td>
                                <td>League</td>
                                <td>Teams</td>
                                
                            
                            </tr>
                        </thead>
                        <tbody className="has-text-grey border-td">
                            
                            <tr>
                                <td colspan="3">No Leagues Found!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           
                {/* <div className="text-center">No Matches Found!</div> */}
            </div>
            </div>
        </div>
      
            
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default BettingOddComparison;

