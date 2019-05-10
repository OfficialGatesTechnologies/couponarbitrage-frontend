import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
import Link from 'next/link';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import CashbackScheme from '../components/turnover-cashback/cashback-scheme';
import CashbackSlider from '../components/turnover-cashback/cashback-slider';
import CashbackForm from '../components/turnover-cashback/cashback-form';
import CashbackFaqs from '../components/turnover-cashback/cashback-faqs';
import { apiUrl } from '../utils/Common';
import CustomLoader from '../components/custome-loader';
import AutoModalPopup from '../components/auto-modal-popup';
const horizontalLabels = {
    0: '0',
    250000: '250000'
}
const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0, maxValue = 1375) => Math.round((maxValue - val) / 100 * diameter);
export default withRouter(class EcopayzCashbackScheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqList:[],
            offerList: [],
            menuRow: [],
            loading: true,
            menuUrl: 'ecopayz-cashback',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            value: 0,
            maxValue: 250000,
            currenyCode: "EUR",
            currenySymbol: '€',
            membership_level: 'Gold',
            vipBonus: 0,
            couBonus: 0,
            totalBonus: 0,
            offeSet: 0,
            maxCashbackValue: 3125,
            circlePercentage: 0,
            className: 'vip-level-2',
            brandName: 'Ecopayz',
            network_type:'Ecopayz',
            staticTextHtml: '',
            staticText: [],
            logoClassName: 'ecopayz-customer',
            btnClassName:'button-ecopayz',
            accountIdImage: 'ecopayz.png',
            strokeColor: '#83BA3B',
            regLink: 'https://secure.ecopayz.com/Registration.aspx?_atc=ix543q481bjmjwat1p0wghb73',
            openModal: false,

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
        let listUrl = apiUrl + 'common/faqs?faqCategory=Ecopayz';
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

        let membership_level = 'Gold';
        let className = 'vip-level-2';
        if(value>=0 && value<50000){
            membership_level = 'Gold';
            className = 'vip-level-2';
            var couBonus = ((value*0.65)/100).toFixed(2);      
        } else if(value>=50000 && value<100000){
            membership_level = 'Platinum';
            className = 'vip-level-3';
            var couBonus = ((value*0.85)/100).toFixed(2);     
        }
        else if(value>=100000 && value<200000){
            membership_level = 'Platinum';
            className = 'vip-level-3';   
            var couBonus = ((value*1.20)/100).toFixed(2); 
        }
        else if(value>=200000){
            membership_level = 'Platinum';
            className = 'vip-level-3';
            var couBonus = ((value*1.25)/100).toFixed(2);     
        }
        var vipBonus = Math.round((value * 0.20) / 100).toFixed(2); 
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
    onCloseModal = () => {
        this.setState({ openModal: false });
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
                                            Ecopayz  Cashback Scheme</b></h4>
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
                                        <div className="post-2470 page type-page status-publish hentry ecopayz-color" id="post-2470">
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
                                                    (this.state.faqList).length>0
                                                        ? <CashbackFaqs faqList={this.state.faqList} menuRow={this.state.menuRow} />
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                              <div className="color-full custom-modal">
                              <AutoModalPopup openModal={this.state.openModal} onCloseModal={this.onCloseModal} />
                              </div> 
                        </>
                }
            </div>
        )
    }
})

