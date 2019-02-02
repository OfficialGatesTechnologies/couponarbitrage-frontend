 
 
import Head from 'next/head';
import HomeIndex from '../components/landing-page/home-index';
import {site_name} from '../utils/Common';
 
 
const Index = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Home</title>
             
        </Head>

        <HomeIndex/>
    </div>
  )

export default Index;

