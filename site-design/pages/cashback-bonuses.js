

import Head from 'next/head';

import { site_name } from '../utils/Common';

import HeaderIn from '../components/HeaderIn';
import Footer from '../components/Footer';
import Link from 'next/link';
const Cashback_Bonuses = (props) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <title>{site_name} | Cashback On Your Losses</title>

        </Head>

        <HeaderIn />

        <div className="container">
            <div className="inner-wrapper full-width">
                <div className="cbk-wrap">
                    <div className="cbk-top-row">
                        <div className="columns is-desktop is-half-desktop">
                            <div className="column">
                                <div className="cbk-box has-text-centered">
                                    <img src="static/images/others/cbk-01.png" alt="image" />
                                    <h5>Cashback On Over<br />100 Brands</h5>
                                </div>
                            </div>
                            <div className="column">
                                <div className="cbk-box has-text-centered">
                                    <img src="static/images/others/cbk-02.png" alt="image" />
                                    <h5>Boost Your Gambling<br />Profits</h5>
                                </div>
                            </div>
                            <div className="column">
                                <div className="cbk-box has-text-centered">
                                    <img src="static/images/others/cbk-03.png" alt="image" />
                                    <h5>Fastest Cashback<br />Guarantee</h5>
                                </div>
                            </div>
                            <div className="column">
                                <div className="cbk-box has-text-centered">
                                    <img src="static/images/others/cbk-04.png" alt="image" />
                                    <h5>Multiple Payment<br />Options</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cbk-mid-banner">
                        <div className="columns">
                            <div className="column is-3">
                                <div className="cbk-top-cat">
                                    <div className="top-cat-ttl has-text-centered">TOP 10 Retailers</div>
                                    <ol>
                                        <li><Link href="javascript:void(0);"><a target="_blank">18bet-Sportsbook (Finland, Norway, Sweden)-£15</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">Virgin Games-Casino-£25</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">AvaTrade-Trading & Investing-£80</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">888-Casino-£15</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">Winner-Casino (Nordic & Germany Only)-£25</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">JackpotJoy-Bingo-£15</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">18bet-Sportsbook (Finland, Norway, Sweden)-£15</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">Sporting Index-Sportsbook-£15</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">Oddstorm-Sports Arbitrage Software-£350</a></Link></li>
                                        <li><Link href="javascript:void(0);"><a target="_blank">Mr Spin-Casino-£15</a></Link></li>
                                    </ol>

                                </div>
                            </div>
                            <div className="column">
                                <div className="cbk-banner-link">
                                    <Link href="/HeartBingoCashback"><a><img src="static/images/banner/cbk-banner.png" alt="banner" /></a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cbk-categories">
                        <h1>Cashback Categories</h1>
                        <div className="cbk-at-list">
                            <ul>
                                <li><Link href="javascript:void(0);"><a>Arbitrage & Matched Betting</a></Link></li>
                                <li><Link href="/HeartBingoCashback"><a>Bingo</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Bookmaker</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Casino</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Lottery & Games</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Poker</a></Link></li>
                                <li><Link href="javascript:void(0);"><a>Trading & Investing</a></Link></li>
                            </ul>
                        </div>
                        <div className="cbk-srch-off">
                            <div className="columns is-vcentered">
                                <div className="column is-6">
                                    <span className="is-inline-block has-text-weight-bold">Search Offers</span>
                                    <div className="is-inline-block v-al-mid m-l-15">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <input className="input srch-off-input is-shadowless" type="text" />
                                            </div>
                                            <div className="control">
                                                <a className="button is-btn-srch-off"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="srt-col column is-6">
                                    <span className="is-inline-block has-text-weight-bold">Sort By:</span>
                                    <ul className="is-inline-block m-l-15">
                                        <li>A-Z</li>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <li>Highest £</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cbk-list-wrap">
                        <div className="columns">
                            <div className="column is-9">
                                <div className="li-gr-btn">
                                    <a><span className="fa fa-list"></span></a>
                                    <a><span className="fa fa-th"></span></a>
                                </div>

                                <div className="cbk-clm-list">
                                    <h2>Latest Offers</h2>
                                    <div className="cbk-clm-list-in" id="list-view">
                                        <div className="cbk-clm-img"><img src="static/images/others/cbk-clm-01.png" alt="image" /></div>
                                        <div className="cbk-clm-cnt">
                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                            <p>Dr Slot is a brand new mobile slot and casino site from the operators of mFortune, with a completely unique selection of never before seen slot games. As at mFortune, if you register on desktop a text message is sent to your phone with an activation link, and each slot game is an app in itself. That’s as far as the resemblance goes though – all the slot games are different to those at mFortune and other Intouch sites and…</p>
                                        </div>
                                        <div className="cbk-clm-act">
                                            <p>£15</p>
                                            <Link href="/HeartBingoCashback"><a>Claim Cashback</a></Link>
                                        </div>
                                    </div>
                                    <div className="cbk-clm-list-in" id="list-view">
                                        <div className="cbk-clm-img"><img src="static/images/others/cbk-clm-01.png" alt="image" /></div>
                                        <div className="cbk-clm-cnt">
                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                            <p>Dr Slot is a brand new mobile slot and casino site from the operators of mFortune, with a completely unique selection of never before seen slot games. As at mFortune, if you register on desktop a text message is sent to your phone with an activation link, and each slot game is an app in itself. That’s as far as the resemblance goes though – all the slot games are different to those at mFortune and other Intouch sites and…</p>
                                        </div>
                                        <div className="cbk-clm-act">
                                            <p>£15</p>
                                            <Link href="/HeartBingoCashback"><a>Claim Cashback</a></Link>
                                        </div>
                                    </div>
                                    <div className="cbk-clm-list-in" id="list-view">
                                        <div className="cbk-clm-img"><img src="static/images/others/cbk-clm-01.png" alt="image" /></div>
                                        <div className="cbk-clm-cnt">
                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                            <p>Dr Slot is a brand new mobile slot and casino site from the operators of mFortune, with a completely unique selection of never before seen slot games. As at mFortune, if you register on desktop a text message is sent to your phone with an activation link, and each slot game is an app in itself. That’s as far as the resemblance goes though – all the slot games are different to those at mFortune and other Intouch sites and…</p>
                                        </div>
                                        <div className="cbk-clm-act">
                                            <p>£15</p>
                                            <Link href="/HeartBingoCashback"><a>Claim Cashback</a></Link>
                                        </div>
                                    </div>

                                    <div style={{ display: 'none' }} className="columns is-multiline is-variable is-1 cbk-clm-list-in is-no-border" id="grid-view">
                                        <div className="column is-4 pd-t-b-4">
                                            <div className="card text-center is-shadowless bor-e1">
                                                <article className="card-image">

                                                    <div className="card-content text-center">
                                                        <div className="content">
                                                            <div className="image-lt mg-b-20 is-fullwidth">
                                                                <img src="static/images/others/cbk-clm-01.png" alt="image" />
                                                            </div>
                                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                                            <div className="text-center mg-auto">
                                                                <p className="price-box">£15</p>
                                                                <Link href="javascript:void(0);"><a className="price-btn">Claim Cashback</a></Link>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </article>

                                            </div>
                                        </div>
                                        <div className="column is-4 pd-t-b-4">
                                            <div className="card text-center is-shadowless bor-e1">
                                                <article className="card-image">

                                                    <div className="card-content text-center">
                                                        <div className="content">
                                                            <div className="image-lt mg-b-20 is-fullwidth">
                                                                <img src="static/images/others/cbk-clm-01.png" alt="image" />
                                                            </div>
                                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                                            <div className="text-center mg-auto">
                                                                <p className="price-box">£15</p>
                                                                <Link href="javascript:void(0);"><a className="price-btn">Claim Cashback</a></Link>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </article>

                                            </div>
                                        </div>
                                        <div className="column is-4 pd-t-b-4">
                                            <div className="card text-center is-shadowless bor-e1">
                                                <article className="card-image">

                                                    <div className="card-content text-center">
                                                        <div className="content">
                                                            <div className="image-lt mg-b-20 is-fullwidth">
                                                                <img src="static/images/others/cbk-clm-01.png" alt="image" />
                                                            </div>
                                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                                            <div className="text-center mg-auto">
                                                                <p className="price-box">£15</p>
                                                                <Link href="javascript:void(0);"><a className="price-btn">Claim Cashback</a></Link>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </article>

                                            </div>
                                        </div>

                                        <div className="column is-4 pd-t-b-4">
                                            <div className="card text-center is-shadowless bor-e1">
                                                <article className="card-image">

                                                    <div className="card-content text-center">
                                                        <div className="content">
                                                            <div className="image-lt mg-b-20 is-fullwidth">
                                                                <img src="static/images/others/cbk-clm-01.png" alt="image" />
                                                            </div>
                                                            <h4 className="offer-content-title">Dr Slot - Casino</h4>
                                                            <div className="text-center mg-auto">
                                                                <p className="price-box">£15</p>
                                                                <Link href="javascript:void(0);"><a className="price-btn">Claim Cashback</a></Link>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </article>

                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="column is-3">
                                <div className="trnd-sec">
                                    <h5>Trending now</h5>
                                    <p>Based on member's activity</p>
                                    <ul>
                                        <li>Heart-Bingo <span>£15</span></li>
                                        <li>JackpotJoy-Bingo <span>£25</span></li>
                                    </ul>
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

export default Cashback_Bonuses;

