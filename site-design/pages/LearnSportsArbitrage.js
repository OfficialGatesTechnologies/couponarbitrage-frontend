import Head from 'next/head';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/HeaderIn';
import Footer from '../components/Footer';
import LearnSportsArbitrage_Top from '../components/LearnSportsArbitrage_Top';
import LearnSportsArbitrage_Box from '../components/LearnSportsArbitrage_Box';
import Link from 'next/link';

const LearnSportsArbitrage = (props) => (
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

                    <li><Link href="javascript:void(0);"><a>Learn Sports Arbitrage</a></Link></li>
                </ul>
            </div>
        </div>
        <div className="inner-wrapper">
            <div className="container">
                <LearnSportsArbitrage_Top />
                <LearnSportsArbitrage_Box />
            </div>
        </div>

        <Footer />
    </div>
)

export default LearnSportsArbitrage;

