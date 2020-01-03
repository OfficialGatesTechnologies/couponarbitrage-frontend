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
export default withRouter(class NetellerCashbackScheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqList: [],
            offerList: [],
            menuRow: [],
            loading: true,
            menuUrl: 'neteller-cashback',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            value: 0,
            maxValue: 250000,
            currenyCode: "EUR",
            currenySymbol: '€',
            membership_level: 'Not eligible for Neteller VIP',
            vipBonus: 0,
            couBonus: 0,
            totalBonus: 0,
            offeSet: 0,
            maxCashbackValue: 1375,
            vipMaxCashbackValue: 2500,
            circlePercentage: 0,
            className: 'vip-level-1',
            brandName: 'Neteller',
            network_type: 'Neteller',
            staticTextHtml: '',
            staticText: [],
            logoClassName: 'neteller-customer',
            btnClassName: 'button-neteller',
            accountIdImage: 'neteller.png',
            strokeColor: '#83ba3b',
            strokeColor2: '#5c6478',
            regLink: 'http://affiliates.neteller.com/processing/clickthrgh.asp?btag=a_56b_1'

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
        let listUrl = apiUrl + 'common/faqs?faqCategory=Neteller';
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

        let membership_level = 'Not eligible for NETELLER  VIP'; let className = 'vip-level-1';
        let vipPercentage = 0;
        if (value >= 825 && value < 4200) { membership_level = 'Bronze'; className = 'vip-level-2'; vipPercentage = 0.2; }
        else if (value >= 4200 && value < 8250) { membership_level = 'Silver'; className = 'vip-level-3'; vipPercentage = 0.2; }
        else if (value >= 8250 && value < 42200) { membership_level = 'Gold'; className = 'vip-level-4'; vipPercentage = 0.2; }
        else if (value >= 42200 && value < 170000) { membership_level = 'Platinum'; className = 'vip-level-6'; vipPercentage = 0.25; }
        else if (value >= 170000) { membership_level = 'Diamond'; className = 'vip-level-5';; vipPercentage = 0.50; }
       
        var vipBonus = Math.round((value * vipPercentage) / 100).toFixed(2);
      
        var couBonus =   Math.round((value * 0.55) / 100).toFixed(2);
        var totalBonus = (parseFloat(vipBonus) + parseFloat(couBonus)).toFixed(2);
 
        var circlePercentage = ((couBonus / this.state.maxCashbackValue) * 100).toFixed(2);
        var vipCirclePercentage = ((vipBonus / this.state.vipMaxCashbackValue) * 100).toFixed(2);

        this.setState({
            value: value,
            membership_level: membership_level,
            className: className,
            vipBonus: vipBonus,
            couBonus: couBonus,
            totalBonus: totalBonus,
            circlePercentage: circlePercentage,
            vipCirclePercentage: vipCirclePercentage,
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
        const vipStrokeDashoffset = getOffset(this.state.vipCirclePercentage, this.state.vipMaxCashbackValue);
      
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
                                            Neteller Cashback Scheme</b></h4>
                                </div>
                                <div className="banner-layer innerban-layer">&nbsp;</div>
                                <div className="innerban-img">
                                <img src={`${apiUrl}resources/banner/${ (this.state.menuRow).imageFile}`} alt="AsianConnect88 Cashback Scheme" />
                                </div>
                            </div>
                        </div>
                            <div className="inner-wrapper">
                                <div className="container">
                                    {
                                        this.state.parentId ? <CashbackScheme menuRow={this.state.menuRow} /> : ''
                                    }


                                    <div className="fwid bg-white clearfix is-inline-block mg-t-40">
                                        <div className="post-2470 page type-page status-publish hentry neteller-color" id="post-2470">
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
                                                        vipStrokeDashoffset={vipStrokeDashoffset}
                                                        vipMaxCashbackValue={this.state.vipMaxCashbackValue}
                                                        brandName={this.state.brandName}
                                                        staticTextHtml={this.state.staticTextHtml}
                                                        generateRange={this.generateRange}
                                                        strokeColor={this.state.strokeColor}
                                                        strokeColor2={this.state.strokeColor2}



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

