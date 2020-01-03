import Head from 'next/head';
import {site_name} from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import ArbitrageCalculatorsTop from '../components/arbitrage-calculators/Arbitrage-calculators-top';
import BackLayCalculatorForm from '../components/arbitrage-calculators/Back-lay-calculator-form';
import ArbitrageCalculatorsMenu from '../components/arbitrage-calculators/Arbitrage-calculators-menu';

import Link from 'next/link';

const ArbitrageCalculators = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Arbitrage Calculators</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
            <div className="inner-brd-crmp">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    
                    <li><Link href="javascript:void(0);"><a>Arbitrage Calculators</a></Link></li>
                </ul>
            </div>
        </div>
        
        <div className="inner-wrapper">
        <div className="container">
            <ArbitrageCalculatorsTop/>
            <ArbitrageCalculatorsMenu/>
            <BackLayCalculatorForm/>
        </div>
        
        </div>

         <Footer />
    </div>
  )

export default ArbitrageCalculators;

