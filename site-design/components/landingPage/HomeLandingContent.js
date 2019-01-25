import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import HomeJoinUs from '../HomeLandSections/HomeJoinUs';
import HomeArbsection from '../HomeLandSections/HomeArbsection';
import HomeSharbingSwsection from '../HomeLandSections/HomeSharbingSwsection';
import HomeGamlingsection from '../HomeLandSections/HomeGamlingsection';
import HomeTurnOversection from '../HomeLandSections/HomeTurnOversection';
import HomeSearchFavGamlingsection from '../HomeLandSections/HomeSearchFavGamlingsection';
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





