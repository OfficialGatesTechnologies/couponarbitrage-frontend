 
 
import Head from 'next/head';

import {site_name} from '../utils/Common';

import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
 
const faq = (props) => (
    <div>   
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | FAQs</title>
             
        </Head>

        <HeaderIn />
        <div className="container">
        <div className="log-bg">
                <img src="static/images/backgrounds/log-bg.jpg" />
                <div className="inner-ban-txt">
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="javascript:void(0);"><a>FAQs</a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="inner-wrapper full-width">
        <div className="container">
                <div className="box-section mg-t0">
                        <div className="fwid box-sec-01">
                            <div className="row-same-height columns is-mobile is-variable is-0">
                                <div className="fwid top-box bg-green is-fullwidth">
                                    
                                        <div className="fwid"> <span className="box-white-line">&nbsp;</span>
                                        <h1 className="box-head">FAQs</h1>
                                        </div>
                                    
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className="fwid bot-box is-inline-block is-fullwidth">
<div className="fwid fm-white-top pd-30">
<div className="fwid tabdivsec-wrap">
<div className="fwid tabdivsec-li"> <a className="accordtab current" data-toggle="maindiv-1" href="javascript:void(0);"><h2>How does the Skrill Bonus Scheme Work?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-1"  style={{display: 'block'}}>
<p>Our Skrill bonus scheme allows you to earn cashback on all your transactions using your Skrill account. The rewards offered by us are in addition to those of the Skrill VIP loyalty scheme and includes all merchants. Our scheme is mainly targeted at high volume players but you can also earn cashback if you use your account less frequently - unfortunately low volume players will be unlikely to become a VIP so will not qualify for the Skrill loyalty Program offered by Skrill directly.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-2" href="javascript:void(0);"><h2>Who is eligible to join the Skrill Bonus Scheme?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-2" >
<p>Every new Skrill customer who registers via our link is eligible to join the scheme. For existing customers of Skrill, you will only be accepted if you have not been referred by another affiliate site and you are not a VIP already.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-3" href="javascript:void(0);"><h2>How do I become a VIP?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-3" >
<p>Your VIP status at Skrill is dependent on the amount you transact over a 90 day rolling period. The different levels of status transaction requirements are: Bronze - Transact over €6000 in 90 days, Silver - Transact over €15,000 in 90 days, Gold - Transact over €45,000 in 90 days, Diamond - Transact over €90,000 in 90 days.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-4" href="javascript:void(0);"><h2>My account is in a different currency to Euros – what are the transaction requirements for each VIP level for me?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-4" >
<p>If your Skrill account is not in Euros you will reach the level of VIP status based on a currency equivalent. For example, if your account is in GBP and the current exchange rate is  £1=€1.30 you will need to transact £4,615 to become a bronze VIP. You can find a full breakdown of VIP levels and benefits <a href="#">here</a>.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-5" href="javascript:void(0);"><h2>Are any merchants or gaming sites excluded from the Skrill bonus scheme?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-5" >
<p>All merchants are included in the cashback you will receive from Couponarbitrage. However, with regards to the Skrill VIP loyalty scheme where you earn cashback from Skrill directly, there are a number of excluded merchants. The full list can be found <a href="#">here</a>.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-6" href="javascript:void(0);"><h2>How do I receive the £10 Sign Up Bonus for joining Skrill via Couponarbitrage?</h2></a>
<div className="dsnone maintabdiv" id="maindiv-6" >
<p>Your £10 Bonus will be added immediately and will become payable once you have transacted at least £1000 using your Skrill account.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-7" href="javascript:void(0);"><h3>How do I view my balance and request a payment of cashback?</h3></a>
<div className="dsnone maintabdiv" id="maindiv-7" >
<p>You can view your earnings from the cashback bonus paid directly by us here. To view your VIP loyalty points from Skrill, go in your loyalty club section of your Skrill account and redeem the points for cashback there.</p>
</div>
</div>
<div className="fwid tabdivsec-li"> <a className="accordtab" data-toggle="maindiv-8" href="javascript:void(0);"><h3>How does fast-track verification work?</h3></a>
<div className="dsnone maintabdiv" id="maindiv-8" >
<p>If you'd like fast-track verification and zero transaction limits applied to your account within 1 working day all you need to do is send your documents (1. A coloured copy of a personal identification document for example ID card, Driving license or passport and 2. A recent paper address proof issued in the last 3 months; e.g. utility bill or bank statement) to the Skrill dedicated managers serving couponarbitrage members to this e-mail: <Link href="mailto:wanttobevip@skrill.com"><a>wanttobevip@skrill.com</a></Link> and make at least one transaction, no matter how small or big with your new Skrill account. N.B Please remember to put ''Couponarbitrage.com'' as the subject line in your e-mail.</p>
</div>
</div>
</div>
</div>
</div>
                    </div>
                </div>
        </div>
        
        <Footer />
    </div>
  )

export default faq;

