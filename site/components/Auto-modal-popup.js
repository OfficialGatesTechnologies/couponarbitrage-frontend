 
import Link from 'next/link';
import Modal from 'react-responsive-modal';
const AutoModalPopup = (props) => (

  <div className="is-inline-block custom-modal">
   <Modal open={props.openModal} showCloseIcon={false} center>
     
        <div className="modal1 leave-modal color-full-modal" >
          <a className="close" onClick={props.onCloseModal}>
            &times;
        </a>
          <div className="header text-left"> New site: eWalletBooster.com</div>
          <div className="content">
            <p>Last month we launched our dedicated ewallet cashback site - eWalletBooster.com. If this is your first time visiting couponarbitrage.com, we suggest using applying to eWalletBooster instead due to the benefits shown below. Our new site is also open to existing couponarbitrage.com users who are already taking part in our Skrill, Neteller and ecoPayz cashback schemes.</p>
            <h2 >Benefits</h2>
            <ul >
              <li >Dashboard showing cashback, cashback rate %, and enhanced reporting.</li>
              <li>Cashback stats updated every 24 hours and viewable in dashboard.</li>
              <li >SMS &amp; Email reports on a weekly and monthly basis.</li>
              <li >Analyse which transfers generate a higher rate of cashback.</li>
              <li >Regular promotional periods offering higher rates of cashback.</li>
              <li >For existing CA customers, it is easy to switch and trial eWalletBooster whilst keeping your couponarbitrage account active.</li>
            </ul>
            <h2 >For existing couponarbitrage.com customers</h2>
            <ol>
              <li>Go to <Link href="https://www.ewalletbooster.com"><a>https://www.ewalletbooster.com</a></Link> and submit an application</li>
              <li>Your application will be approved within 24 hours if you have made a transaction with your ewallet this month. Once approved you can view your stats in your dashboard here <Link href="https://www.ewalletbooster.com/profile"><a>https://www.ewalletbooster.com/profile</a></Link></li>
            </ol>
          </div>
          <div className="footer text-center"><button className="button1 is-danger" onclick="window.location.href='https://www.ewalletbooster.com/'" target="_blank">Go to eWalletBooster.com <img src="/static/images/icons/tick-ic-popup.png" /></button></div>
        </div>
      
    </Modal>
  </div>
);
export default AutoModalPopup;