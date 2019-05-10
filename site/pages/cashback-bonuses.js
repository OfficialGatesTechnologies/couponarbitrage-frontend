import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import TopTenOffers from '../components/cashback-offfers/top-ten-retailers';
import CashbackBanner from '../components/cashback-offfers/cashback-banner';
import CashbackWelcome from '../components/cashback-offfers/cashback-welcome';
import CashbackCategories from '../components/cashback-offfers/cashback-categories';
import CashbackListView from '../components/cashback-offfers/cashback-offer-list-view';
import CashbackGridView from '../components/cashback-offfers/cashback-offer-grid-view';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { apiUrl } from '../utils/Common';
export default withRouter(class Cashback_Bonuses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerList: [],
            loading: true,
            menuUrl: 'cashback-bonuses',
            subcat: '',
            parentId: '',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            listView: 'list',
            sortOrder: 'desc',
            sortKey: 'title',
            searchKey: '',
        }


    }
    componentDidMount = () => {
        this.getMenusList();
        const subcat = this.props.router.query.subcat;
        if (subcat) {
            this.setState({ subcat: subcat });
            setTimeout(() => { this.getCatRow(); }, 500);
        }


    }
    componentWillReceiveProps = (nextProps) => {
        const subcat = nextProps.router.query.subcat;
        if (subcat) {
            this.setState({ subcat: subcat, loading: true });
            setTimeout(() => { this.getCatRow(); }, 100);
        } else {
            this.setState({ subcat: '', loading: true });
            setTimeout(() => { this.getMenusList(); }, 100);
        }
    }
    getMenusList = () => {
        let listUrl = apiUrl + 'common/menu-row?link=' + this.state.menuUrl + '&subcat=' + this.state.subcat;
        axios.get(listUrl)
            .then(res => {
                var results = res.data.results;
                this.setState({
                    parentId: results.id,
                    metaTitle: results.metatitle,
                    metakey: results.metakey,
                    metadesc: results.metadesc,
                    metadata: results.metadata,
                });
                setTimeout(() => { this.getOffersList(); }, 100);
            }).catch(() => {
                Router.push(`/`);
            })
    }
    getCatRow = () => {
        let listUrl = apiUrl + 'common/cat-row?cat_url=' + this.state.subcat + '&parentId=' + this.state.parentId;
        axios.get(listUrl)
            .then(res => {
                var results = res.data.results;
                this.setState({
                    subcat: results._id
                });
                setTimeout(() => { this.getOffersList(); }, 100);
            }).catch(() => {

                Router.push(`/cashback-bonuses`);
            })
    }
    getOffersList = () => {
        this.setState({ loading: true });
        const { sortOrder, sortKey, searchKey } = this.state;
        let listUrl = apiUrl + 'offers/offer-list?pageLimit=100&parentId=' + this.state.parentId + '&subcat=' + this.state.subcat;
        if (sortOrder) { listUrl += '&sortOrder=' + sortOrder + '&sortKey=' + sortKey; }
        if (searchKey) { listUrl += '&searchKey=' + searchKey; }
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    offerList: res.data.results,
                    loading: false
                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }
    changeListView = (view, e) => {

        this.setState({ listView: view });
    }
    handleSort = (sortKey, sortOrder) => {
        sortOrder = (sortOrder == 'desc') ? 'asc' : 'desc';

        setTimeout(() => {
            this.setState({ sortOrder: sortOrder, sortKey: sortKey });
            this.getOffersList();
        }, 100);

    }
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSearch = (event) => {
        event.preventDefault();
        this.getOffersList();
    }
    render() {
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
                        <CashbackWelcome />
                        <div className="cbk-mid-banner">
                            <div className="columns">
                                <div className="column is-3">
                                    {
                                        this.state.parentId ? <TopTenOffers valueType="1" parentId={this.state.parentId} /> : ''
                                    }
                                </div>
                                <CashbackBanner />
                            </div>
                        </div>
                        {
                            this.state.parentId ? <CashbackCategories handleSearch={this.handleSearch} handleInputChange={this.handleInputChange} handleSort={this.handleSort} sortKey={this.state.sortKey} sortOrder={this.state.sortOrder} menuUrl={this.state.menuUrl} parentId={this.state.parentId} /> : ''
                        }

                        <div className="cbk-list-wrap">
                            <div className="columns">
                                <div className="column is-9">
                                    <div className="li-gr-btn">
                                        <a onClick={this.changeListView.bind(this, 'list')}><span className="fa fa-list"></span></a>
                                        <a onClick={this.changeListView.bind(this, 'grid')}><span className="fa fa-th"></span></a>
                                    </div>

                                    <div className="cbk-clm-list">
                                        <h2>Latest Offers</h2>

                                        {
                                            this.state.parentId && this.state.listView == 'list' ? <CashbackListView valueType="1" loading={this.state.loading} menuUrl={this.state.menuUrl} offerList={this.state.offerList} /> : ''
                                        }
                                        {
                                            this.state.parentId && this.state.listView == 'grid' ? <CashbackGridView valueType="1" loading={this.state.loading} menuUrl={this.state.menuUrl} offerList={this.state.offerList} /> : ''
                                        }
                                    </div>
                                </div>
                                <div className="column is-3">
                                    <div className="trnd-sec">
                                        <h5>Trending now</h5>
                                        <p>Based on member's activity</p>
                                        {/* <ul>
                                            <li>Heart-Bingo <span>£15</span></li>
                                            <li>JackpotJoy-Bingo <span>£25</span></li>
                                        </ul> */}
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
})



