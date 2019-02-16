import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Image from 'react-image-resizer';

export default withRouter(class site_settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            siteData: [],
            affData: [],
            bannerData: [],
            showUploadtype: '',
            configData: {
                _id: '',
                config_module:'GeneralSitewide',
                facebook_url:'',
                twitter_url:'',
                google_url:'',
                instagram_url:'',
                adwords_id:'',
                adwords_status:'',
                sbobet_cashback_fromdate:'',
                sbobet_cashback_todate:'',
                sbobet_cashback:'',
                skrill_cashback_value:'',
                sbobet_cashback_value:'',
                neteller_cashback_value:'',
                ecopayz_cashback_value:'',
                app_status:'',
                app_link:'',
                app_version:'',
               
            },
            errors: {
            },

            editForm: false,
        }


    }
    componentDidMount = () => {
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => { })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
       
            this.getConfigRow();
        
      
    }



    getConfigRow = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/config-row?module=GeneralSitewide')
            .then(res => {
                if(res.data.success){
                    var configData = res.data.results;
                    this.setState({ configData: configData, editForm: true })
                }
                
            }).catch((error) => {
                if (error) {
                    
                }
            })
    }

   
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { configData } = this.state;
        const allFields = {
            aid: {
                message: "Please select site.",
                doValidate: () => {
                    const value = _.trim(_.get(configData, 'aid', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }
        };
        let errors = this.state.errors;
        _.each(fieldsToValidate, (field) => {
            const fieldValidate = _.get(allFields, field);
            if (fieldValidate) {
                errors[field] = null;
                const isFieldValid = fieldValidate.doValidate();
                if (isFieldValid === false) {
                    errors[field] = _.get(fieldValidate, 'message');
                }
            }
        });
        this.setState({
            error: errors,
        }, () => {
            let isValid = true;
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                }
            });
            callback(isValid);
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { configData } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = [];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                this.updateConfig();
            }
        });

    }
     
    updateConfig = () => {
        const { configData } = this.state;
        const data = new FormData();
        _.forOwn(configData, (value, key) => {
            data.set(key, value);
        });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-config', data).then((result) => {
            let sucMsg = result.data.msg;
            setTimeout(() => { this.getConfigRow(); }, 300);
            toastr.success(sucMsg, '');
            Router.push(`/site_settings`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }

    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);
    }
    handleInputChange = (e) => {
        const { configData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        configData[name] = value;
        this.setState({
            configData: configData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { configData } = this.state;
        configData[fieldName] = e.toLocaleDateString();
        this.setState({
            configData: configData
        })

    }

    render() {
        const { configData, error } = this.state;


        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Settings </title>
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
                                        <li className="is-active"><a href="#">Settings</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Site Settings </h2>
                        <hr></hr>
                        <h2 className="title is-size-5 has-text-grey-dark  is-marginless">SBObet Cashback Value (Promotions ) </h2>
                        <hr></hr>
                        <div className="columns">

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">From Date</label>
                                    <DayPickerInput value={configData.sbobet_cashback_fromdate} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'sbobet_cashback_fromdate')} />

                                    <p className="help is-danger">{_.get(error, 'sbobet_cashback_fromdate')}</p>
                                
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">To Date</label>
                                    <DayPickerInput value={configData.sbobet_cashback_todate} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'sbobet_cashback_todate')} />

                                    <p className="help is-danger">{_.get(error, 'sbobet_cashback_todate')}</p>
                                  
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Cashback Value (%)</label>
                                    <input className={"input " + (_.get(error, 'sbobet_cashback') ? ' is-danger' : '')} type="text" name="sbobet_cashback" placeholder="Value" value={configData.sbobet_cashback} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'sbobet_cashback')}</p>

                                </div>
                            </div>
                        </div>
                        <h2 className="title is-size-5 has-text-grey-dark  is-marginless">Turnover Cashback  Scheme </h2>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Skrill Cashback Value</label>
                                    <input className={"input " + (_.get(error, 'skrill_cashback_value') ? ' is-danger' : '')} type="text" name="skrill_cashback_value" placeholder="Value" value={configData.skrill_cashback_value} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'skrill_cashback_value')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Default: 50%</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">SBOBet Cashback Value</label>
                                    <input className={"input " + (_.get(error, 'sbobet_cashback_value') ? ' is-danger' : '')} type="text" name="sbobet_cashback_value" placeholder="Value" value={configData.sbobet_cashback_value} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'sbobet_cashback_value')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Default: 0.25%</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">NETELLER Cashback Value</label>
                                    <input className={"input " + (_.get(error, 'neteller_cashback_value') ? ' is-danger' : '')} type="text" name="neteller_cashback_value" placeholder="Value" value={configData.neteller_cashback_value} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'neteller_cashback_value')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Default: 100%</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Ecopayz Cashback Value</label>
                                    <input className={"input " + (_.get(error, 'ecopayz_cashback_value') ? ' is-danger' : '')} type="text" name="ecopayz_cashback_value" placeholder="Value" value={configData.ecopayz_cashback_value} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'ecopayz_cashback_value')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Default: 78.50%</p>
                                </div>
                            </div>

                        </div>

                        <h2 className="title is-size-5 has-text-grey-dark  is-marginless">Social Media Settings </h2>
                        <hr></hr>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Facebook</label>
                                    <input className={"input " + (_.get(error, 'facebook_url') ? ' is-danger' : '')} type="text" name="facebook_url" placeholder="URL" value={configData.facebook_url} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'facebook_url')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Twitter</label>
                                    <input className={"input " + (_.get(error, 'twitter_url') ? ' is-danger' : '')} type="text" name="twitter_url" placeholder="URL" value={configData.twitter_url} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'twitter_url')}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Google Plus</label>
                                    <input className={"input " + (_.get(error, 'google_url') ? ' is-danger' : '')} type="text" name="google_url" placeholder="URL" value={configData.google_url} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'google_url')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Instagram Url</label>
                                    <input className={"input " + (_.get(error, 'instagram_url') ? ' is-danger' : '')} type="text" name="instagram_url" placeholder="URL" value={configData.instagram_url} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'instagram_url')}</p>
                                </div>
                            </div>

                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Android Application Settings </h3>
                        <hr></hr>
                        <div className="columns">
                        <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Application Status</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(configData.app_status) ? configData.app_status : null}`} name="app_status" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'app_status')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Application Link</label>
                                    <input className={"input " + (_.get(error, 'app_link') ? ' is-danger' : '')} type="text" name="app_link" placeholder="Meta Title" value={configData.app_link} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'app_link')}</p>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Application Version</label>

                                    <input className={"input " + (_.get(error, 'app_version') ? ' is-danger' : '')} type="text" name="app_version" placeholder="Meta Keywords" value={configData.app_version} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'app_version')}</p>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="columns">
                            <div className="column is-6">
                                <p className="buttons">
                                    <button onClick={this.handleSubmit} className="button is-theme">Submit </button>
                                </p>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        )
    }

})




