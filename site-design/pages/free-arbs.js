import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';

const FreeArbs = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Learn Sports Arbitrage</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
            <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>Free Arbs</a></Link></li>
                </ul>
            </div>
        </div>
        
        <div className="inner-wrapper">
        <div className="container">
        <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-variable is-0">
                                <div className="column is-12 bg-green colors-box">
                                    
                                        <div className="fwid top-box"> <span className="box-white-line">&nbsp;</span>
                                            <h2 className="box-head">Free Arbs</h2>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
        </div>
        <div className="fwid tables-lists-wrap mg-t-40 clearfix">
        <div className="tab-content iframe-theme">
          <iframe src="//oddstorm.com/surebets/index.php?if=1&amp;if_bg=FFFFFF&amp;if_color=000000&amp;if_tab_bg=F2F2F2&amp;if_links_color=060352&amp;if_table_bg=393686&amp;if_table_color=FFFFFF&amp;if_header_bg=E5E5E5&amp;if_header_color=393686&amp;if_odd_bg=EBF6F5&amp;if_odd_color=000000&amp;if_even_bg=FFFFFF&amp;if_even_color=000000&amp;if_pid=1941" frameborder="0" height="800px" width="100%"></iframe>        </div>
      </div>
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default FreeArbs;

