 
import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router'
import {site_name,apiUrl} from '../utils/Common';
import axios from 'axios';
 
export default class Index extends Component {
    
    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(res => {
                
                Router.push(`/dashboard`);
            }).catch((error) => {  Router.push(`/login`);})
    }
    render () {
        
        return (
            <div>   
            <Head>
                <meta charSet="utf-8" />
                <title>{site_name} | Admin Controll Panel Login</title>        
            </Head>
           
        </div>
        )
    }
  
  
}

 

