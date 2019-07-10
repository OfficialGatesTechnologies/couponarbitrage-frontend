import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from '../components/my-account/my-account-top';
import Link from 'next/link';
import jsCookie from 'js-cookie';
export default withRouter(class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                accountSkrillEmail: '',
                accountNetellerEmail: '',
                accountPaypalEmail: '',
                bankAccountName: '',
                bankAccountNumber: '',
                bankAccountSortCode: '',
            },
            errors: {
                accountSkrillEmail: null,
                accountNetellerEmail: null,
                accountPaypalEmail: null,
                bankAccountName: null,
                bankAccountNumber: null,
                bankAccountSortCode: null,
            },
            disableBtn: false
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                let userData = res.data;
                this.setState({
                    userData: userData,
                });
            }).catch(() => {
                Router.push(`/signin`);
            })

    }


    render() {
        const { } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Payment Details</title>
                </Head>
                <HeaderIn />
                <div className="container">
                    <div className="inner-brd-crmp">
                        <ul>
                            <li>
                                <Link href="/"><a>Home</a></Link></li>
                            <li>
                                <Link href="javascript:void(0);"><a>My Account</a></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="inner-wrapper">
                    <div className="container">
                        <MyAccountTop userData={this.state.userData} />
                        <MyAccountMidMenu />
                        <div className="fwid mg-t-40">
                            <div className="fwid new-title has-text-left">
                                <h1><span className="tables-title">Payment Details</span></h1>
                            </div>
                            <div className="fwid bg-white">
                                <div className="fwid tables-topsec">
                                    <div className="sm-content">
                                        <p>Update your payout details below</p>
                                        <p>IMPORTANT: please be careful when entering your payout details below as mistakes may mean your cash will not credit your account</p>
                                    </div>
                                </div>
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by Skrill - (Free)
                                        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <form className="is-fullwidth max-panel-bdy">

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Skrill email address</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" name="accountSkrillEmail" id="accountSkrillEmail" type="email" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </form>
                                        </div>
                                    </div>

                                </div>
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: NETELLER - (Free)</p>
                                        <div className="panel-block pan-border-color-cus">
                                            <form className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">NETELLER email address</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className="input" name="accountNETELLEREmail" id="accountNETELLEREmail" type="email" />
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </form>
                                        </div>
                                    </div>

                                </div>
                                {/* Optional: Payout by PayPal (Free)* */}
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by PayPal (Free)*
        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <form className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />
                                                <div className="pag-cont has-text-grey">
                                                    <p>*PayPal may charge a fee for certain PayPal accounts, such as Business and Premier accounts.</p><br />
                                                </div>

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">PayPal email address
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className="input" name="accountPayPalEmail" id="accountPayPalEmail" type="email" />
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </form>
                                        </div>
                                    </div>

                                </div>
                                {/* Optional: Payout by bank transfer - BACS (Free) */}
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Optional: Payout by bank transfer - BACS (Free)
        </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <form className="is-fullwidth max-panel-bdy">
                                                <input type="hidden" name="updateType" value="skrill" />


                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Account Holder Name
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className="input" name="accountHolderName" id="accountHolderName" type="text" />
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Sort code
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control shrt-box">
                                                                <input className="input" name="accountHolderName" id="accountHolderName" type="text" />
                                                            </p>
                                                            <p className="control shrt-box">
                                                                <input className="input" name="accountHolderName" id="accountHolderName" type="text" />
                                                            </p>
                                                            <p className="control shrt-box">
                                                                <input className="input" name="accountHolderName" id="accountHolderName" type="text" />
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Account Number
</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <p className="control">
                                                                <input className="input" name="accountNumber" id="accountNumber" type="text" />
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>
                                                <div className="pag-cont is-inline-block is-fullwidth has-text-grey">
                                                    <p>Please note that our payout system supports payouts to bank accounts with six-digit sort codes and eight-digit account numbers only. We cannot pay in to bank accounts with longer account numbers or those requiring a roll number or other additional information to identify them.</p>
                                                </div>

                                            </form>

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
    }
});


