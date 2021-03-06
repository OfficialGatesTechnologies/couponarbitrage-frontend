import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import LearnSportsArbitrage_Top from '../components/learn-sports-arbitrage-top';
import ArticleArbitrage from '../components/article-arbitrage';

import Link from 'next/link';

const LearnSportsArbitrage_whatissports = (props) => (
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
                    
                    <li><Link href="/learn-sports-arbitrage"><a>Learn Sports Arbitrage</a></Link></li>
                    <li><Link href="javascript:void(0);"><a>What is Sports Arbitrage?</a></Link></li>
                </ul>
            </div>
        </div>
        
        <div className="inner-wrapper">
        <div className="container">
            <LearnSportsArbitrage_Top/>
            <div className="fwid learn-boxs learn-list mg-t-40 columns is-multiline is-variable is-0">
                <div className="col-md-12 is-variable is-0 bg-white colors-box bread-crumbs-wrap">
                <div className="row">
                    <div className="fwid two-box bread-crumbs">
                    <h3 className="bread-title">Learn Sports Arbitrage</h3>
                    <h5><a>Learn Sports Arbitrage</a> &gt; What is Sports Arbitrage?</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="fwid two-box">
                    <h1><i className="icon-learnbox">&nbsp;</i> What is Sports Arbitrage?</h1>
                    <p>Sports Arbitrage Trading or <em>arbing</em> is the process of placing a number of sports bets, with different bookmakers, in order to lock in a profit regardless of which team wins or outcome occurs. Browse the articles below to learn more.</p></div>
                </div>
                </div>
            </div>

            <div className="fwid bg-white is-clearfix">
                <div className="learn-box-list">
                <ul className="no-style">
                    <li>
                    <div className="fwid learn-sublinks">
                        <a >How much can you earn from sports arbitrage?</a> -
                    </div>
                    </li>
                    <li>
                    <div className="fwid learn-sublinks">
                        <a >Introduction to sports arbitrage</a> -
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            <ArticleArbitrage />
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default LearnSportsArbitrage_whatissports;

