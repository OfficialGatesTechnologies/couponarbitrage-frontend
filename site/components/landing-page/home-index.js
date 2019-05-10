import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Header from './header';
import Footer from '../footer';
import BannerImg from './banner';
import HomeLandingContent from './home-landing-content';

 
export default withRouter(class HomeIndex extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            <div>
                 <Header />
                 <BannerImg />
                 <HomeLandingContent/>
                <Footer />
            </div>
        )
    }
})





