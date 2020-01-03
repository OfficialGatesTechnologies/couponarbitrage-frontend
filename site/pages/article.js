import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import LearnSportsArbitrage_Top from '../components/Learn-sports-arbitrage-top';
import ArticleArbitrage from '../components/Article-arbitrage';
import { apiUrl } from '../utils/Common';
import Link from 'next/link';
import renderHTML from 'react-render-html';

export default withRouter(class LearnSportsArbitrage_whatissports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menuUrl: 'learn-sports-arbitrage',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            submenus: [],
            submenuRow:[],
            articleRow:[],
            parentRow: [],

        }
    }
    componentDidMount = () => {
        const url_key = this.props.router.query.url_key;

        this.getMenusList();
      
        if (url_key) {
            this.setState({ url_key: url_key, submenuRow: [] });

            setTimeout(() => { this.getArticleRow(); }, 500);
        } else {
            Router.push(`/`);
        }
    }
    getMenusList = () => {
        let listUrl = apiUrl + 'common/menu-row?link=' + this.state.menuUrl;
        axios.get(listUrl)
            .then(res => {
                var results = res.data.results;
                this.setState({
                    menuRow: results,
                    submenus: results.submenus,
                    parentId: results.id,
                    metaTitle: results.metatitle,
                    metakey: results.metakey,
                    metadesc: results.metadesc,
                });
            }).catch(() => {
               
            })
    }
    getArticleRow = () => {
        let listUrl = apiUrl + 'common/article-row?link=' + this.state.url_key;
        axios.get(listUrl)
            .then(res => {
                var results = res.data.results;
                console.log(results);
                this.setState({
                    articleRow: results,
                    parentRow: results.parentRow
                });
            }).catch(() => {
                Router.push(`/`);
            })
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Learn Sports Arbitrage</title>

                </Head>

                <HeaderIn />
                <div className="container">
                    <div className="inner-brd-crmp">
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>

                            <li><Link href="/learn-sports-arbitrage"><a>Learn Sports Arbitrage</a></Link></li>
                            <li><Link href="javascript:void(0);"><a>{this.state.parentRow.name}</a></Link></li>
                            <li><Link href="javascript:void(0);"><a>{this.state.articleRow.title}</a></Link></li>
                        </ul>
                    </div>
                </div>

                <div className="inner-wrapper">
                    <div className="container">
                        {
                            this.state.parentId ? <LearnSportsArbitrage_Top menuRow={this.state.menuRow} /> : ''
                        }
                        <div className="fwid learn-boxs learn-list mg-t-40 columns is-multiline is-variable is-0">
                            <div className="col-md-12 is-variable is-0 bg-white colors-box bread-crumbs-wrap">
                                <div className="row">
                                    <div className="fwid two-box bread-crumbs">
                                        <h3 className="bread-title">Learn Sports Arbitrage</h3>
                                        <h5><a>Learn Sports Arbitrage</a> &gt; <a>{this.state.parentRow ? this.state.parentRow.name : ''} </a>&gt; {this.state.articleRow ? this.state.articleRow.title : ''}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="fwid two-box">
                                        <h1><i className="icon-learnbox">&nbsp;</i> {this.state.parentRow ? this.state.parentRow.name : ''}</h1>
                                        {this.state.parentRow.description ? renderHTML(this.state.parentRow.description):''}</div>
                                </div>
                            </div>
                        </div>

 
                        

                        <ArticleArbitrage articleRow={this.state.articleRow} />
                    </div>

                </div>

                <Footer />
            </div>
        )
    }
})

