import React, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { site_name, apiUrl, getCountries } from '../utils/Common';
import { withRouter } from 'next/router';
import Router from 'next/router';
import HeaderIn from '../components/header-in';
import Footer from '../components/footer';
import MyAccountMidMenu from '../components/my-account/my-account-mid-menu';
import MyAccountTop from '../components/my-account/my-account-top';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import _ from 'lodash';
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                name: '',
                last_name: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
                accountPhone: "",
                accountCountry: "",
             
            },
            errors: {
                name: null,
                last_name: null,
                username: null,
                email: null,
                password: null,
                cpassword: null,
                
            },
            disableBtn: false
        }
    }
    componentDidMount = () => {

        axios.defaults.headers.common['Authorization'] = jsCookie.get('jwtToken');
        axios.get(apiUrl + 'auth/check-auth')
            .then(res => {
                let userData = res.data;
                this.setState({
                    userData: userData,
                });
            }).catch(() => {
                Router.push(`/signin`);
            })

    }


    render() {
        const { error, userData } = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Profile</title>


                </Head>

                <HeaderIn />
                <div className="container">
                    <div className="inner-brd-crmp">
                        <ul>
                            <li>
                                <Link href="/"><a>Home</a></Link></li>
                            <li>
                                <Link href="javascript:void(0);"><a>My Account</a></Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="inner-wrapper">
                    <div className="container">
                        <MyAccountTop userData={this.state.userData} />
                        <MyAccountMidMenu />


                        <div className="fwid mg-t-40">
                            <div className="fwid new-title has-text-left">
                                <h1><span className="tables-title">Update Profile</span></h1>
                            </div>
                            <div className="fwid bg-white">
                                <div className="fwid text-left pd-20 sec-wraps is-inline-block is-fullwidth">
                                    <div className="panel pan-border-color-cus">
                                        <p className="panel-heading pan-border-color-cus bg-head">
                                            Update your profile </p>
                                        <div className="panel-block pan-border-color-cus">
                                            <span className="is-fullwidth max-panel-bdy">

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">First Name</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className={"input " + (_.get(error, 'name') ? ' is-danger' : '')} name="name" type="text" placeholder="Name" value={userData.name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                                <p className="help is-danger">{_.get(error, 'name')}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Last Name</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className={"input " + (_.get(error, 'last_name') ? ' is-danger' : '')} type="text" name="last_name" placeholder="last name" value={userData.last_name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                                <p className="help is-danger">{_.get(error, 'last_name')}</p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Username</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" placeholder="Username" value={userData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                                <p className="help is-danger">{_.get(error, 'username')}</p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Email</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className={"input " + (_.get(error, 'email') ? ' is-danger' : '')} name="email" type="text" placeholder="E-Mail" value={userData.email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                                                <p className="help is-danger">{_.get(error, 'email')}</p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Password</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" name="Password" id="Password" type="password" />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Confirm your password</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" name="ConPassword" id="ConPassword" type="password" />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Date of Birth</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" name="DateOfBirth" id="DateOfBirth" type="text" />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Country</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <div className="select">

                                                                    <select className="is-hovered w-250" value={`${(userData.accountCountry) ? userData.accountCountry : null}`} name="accountCountry" onChange={this.handleInputChange}>
                                                                        <option value="">Select Country</option>

                                                                        {getCountries().map(country => (



                                                                            <option value={country.code}>{country.name}</option>
                                                                        ))}

                                                                    </select>
                                                                    <p className="help is-danger">{_.get(error, 'accountCountry')}</p>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Phone</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" name="DateOfBirth" id="DateOfBirth" type="text" />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-weight-light has-text-grey-light">Address</label>
                                                    </div>
                                                    <div className="field-body">
                                                        <div className="field">
                                                            <div className="control">
                                                                <textarea className="textarea is-small has-fixed-size" name="DateOfBirth" id="DateOfBirth" type="text"></textarea>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="field is-horizontal">
                                                    <div className="field is-block cus-button-right-pd">
                                                        <button name="skrillBut" type="submit" id="skrillBut" className="btn purple-btn mg-t20" value="Register">Submit</button>
                                                    </div>
                                                </div>


                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <Footer />
            </div>
        )
    }
});

