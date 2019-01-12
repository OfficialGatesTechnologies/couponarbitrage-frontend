import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
 
export default withRouter(class manage_admin_accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                firstName: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
                privileges: "",
                accessModules: "",
                type: ""
            },

        }


    }
    componentDidMount = () => {
        const accoutId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {
               
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        
        if (accoutId) {
            this.getUserRow(accoutId);
        }
    }

    getUserRow = (accountid) => {
      
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/user/admin-row?_id=' + accountid)
            .then(res => {
                var userData = res.data.results;
               
                this.setState({   userData: userData })
            }).catch((error) => {
                if (error) {
                   
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/admin_accounts`);
                }
            })
    }
     
    
    

    
     
    
    
     

    render() {
        const { userData } = this.state;
        let accessModule = (userData.accessModules) ? userData.accessModules.join(',') : '';
        let accessPrivilege = (userData.privileges) ? userData.privileges.join(',') : '';
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} </title>
                </Head>
                <div className="page-wrapper" id="page-wrapper">
                    <div className="columns">
                        <div className="column">
                            <div className="box bread-box is-shadowless has-background-white">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li>
                                            <Link href="/dashboard" prefetch>
                                                <a href="#">Dashboard</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin_accounts" prefetch>
                                                <a href="#">Administrators</a>
                                            </Link>
                                        </li>
                                        <li className="is-active"><a href="#">View Admin Account</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Account Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Name </label>
                                    <p>{userData.firstName}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Username </label>
                                    <p>{userData.username}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">E-Mail </label>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Privileges </label>
                                    <p>{accessPrivilege}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Access modules  </label>
                                    <p>{accessModule}</p>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        )
    }

})




