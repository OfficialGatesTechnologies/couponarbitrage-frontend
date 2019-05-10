import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import _ from 'lodash';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import Link from 'next/link';
import { apiUrl } from '../utils/Common';
import CashbackCategories from '../components/cashback-offfers/cashback-details-categories';
import SimilarStores from '../components/cashback-offfers/similar-stores';
import CashbackOffers from '../components/cashback-offfers/cashback-offers';
import CashbackVouchers from '../components/cashback-offfers/cashback-vouchers';
import CashbackCliamPopup from '../components/cashback-claim-popup';
import ReviewPopup from '../components/review-popup';
import CustomLoader from '../components/custome-loader';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

import renderHTML from 'react-render-html';
toast.configure();
export default withRouter(class Cashback_Bonuses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cashbackRow: [],
            popupData: {
                cbname: '',
                username: '',
                termsCond: '',
                comments:'',
                 title:'',
                 rating: 1
            },

            url_key: '',
            metaTitle: '',
            metakey: '',
            metadesc: '',
            parentId: '',
            catId: '',
            menuUrl: '',
            codeShow: [],
            horizontal: 10,
            open: false,
            loading: true,
            reviewModal: false,
            userRow: [],
            cb_type: 0,
            loggedUserId: '',
            isExistClaim: '',
            isExistSiteClaim: '',
            isAlreadyClaimed: false,
            jwtToken: jsCookie.get('jwtToken'),
            errors: {
                cbname: null,
                username: null,
                termsCond: null,
                comments:null,
                title:null
            },
        }
    }
    componentDidMount = () => {
        this.getLoggedUser();
        const url_key = this.props.router.query.url_key;
        if (url_key) {
            this.setState({ url_key: url_key ,cashbackRow: []});
           
            setTimeout(() => { this.getStoreRow(); }, 500);
        } else {
            Router.push(`/`);
        }
    }
    getLoggedUser = () => {
        const { popupData } = this.state;
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                popupData['cbname'] = res.data.name;

                this.setState({ loading: false, userRow: res.data, popupData: popupData, loggedUserId: res.data._id });
            }).catch((error) => {
                this.setState({ loading: false });
            })
    }
    componentWillReceiveProps = (nextProps) => {
        const url_key = nextProps.router.query.url_key;
        if (url_key) {
            this.setState({ url_key: url_key });
            setTimeout(() => { this.getStoreRow(); }, 100);
        }
    }
    getStoreRow = () => {
        const { cashbackRow,loggedUserId } = this.state;
      
        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        let listUrl = apiUrl + 'offers/store-row?url_key=' + this.state.url_key + '&ref=' + loggedUserId;
        axios.get(listUrl)
            .then(res => {
                var cashbackRow = res.data.results;
                this.setState({
                    cashbackRow: cashbackRow,
                    isExistClaim: cashbackRow.isExistClaim,
                    isExistSiteClaim: cashbackRow.isExistSiteClaim,
                    isAlreadyClaimed: (cashbackRow.isExistClaim) ? true : (cashbackRow.isExistSiteClaim) ? true : false,
                    metaTitle: (cashbackRow.meta_title) ? cashbackRow.meta_title : site_name,
                    metakey: cashbackRow.meta_keywords,
                    metadesc: cashbackRow.meta_description,
                    parentId: cashbackRow.cat_id && cashbackRow.cat_id.cat_parent ? cashbackRow.cat_id.cat_parent.id : '',
                    catId: cashbackRow.cat_id ? cashbackRow.cat_id._id : '',
                    menuUrl: cashbackRow.cat_id && cashbackRow.cat_id.cat_parent ? cashbackRow.cat_id.cat_parent.link : '',
                    cb_type: cashbackRow.cat_id && cashbackRow.cat_id.cat_parent && cashbackRow.cat_id.cat_parent.link === 'cashback-bonuses' ? 3 : 2
                });
            }).catch(() => {
                Router.push(`/`);
            })
    }
    showCode = (e) => {
        e.preventDefault();
        const { codeShow } = this.state;
        const target = e.target;
        const href = target.href;
        const value = target.getAttribute('data-value');
        codeShow[value] = true;
        this.setState({ codeShow: codeShow });
        window.open(href);
    }
    handleChangeHorizontal = value => {
        this.setState({
            horizontal: value
        })
    }
    onOpenModal = () => {
        this.setState({ open: true });
    }
    openReviewModal = () => {
        console.log('OPenin');
        this.setState({ reviewModal: true });
    }
    closeReviewModal = () => {
        this.setState({ reviewModal: false });
    }
    onCloseModal = () => {
        this.setState({ open: false });
    }
    onOpenTrackLink = (link, e) => {
        const { isAlreadyClaimed } = this.state;
        window.open(link);
        if (isAlreadyClaimed === false) {
            this.setState({ open: true });
        }
    }

    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { popupData } = this.state;
        const allFields = {
            cbname: {
                message: "Please enter  name.",
                doValidate: () => {
                    const value = _.get(popupData, 'cbname', '');
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            username: {
                message: "Please enter your username.",
                doValidate: () => {
                    const value = _.get(popupData, 'username', '');
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            termsCond: {
                message: "Please accept the terms and conditions.",
                doValidate: () => {
                    const value = _.get(popupData, 'termsCond', '');
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },
            title: { 
                message: "Please enter your title.",
                doValidate: () => {
                    const value = _.get(popupData, 'title', '');
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },comments: {
                message: "Please enter your comments.",
                doValidate: () => {
                    const value = _.get(popupData, 'comments', '');
                    if (value) {
                        return true;
                    }
                    return false;
                }
            }

           
        };
        let errors = this.state.errors;
        _.each(fieldsToValidate, (field) => {
            const fieldValidate = _.get(allFields, field);
            if (fieldValidate) {
                errors[field] = null;
                const isFieldValid = fieldValidate.doValidate();
                if (isFieldValid === false) {
                    errors[field] = _.get(fieldValidate, 'message');
                }
            }
        });
        this.setState({
            error: errors,
        }, () => {
            let isValid = true;
            this.setState({ disableBtn: true });
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                    this.setState({ disableBtn: false });
                }
            });
            callback(isValid);
        })
    }

    handleClaimSubmit = (e) => {
        e.preventDefault();
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['cbname', 'username', 'termsCond'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                const { popupData, cashbackRow, cb_type } = this.state;
                axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
                axios.post(apiUrl + 'offers/claim-request', {
                    _id: cashbackRow._id,
                    cb_type: cb_type,
                    popupData: popupData,
                }).then((res) => {
                    let successMsg = res.data.msg;
                    toast.success(successMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                    this.setState({ open: false, cashbackRow: [] });
                    setTimeout(() => { this.getStoreRow(); }, 300);
                }).catch(error => {
                    this.setState({ disableBtn: true });
                    let errorMsg = error.response.data.msg;
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                });
            }

        });

    }
    handleReviewSubmit = (e) => {
        e.preventDefault();
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['title', 'comments'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                const { popupData, cashbackRow } = this.state;
                axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
                axios.post(apiUrl + 'offers/post-review', {
                    _id: cashbackRow._id,
                    popupData: popupData,
                }).then((res) => {
                    let successMsg = res.data.msg;
                    toast.success(successMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                    popupData['rating'] = 1;
                    popupData['title'] = '';
                    popupData['comments'] = '';
                    this.setState({ reviewModal: false,popupData:popupData, cashbackRow: [] });
                    setTimeout(() => { this.getStoreRow(); }, 300);
                }).catch(error => {
                    this.setState({ disableBtn: true });
                    let errorMsg = error.response.data.msg;
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                });
            }

        });

    }

    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);

    }
    handleInputChange = (e) => {
        const { popupData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        popupData[name] = value;
        this.setState({
            popupData: popupData
        })
    }
    handleCheckBoxChange = (e) => {
        const { popupData } = this.state;
        var checked = e.target.checked;
        popupData['termsCond'] = checked;
        this.setState({ popupData: popupData });
        let fieldNeedToValidate = ['termsCond'];
        this.formValidation(fieldNeedToValidate);
    }
    onStarClick  = (nextValue, prevValue, name) =>  {
        const { popupData } = this.state;
        popupData['rating'] = nextValue;
        this.setState({ popupData: popupData });
      }
    render() {
        const { cashbackRow, open, error, isExistClaim, isExistSiteClaim } = this.state;
        var parentUrl = cashbackRow.cat_id && cashbackRow.cat_id.cat_parent ? cashbackRow.cat_id.cat_parent.link : '';
        var cat_url = cashbackRow.cat_id ? cashbackRow.cat_id.cat_url : '';
        var offers = cashbackRow.offers ? cashbackRow.offers : '';
        var voucherCodes = cashbackRow.voucherCodes ? cashbackRow.voucherCodes : '';
        var valueType = cashbackRow.cat_id && cashbackRow.cat_id.cat_parent && cashbackRow.cat_id.cat_parent.link === 'cashback-bonuses' ? 1 : 2;
        var imagePath = (cashbackRow.uploadType === 'imageFile') ?

            cashbackRow.imageFile :
            cashbackRow.uploadType === 'internal_banner' ?
                cashbackRow.internal_banner :
                cashbackRow.uploadType === 'banner' ? cashbackRow.banner :
                    '';
        var claimMessage = (isExistClaim)
            ? 'You claimed this offer on ' + (isExistClaim ? isExistClaim.date_applied.slice(0, 10) : '')
            : (isExistSiteClaim)
                ? 'You have already claimed an offer from this gaming site on '
                + (isExistSiteClaim ? isExistSiteClaim.date_applied.slice(0, 10) : '')
                : '';
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{this.state.metaTitle} </title>
                    <meta name="description" content={this.state.metadesc} />
                    <meta name="robots" content={this.state.metadata} />

                </Head>

                <HeaderIn />

                <div className="container">
                    <div className="inner-wrapper full-width">
                        <div className="cbk-wrap">
                            <div className="cbk-list-wrap">
                                <div className="columns">
                                    <div className="column is-9">
                                        {
                                            cashbackRow.length == 0 ?
                                                <div className="cbk-clm-list">
                                                    <CustomLoader type="details" />
                                                </div>
                                                : <> <div className="cbk-clm-list">
                                                    <div className="cbk-bk-top">
                                                        <h1>{cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} Cashback And Voucher Deals</h1>
                                                        <ul>
                                                            <li><Link href={`/${parentUrl}?subcat=${cat_url}`} as={`/${parentUrl}/${cat_url}`}><a>{cashbackRow.cat_id ? cashbackRow.cat_id.cat_title : ''}</a></Link><span><img src="static/images/icons/mini-arrow.svg" /></span></li>
                                                            <li>{cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} Cashback And Voucher Deals</li>
                                                        </ul>
                                                    </div>
                                                    <div className="cbk-bk-mid">
                                                        <div className="cbk-bk-image">
                                                            <Link href="#">
                                                                <a> {
                                                                    cashbackRow.uploadType && cashbackRow.uploadType !== 'banner' ?
                                                                        <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${cashbackRow.aid ? cashbackRow.aid.name : ''} ${cashbackRow.title ? cashbackRow.title : ''}`} />

                                                                        : cashbackRow.banner !== "" ? renderHTML(cashbackRow.banner) : '&nbsp;'
                                                                }</a>
                                                            </Link>
                                                        </div>
                                                        <div className="cbk-bk-para">
                                                            {

                                                                cashbackRow.details_default == 1 ?
                                                                    <p>

                                                                        Earn {valueType}{cashbackRow.value}cash back when you register a
                  new {cashbackRow.aid ? cashbackRow.aid.name : ''} account by clicking on the
                 {cashbackRow.aid ? cashbackRow.aid.name : ''} banner or by clicking "Join Site" below.
                  To be eligible for the {valueType}{cashbackRow.value} cash back you must deposit at
                  least  {valueType}50 and wager at least  {valueType}{cashbackRow.value} in the
                  {cashbackRow.title ? cashbackRow.title : ''} on selections with
                                                                                                                                                                                                                                                                                                                                                      odds of at least 2.00, within 7 days of registering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Claims usually show up the following day but can take
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      up to 7 days in some cases.
                                        </p> : <p>
                                                                        {renderHTML(cashbackRow.details)}
                                                                    </p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="cbk-bk-bot level">
                                                        <div className="claim-bk level-left">

                                                            {
                                                                claimMessage ?
                                                                    <p style={{ color: '#a50005' }}>{claimMessage}</p> :

                                                                    this.state.jwtToken ?
                                                                        <a className="btn get-green-btn" onClick={this.onOpenModal}>CLAIM CASHBACK</a>
                                                                        : <Link href="/signin">
                                                                            <a className="btn get-green-btn">CLAIM CASHBACK</a>
                                                                        </Link>
                                                            }

                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="cbk-bk-rating level-right">
                                                            <div className="stars-in">
                                                                <span>
                                                                    <img src="/static/images/icons/star-1.png" alt="star" />
                                                                    {
                                                                        this.state.jwtToken ?


                                                                            <a onClick={this.openReviewModal} className="modal-button " data-target="modal" aria-haspopup="true">{cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} Reviews</a>
                                                                            : <Link href="/signin">
                                                                                <a className="modal-button " data-target="modal" aria-haspopup="true">{cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} Reviews</a>
                                                                            </Link>
                                                                    }


                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="cbk-bk-note">Please only submit your claim once you have clicked the link below and met the t&amp;c's. </p>

                                                </div>
                                                    <div className="spcl-off-section">
                                                        <div className="columns">
                                                            <div className="sp-off-in column is-4">
                                                                <div className="sp-off-wrap">
                                                                    <div className="sp-off-top text-center">
                                                                        <h4>Tracking Stats!</h4>
                                                                        <div className="sp-cir-in">
                                                                            <h3>{cashbackRow.satisfied_customers}%</h3>
                                                                            <h5>Satisfied</h5>
                                                                        </div>

                                                                    </div>

                                                                    <div className="sp-off-speed">
                                                                        <div className="sp-speed-det sp-per-det">
                                                                            <h5>Satisfied Customer<span><img src="static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <div className="per-bar-wrap level">
                                                                                <div className="sp-per-bar level-left">

                                                                                    <div className="sp-bar-in" style={{ width: `${cashbackRow.satisfied_customers}%` }}>&nbsp;</div>

                                                                                </div>
                                                                                <div className="per-calc level-right">
                                                                                    <h6>{cashbackRow.satisfied_customers}%</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="sp-speed-det">
                                                                            <h5>Avg Payment Speed<span><img src="/static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <h6>{cashbackRow.avg_payment_speed}</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sp-per-wrap">
                                                                        <div className="sp-speed-det sp-per-det">
                                                                            <h5>Avg Tracking Success Rate<span><img src="static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <div className="per-bar-wrap level">
                                                                                <div className="sp-per-bar level-left">
                                                                                    <div className="sp-bar-in" style={{ width: `${cashbackRow.auto_tracking_success}%` }}>&nbsp;</div>
                                                                                </div>
                                                                                <div className="per-calc level-right">
                                                                                    <h6>{cashbackRow.auto_tracking_success}%</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="sp-speed-det sp-manual">
                                                                            <h5>Manual Chase Possible?<span>
                                                                                <img src="static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <h6>
                                                                                <a className={`${cashbackRow.manual_chase_possible == 1 ? 'active' : ''}`}>Yes</a><i>|</i>
                                                                                <a className={`${cashbackRow.manual_chase_possible == 0 ? 'active' : ''}`}>No</a>
                                                                            </h6>
                                                                        </div>
                                                                        <div className="sp-speed-det sp-per-det">
                                                                            <h5>Manual Chase Required<span><img src="static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <div className="per-bar-wrap level">
                                                                                <div className="sp-per-bar level-left">
                                                                                    <div className="sp-bar-in" style={{ width: `${cashbackRow.manual_chase_required}%` }}>&nbsp;</div>
                                                                                </div>
                                                                                <div className="per-calc level-right">
                                                                                    <h6>{cashbackRow.manual_chase_required}%</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="sp-speed-det sp-per-det">
                                                                            <h5>Manual Chase Success Rate<span><img src="static/images/icons/info.png" alt="i" /></span></h5>
                                                                            <div className="per-bar-wrap level">
                                                                                <div className="sp-per-bar level-left">
                                                                                    <div className="sp-bar-in" style={{ width: `${cashbackRow.manual_chase_success_rate}%` }}>&nbsp;</div>
                                                                                </div>
                                                                                <div className="per-calc level-right">
                                                                                    <h6>{cashbackRow.manual_chase_success_rate}%</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cbk-get-offer column is-8">
                                                                <div className="cbk-get-wrap">
                                                                    {
                                                                        this.state.parentId ? <CashbackOffers onOpenTrackLink={this.onOpenTrackLink} valueType={valueType} offers={offers} /> : ''
                                                                    }
                                                                    <div className="vouch-wrap">
                                                                        <h4>Voucher codes &amp; offers</h4>
                                                                        {
                                                                            this.state.parentId ? <CashbackVouchers valueType={valueType} voucherCodes={voucherCodes} showCode={this.showCode} codeShow={this.state.codeShow} /> : ''
                                                                        }
                                                                    </div>

                                                                    <div className="term-accord-wrap">

                                                                        <h3>Terms &amp; Conditions and other useful information</h3>
                                                                        <div className="panel-group term-group">
                                                                            <Accordion allowZeroExpanded={true}>
                                                                                <AccordionItem >
                                                                                    <AccordionItemHeading>
                                                                                        <AccordionItemButton>

                                                                                            Additional Merchant Terms &amp; Conditions
                                                                                        </AccordionItemButton>
                                                                                    </AccordionItemHeading>
                                                                                    <AccordionItemPanel>

                                                                                        {
                                                                                            cashbackRow.merchant_tc_default === 1 ?
                                                                                                <p className="term-head-tit" style={{ color: '#8b8b8b' }}>
                                                                                                    Please note that the use of a  {cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} promotional/voucher code not posted
                                                                                                    and approved by Couponarbitrage.com,
                                                                                                    may affect your eligibility for cashback.
                                                                        {cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} cashback is available through
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Couponarbitrage.com on genuine, tracked transactions
                                                                            completed immediately and wholly online. {cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''} can be earned simply by clicking through to the
                                                                            merchant and shopping online as normal.</p>
                                                                                                :
                                                                                                <p className="term-head-tit" style={{ color: '#8b8b8b' }}>
                                                                                                    {cashbackRow.merchant_tc}
                                                                                                </p>
                                                                                        }


                                                                                    </AccordionItemPanel>
                                                                                </AccordionItem>

                                                                            </Accordion>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                    <div className="column is-3">
                                        {
                                            this.state.parentId ? <CashbackCategories menuUrl={this.state.menuUrl} parentId={this.state.parentId} /> : ''
                                        }

                                        {
                                            this.state.parentId ?
                                                <SimilarStores valueType={valueType} catId={this.state.catId} parentId={this.state.parentId} />
                                                : ''
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />
                {
                    this.state.parentId ? <CashbackCliamPopup
                        onCloseModal={this.onCloseModal}
                        onOpenModal={this.onOpenModal}
                        open={open}
                        valueType={valueType}
                        cashbackRow={cashbackRow}
                        popupData={this.state.popupData}
                        handleClaimSubmit={this.handleClaimSubmit}
                        error={error}
                        handleCheckBoxChange={this.handleCheckBoxChange}
                        handleInputChange={this.handleInputChange}
                        onTextFieldBlur={this.onTextFieldBlur}
                        parentId={this.state.parentId} /> : ''
                }

                {
                    this.state.parentId ? <ReviewPopup
                        onCloseModal={this.closeReviewModal}
                        open={this.state.reviewModal}
                        popupData={this.state.popupData}
                        handleReviewSubmit={this.handleReviewSubmit}
                        onStarClick={this.onStarClick}
                        error={error}
                        cashbackRow={cashbackRow}
                        handleInputChange={this.handleInputChange}
                        onTextFieldBlur={this.onTextFieldBlur}
                    /> : ''
                }
            </div>


        )
    }
})



