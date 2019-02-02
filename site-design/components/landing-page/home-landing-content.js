import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import HomeJoinUs from '../home-land-sections/home-joinus';
import HomeArbsection from '../home-land-sections/home-arb-section';
import HomeSharbingSwsection from '../home-land-sections/home-sharbingsw-section';
import HomeGamlingsection from '../home-land-sections/home-gamling-section';
import HomeTurnOversection from '../home-land-sections/home-turn-over-section';
import HomeSearchFavGamlingsection from '../home-land-sections/home-search-favgamling-section';
export default withRouter(class HomeLandingContent extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                
                <HomeJoinUs/>
                <HomeArbsection/>
                <HomeSharbingSwsection/>
                <HomeGamlingsection/>
                <HomeTurnOversection/>
                <HomeSearchFavGamlingsection/>
              
           </div> 
        )
    }
})





