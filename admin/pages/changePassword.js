 
 
import Head from 'next/head';
import ChangePassBox from '../components/ChangePassBox';
import {site_name} from '../utils/Common';
const Index = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Admin Controll Panel Login</title>
             
        </Head>

        <ChangePassBox/>
    </div>
  )

export default Index;

