import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
import Link from 'next/link';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import CashbackScheme from '../components/turnover-cashback/Cashback-scheme';
import CashbackSlider from '../components/turnover-cashback/Cashback-slider';
import CashbackForm from '../components/turnover-cashback/Cashback-form';
import CashbackFaqs from '../components/turnover-cashback/Cashback-faqs';
import { apiUrl } from '../utils/Common';
import CustomLoader from '../components/Custome-loader';
const horizontalLabels = {
    0: '0',
    250000: '250000'
}
const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0, maxValue = 1375) => Math.round((maxValue - val) / 100 * diameter);
export default withRouter(class SkrillCashbackScheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqList: [],
            offerList: [],
            menuRow: [],
            loading: true,
            menuUrl: 'skrill-cashback',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            value: 0,
            maxValue: 250000,
            currenyCode: "EUR",
            currenySymbol: '€',
            membership_level: 'Not eligible for Skrill VIP',
            vipBonus: 0,
            couBonus: 0,
            totalBonus: 0,
            offeSet: 0,
            maxCashbackValue: 1375,
            circlePercentage: 0,
            className: 'vip-level-1',
            brandName: 'Skrill',
            network_type: 'skrill',
            staticTextHtml: '',
            staticText: [],
            logoClassName: 'skrill-customer',
            btnClassName: 'button-skrill',
            accountIdImage: 'skrill.png',
            strokeColor: '#811e68',
            regLink: 'https://secure.Skrill.com/Registration.aspx?_atc=ix543q481bjmjwat1p0wghb73'

        }


    }
    componentDidMount = () => {
        this.getMenusList();
        this.geStaticTextList();
        this.getFaqs();
    }
    getMenusList = () => {
        let listUrl = apiUrl + 'common/menu-row?link=' + this.state.menuUrl;
        axios.get(listUrl)
            .then(res => {
                var results = res.data.results;
                this.setState({
                    menuRow: results,
                    parentId: results.id,
                    metaTitle: results.metatitle,
                    metakey: results.metakey,
                    metadesc: results.metadesc,
                    metadata: results.metadata,
                });
            }).catch(() => {
                Router.push(`/`);
            })
    }
    getFaqs = () => {
        let listUrl = apiUrl + 'common/faqs?faqCategory=Skrill';
        axios.get(listUrl).then(res => {
            this.setState({
                faqList: res.data.results
            });


        })
    }

    geStaticTextList = () => {
        let listUrl = apiUrl + 'common/static-text?static_text_for=' + this.state.brandName;
        axios.get(listUrl).then(res => {
            this.setState({
                staticText: res.data.results
            });


        })
    }
    handleSliderChange = value => {

        let membership_level = 'Not eligible for Skrill VIP';
        let className = 'vip-level-1';
        if (value >= 6000 && value < 15000) {
            membership_level = 'Bronze';
            className = 'vip-level-2'
        } else if (value >= 15000 && value < 45000) {
            membership_level = 'Silver';
            className = 'vip-level-3'
        } else if (value >= 45000 && value < 90000) {
            membership_level = 'Gold';
            className = 'vip-level-4'
        } else if (value >= 90000) {
            membership_level = 'Diamond';
            className = 'vip-level-5'
        }
        var vipBonus = Math.round((value * 0.20) / 100).toFixed(2);
        var couBonus = Math.round((value * 0.55) / 100).toFixed(2);
        var totalBonus = Math.round(couBonus).toFixed(2);
        var circlePercentage = ((couBonus / this.state.maxCashbackValue) * 100).toFixed(2);
        this.setState({
            value: value,
            membership_level: membership_level,
            className: className,
            vipBonus: vipBonus,
            couBonus: couBonus,
            totalBonus: totalBonus,
            circlePercentage: circlePercentage,
            staticTextHtml: this.generateRange(value),

        })
    };
    generateRange = value => {

        const { staticText } = this.state;
        let staticTextHtml = [];
        if (staticText.length > 0) {
            staticText.map(function (staticRow, i) {
                if ((staticRow.static_text_max_val === 0 || staticRow.static_text_max_val >= value) && (staticRow.static_text_min_val <= value || staticRow.static_text_min_val === 0)) {
                    staticTextHtml.push(<li className="rect-item  limit-visibility is-visible">
                        <div className="rect-content">{staticRow.static_text}</div>
                    </li>
                    );
                }
            })
        }
        return (staticTextHtml)
    }

    render() {

        const strokeDashoffset = getOffset(this.state.circlePercentage, this.state.maxCashbackValue);

        return (

            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{this.state.metaTitle} </title>
                    <meta name="description" content={this.state.metadesc} />
                    <meta name="robots" content={this.state.metadata} />
                </Head>
                <HeaderIn />
                {
                    (this.state.menuRow).length == 0
                        ? <div className="container">
                            <div className="cbk-clm-list">
                                <CustomLoader type="details" />
                            </div>
                        </div>
                        : <> <div className="container">

                            <div className="fwid banner-wrap inner-wrap">
                                <div className="innerban-text">
                                    <h4><Link href="/"><a>Home</a></Link>&nbsp; / &nbsp;<b>
                                        Trunover Cashback</b>&nbsp; /&nbsp;<b>
                                            Skrill Cashback Scheme</b></h4>
                                </div>
                                <div className="banner-layer innerban-layer">&nbsp;</div>
                                <div className="innerban-img">
                                    <img src={`${apiUrl}resources/banner/${(this.state.menuRow).imageFile}`} alt="AsianConnect88 Cashback Scheme" />
                                </div>
                            </div>
                        </div>
                            <div className="inner-wrapper">
                                <div className="container">
                                    {
                                        this.state.parentId ? <CashbackScheme menuRow={this.state.menuRow} /> : ''
                                    }


                                    <div className="fwid bg-white clearfix is-inline-block mg-t-40">
                                        <div className="post-2470 page type-page status-publish hentry skrill-color" id="post-2470">
                                            {
                                                this.state.parentId ?
                                                    <CashbackSlider
                                                        menuRow={this.state.menuRow}
                                                        value={this.state.value}
                                                        maxValue={this.state.maxValue}
                                                        handleSliderChange={this.handleSliderChange}
                                                        currenyCode={this.state.currenyCode}
                                                        currenySymbol={this.state.currenySymbol}
                                                        horizontalLabels={horizontalLabels}
                                                        membership_level={this.state.membership_level}
                                                        className={this.state.className}
                                                        vipBonus={this.state.vipBonus}
                                                        couBonus={this.state.couBonus}
                                                        totalBonus={this.state.totalBonus}
                                                        strokeDashoffset={strokeDashoffset}
                                                        maxCashbackValue={this.state.maxCashbackValue}
                                                        brandName={this.state.brandName}
                                                        staticTextHtml={this.state.staticTextHtml}
                                                        generateRange={this.generateRange}
                                                        strokeColor={this.state.strokeColor}

                                                    /> : ''
                                            }
                                            <div className="omsc-full-width-section bg-light section-join section-sbobet">
                                                {
                                                    this.state.parentId ?
                                                        <CashbackForm
                                                            brandName={this.state.brandName}
                                                            logoClassName={this.state.logoClassName}
                                                            menuRow={this.state.menuRow}
                                                            currenyCode={this.state.currenyCode}
                                                            accountIdImage={this.state.accountIdImage}
                                                            network_type={this.state.network_type}
                                                            regLink={this.state.regLink}
                                                            btnClassName={this.state.btnClassName}
                                                        /> : ''
                                                }
                                                {
                                                    (this.state.faqList).length > 0
                                                        ? <CashbackFaqs faqList={this.state.faqList} menuRow={this.state.menuRow} />
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </>
                }
            </div>
        )
    }
})

