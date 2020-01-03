import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import HomeJoinUs from '../home-land-sections/Home-joinus';
import HomeArbsection from '../home-land-sections/Home-arb-section';
import HomeSharbingSwsection from '../home-land-sections/Home-sharbingsw-section';
import HomeGamlingsection from '../home-land-sections/Home-gamling-section';
import HomeTurnOversection from '../home-land-sections/Home-turn-over-section';
import HomeSearchFavGamlingsection from '../home-land-sections/Home-search-favgamling-section';
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





