import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Header from './Header';
import Footer from '../Footer';
import BannerImg from './Banner';
import HomeLandingContent from './Home-landing-content';

 
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





