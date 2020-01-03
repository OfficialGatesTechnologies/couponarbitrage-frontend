import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { site_name } from '../utils/Common';
import HeaderIn from '../components/Header-in';
import Footer from '../components/Footer';
import LearnSportsArbitrage_Top from '../components/Learn-sports-arbitrage-top';
import LearnSportsArbitrage_Box from '../components/Learn-sports-arbitrage-box';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { apiUrl } from '../utils/Common';

export default withRouter(class LearnSportsArbitrage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menuUrl: 'learn-sports-arbitrage',
            metaTitle: site_name,
            metakey: '',
            metadesc: '',
            metadata: '',
            submenus:[]


        }
    }
    componentDidMount = () => {
        this.getMenusList();

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
                Router.push(`/`);
            })
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
                    <div className="inner-brd-crmp">
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>

                            <li><Link href="javascript:void(0);"><a>Learn Sports Arbitrage</a></Link></li>
                        </ul>
                    </div>
                </div>

                <div className="inner-wrapper">
                    <div className="container">
                        {
                            this.state.parentId ? <LearnSportsArbitrage_Top menuRow={this.state.menuRow} /> : ''
                        }
                        {
                            this.state.parentId ? <LearnSportsArbitrage_Box menuRow={this.state.submenus} /> : ''
                        }   
                    </div>

                </div>

                <Footer />
            </div>
        )
    }
})

