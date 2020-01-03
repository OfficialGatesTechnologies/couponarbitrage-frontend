import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import DrawNoBetCalculatorTop from '../components/arbitrage-calculators/draw-nobet/Draw-nobet-calculator-top';
import DrawNoBetCalculatorForm from '../components/arbitrage-calculators/draw-nobet/Draw-nobet-calculator-form';
import ArbitrageCalculatorsMenu from '../components/arbitrage-calculators/Arbitrage-calculators-menu';

import Link from 'next/link';

const InnerDrawNoBetCalculator = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Draw No Bet Calculators</title>
             
        </Head>

        <HeaderIn />
        <div className="container">

            <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                <h4><Link href="/"><a>Home</a></Link>&nbsp; / &nbsp;<b>Draw No Bet </b></h4>
                </div>
                <div className="banner-layer innerban-layer">&nbsp;</div>
                <div className="innerban-img"> <img src="/static/images/banner/Arbcalculator.jpg" alt="Arbcalculator" /></div>
            </div>
            </div>
        
        <div className="inner-wrapper">
        <div className="container">
            <DrawNoBetCalculatorTop/>
            <ArbitrageCalculatorsMenu/>
            <DrawNoBetCalculatorForm/>
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default InnerDrawNoBetCalculator;

