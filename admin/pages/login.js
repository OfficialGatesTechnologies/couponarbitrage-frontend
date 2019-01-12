 
 import React, { Component } from 'react';
import Head from 'next/head';
import LoginBox from '../components/LoginBox';
import {site_name} from '../utils/Common';
 
 
export default class Index extends Component {

    
    render () {
        
        return (
            <div>   
            <Head>
                <meta charSet="utf-8" />
                <title>{site_name} | Admin Controll Panel Login</title>        
            </Head>
            <LoginBox/>
        </div>
        )
    }
  
  
}

 

