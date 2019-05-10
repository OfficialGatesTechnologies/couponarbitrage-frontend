import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import EuropeanHandicapsCalculatorTop from '../components/arbitrage-calculators/european-handicaps/european-handicaps-calculator-top';
import EuropeanHandicapsCalculatorForm from '../components/arbitrage-calculators/european-handicaps/european-handicaps-calculator-form';
import ArbitrageCalculatorsMenu from '../components/arbitrage-calculators/arbitrage-calculators-menu';

import Link from 'next/link';

const InnerAsianHandicapsCalculator = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | European Handicaps Calculator</title>
             
        </Head>

        <HeaderIn />
        <div className="container">

            <div className="fwid banner-wrap inner-wrap">
                <div className="innerban-text">
                <h4><Link href="/"><a>Home</a></Link>&nbsp; / &nbsp;<b>European Handicaps</b></h4>
                </div>
                <div className="banner-layer innerban-layer">&nbsp;</div>
                <div className="innerban-img"> <img src="/static/images/banner/Arbcalculator.jpg" alt="Arbcalculator" /></div>
            </div>
            </div>
        
        <div className="inner-wrapper">
        <div className="container">
            <EuropeanHandicapsCalculatorTop/>
            <ArbitrageCalculatorsMenu/>
            <EuropeanHandicapsCalculatorForm/>
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default InnerAsianHandicapsCalculator;

