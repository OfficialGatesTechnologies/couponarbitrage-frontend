import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';
import EcopayzCashbackScheme_Top from './ecopayz-cashback-scheme-top';


// import BannerFormJoin from '../components/BannerFormJoin';
export default withRouter(class EcopayzCashbackScheme extends Component {

    state = {

    }
    componentDidMount = () => {
        
    }
    render() {

        return (
            <div>
                 <EcopayzCashbackScheme_Top/>
                 
            </div>
        )
    }
})





