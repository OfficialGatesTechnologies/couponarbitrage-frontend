import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import _ from 'lodash';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Link from 'next/link';
import { site_name, apiUrl, siteUrl } from '../utils/Common';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie';
toast.configure();
export default withRouter(class Logout extends Component {
    constructor(props) {
        super(props);

    }
  
    componentDidMount = () => {
        jsCookie.remove('jwtToken');
        window.location = "/";
        
    }
    
    render() {
      
        return (
            <div>
               <p>Please wait...</p>
            </div>
        )
    }
})

