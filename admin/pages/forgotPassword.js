 
 
import Head from 'next/head';
import ForgotPassBox from '../components/ForgotPassBox';
import {site_name} from '../utils/Common';
const Index = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Admin Controll Panel Login</title>
             
        </Head>

        <ForgotPassBox/>
    </div>
  )

export default Index;

