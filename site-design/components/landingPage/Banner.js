import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import BannerForm from './BannerForm';
export default withRouter(class BannerImg extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="is-hidden-touch1">
                    <div className="bg-img-cover">
                    <img src="static/images/banner-img.jpg"/>
                     <BannerForm/>
                </div>
                   
                </div>
                
              
           </div> 
        )
    }
})





