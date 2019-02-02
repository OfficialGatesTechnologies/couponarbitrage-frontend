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

export default withRouter(class manage_cashback_stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            siteData: [],
            affData: [],
            bannerData: [],
            showUploadtype: '',
            storeData: {
                _id: '',
                aid: "",
                cat_id: '',
                network_id: "",
                title: "",
                uploadType: '',
                imageFile: "",
                details: "",
                details_default: "",
                banner: '',
                internal_banner: "",
                link: "",
                value: '',
                comm: "",
                valid_to: "",
                vaild_from: '',
                tweet: "",
                send_mail: "",
                vip_store: '',
                top_list: "",
                home_list: "",
                merchant_tc: '',
                merchant_tc_default: "",
                youtube_video: "",
                satisfied_customers: '',
                avg_payment_speed: "",
                auto_tracking_success: "",
                manual_chase_possible: '',
                manual_chase_required: "",
                manual_chase_success_rate: "",
                payment_performance: '',
                meta_title: "",
                meta_keywords: "",
                meta_description: '', 
            }, 
            errors: {
                aid: null,
                cat_id: null,
                network_id: null,
                title: null,
                uploadType: null,
                imageFile: null,
                details: null,
                banner: null,
                internal_banner: null,
                link: null,
                value: null,
                comm: null,
                valid_to: null,
                vaild_from: null,
                internal_banner: null,

            },

            editForm: false,
        }


    }
    componentDidMount = () => {
        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => { })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        if (editId) {
            this.getCatRow(editId);
        }
        this.getDropDownData();
    }



    getCatRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/store-row?_id=' + editId)
            .then(res => {
                var storeData = res.data.results;

                this.setState({ storeData: storeData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_stores`);
                }
            })
    }

    getDropDownData = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/get-drop-down-data')
            .then(res => {
                var catData = res.data.catRes;
                var siteData = res.data.results;
                var affData = res.data.affRes;
                var bannerData = res.data.bannerFileList;
                this.setState({ catData: catData, siteData: siteData, affData: affData, bannerData: bannerData })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_stores`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { storeData } = this.state;
        const allFields = {
            aid: {
                message: "Please select site.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'aid', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            cat_id: {
                message: "Please select category.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'cat_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            network_id: {
                message: "Please select a network.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'network_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            title: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'title', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            uploadType: {
                message: "Please select upload type.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'uploadType', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            imageFile: {
                message: "Please select an image. ",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'imageFile', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            details: {
                message: "Please enter description.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'details', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            banner: {
                message: "Please enter the banner.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'banner', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            internal_banner: {
                message: "Please select an internal banner.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'internal_banner', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            link: {
                message: "Please enter the link.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'link', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            value: {
                message: "Please enter the value.",
                doValidate: () => {
                    const value = _.trim(_.get(storeData, 'value', ""));
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
        const { storeData } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['aid', 'cat_id', 'network_id', 'title', 'uploadType', 'link', 'value'];
        this.state.showUploadtype ? fieldNeedToValidate.push(this.state.showUploadtype) : '';
        !storeData.details_default?fieldNeedToValidate.push('details'):fieldNeedToValidate.pop('details');
        console.log(fieldNeedToValidate);
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createStores() : this.updateStores();

            }
        });

    }
    createStores = () => {
        const { storeData } = this.state;

        const data = new FormData();
        _.forOwn(storeData, (value, key) => {
            data.set(key, value);
        });
        var tragetFile = '';
        const fileExist = document.getElementById('imageFile');
        if (typeof fileExist !== 'undefined' && fileExist !== null) {
            tragetFile = fileExist.files[0];
        }
        data.append('file', tragetFile);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/create-store', data).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
              Router.push(`/cashback_stores`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateStores = () => {
        const { storeData } = this.state;

        const data = new FormData();
        _.forOwn(storeData, (value, key) => {
            data.set(key, value);
        });
        var tragetFile = '';
        const fileExist = document.getElementById('imageFile');
        if (typeof fileExist !== 'undefined' && fileExist !== null) {
            tragetFile = fileExist.files[0];
        }
        data.append('file', tragetFile);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/update-store', data).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_stores`);
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
        const { storeData } = this.state;
        const target = e.target;
        var index = e.nativeEvent.target.selectedIndex;
        if (index && target.name === 'aid') {
            storeData['aidname'] = e.nativeEvent.target[index].text;
        }
        const value = target.value;
        const name = target.name;
        storeData[name] = value;
        this.setState({
            storeData: storeData
        })
         
    }
    handleDateChange = (fieldName, e) => {
        const { storeData } = this.state;
        storeData[fieldName] = e.toLocaleDateString();
        this.setState({
            storeData: storeData
        })

    }
    handleCheckBoxChange = (fieldName,e) =>{
        const { storeData } = this.state;
        storeData[fieldName] = e.target.checked?1:0;
        // details_default: "",   merchant_tc_default: "",
        this.setState({storeData: storeData});
    }
    render() {
        const { storeData, error } = this.state;


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
                                        <li className="is-active"><a href="#">Cashback Offers</a></li>
                                        <li>
                                            <Link href="/cashback_stores" prefetch>
                                                <a href="#"> Cashback Store List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Store </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Store   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Site   </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'aid') ? ' is-danger' : '')} value={`${(storeData.aid) ? storeData.aid : null}`} name="aid" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select Site</option>

                                            {
                                                this.state.siteData.length > 0 ?
                                                    this.state.siteData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'aid')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Category   </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'cat_id') ? ' is-danger' : '')} value={`${(storeData.cat_id) ? storeData.cat_id : null}`} name="cat_id" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select category</option>

                                            {
                                                this.state.catData.length > 0 ?
                                                    this.state.catData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.cat_title} - {dataRow.cat_parent.name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'cat_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Affiliate Network   </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'network_id') ? ' is-danger' : '')} value={`${(storeData.network_id) ? storeData.network_id : null}`} name="network_id" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select category</option>

                                            {
                                                this.state.affData.length > 0 ?
                                                    this.state.affData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.title}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'network_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Title</label>
                                    <input className={"input " + (_.get(error, 'title') ? ' is-danger' : '')} type="text" name="title" placeholder="Title" value={storeData.title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'title')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description  </label>
                                    <label className="label has-text-grey">Set Default? <input type="checkbox" name="details_default" onChange={this.handleCheckBoxChange.bind(this,'details_default')} checked={storeData.details_default} />  </label>
                                    <textarea disabled={storeData.details_default} className={"textarea " + (_.get(error, 'details') ? ' is-danger' : '')} name="details" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={storeData.details} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'details')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Upload Type  </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'uploadType') ? ' is-danger' : '')} value={`${(storeData.uploadType) ? storeData.uploadType : null}`} name="uploadType" onChange={this.handleInputChange}>
                                            <option value="">Select Type</option>
                                            <option value="banner">Banner</option>
                                            <option value="internal_banner">Choose Inernal</option>
                                            <option value="imageFile">Upload</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'uploadType')}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                storeData.uploadType == 'internal_banner' ? <div className="column is-4">
                                    <div className="control">
                                        <label className="label has-text-grey">Choose Internal  </label>
                                        <div className="select is-fullwidth">
                                            <select className={"input " + (_.get(error, 'internal_banner') ? ' is-danger' : '')} value={`${(storeData.internal_banner) ? storeData.internal_banner : null}`} name="internal_banner" onChange={this.handleInputChange}>
                                                <option value="">Select Type</option>
                                                {
                                                    this.state.bannerData.length > 0 ?
                                                        this.state.bannerData.map(function (dataRow, i) {

                                                            return (
                                                                <option key={i + 1} value={dataRow}>{dataRow}</option>

                                                            )

                                                        }) : ''
                                                }
                                            </select>
                                            <p className="help is-danger">{_.get(error, 'internal_banner')}</p>
                                        </div>
                                    </div>
                                </div> : null
                            }



                            {
                                storeData.uploadType == 'imageFile' ?
                                    <div className="column is-3">
                                        <div className="control">
                                            <label className="label has-text-grey">Upload</label>
                                            {
                                      this.state.editForm &&   storeData.imageFile ?
                                            <Image
                                                src={`${apiUrl}resources/cashbackbanners/${storeData.imageFile}`}
                                                width={100}
                                                height={70}

                                            /> : ''
                                    }

                                            <input type="file" name="imageFile" id="imageFile" onChange={this.handleInputChange} />






                                            <p className="help is-danger">{_.get(error, 'imageFile')}</p>
                                        </div>
                                    </div> : null
                            }




                        </div>
                        {
                            storeData.uploadType == 'banner' ? <div className="columns">
                                <div className="column is-12">
                                    <div className="control">
                                        <label className="label has-text-grey">Banner  </label>
                                        <textarea className={"textarea " + (_.get(error, 'banner') ? ' is-danger' : '')} name="banner" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={storeData.banner} ></textarea>
                                        <p className="help is-danger">{_.get(error, 'banner')}</p>
                                    </div>
                                </div>

                            </div> : null
                        }


                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Link </label>
                                    <input className={"input " + (_.get(error, 'link') ? ' is-danger' : '')} type="text" name="link" placeholder="Link" value={storeData.link} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'link')}</p>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Value </label>
                                    <input className={"input " + (_.get(error, 'value') ? ' is-danger' : '')} type="text" name="value" placeholder="Value" value={storeData.value} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'value')}</p>
                                </div>
                            </div>

                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Commission</label>
                                    <input className={"input " + (_.get(error, 'comm') ? ' is-danger' : '')} type="text" name="comm" placeholder="Commission" value={storeData.comm} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'comm')}</p>
                                </div>
                            </div>



                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Tweet </label>
                                    <textarea className={"textarea " + (_.get(error, 'tweet') ? ' is-danger' : '')} name="tweet" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={storeData.tweet} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'tweet')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Merchant Terms & Conditions </label>
                                    <label className="label has-text-grey">Set Default? <input type="checkbox" name="merchant_tc_default" onChange={this.handleCheckBoxChange.bind(this,'merchant_tc_default')} checked={storeData.merchant_tc_default} />  </label>
                                    <textarea disabled={storeData.merchant_tc_default} className={"textarea " + (_.get(error, 'merchant_tc') ? ' is-danger' : '')} name="merchant_tc" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={storeData.merchant_tc} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'merchant_tc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Vaild From</label>
                                    <DayPickerInput value ={storeData.vaild_from} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'vaild_from')} />

                                    <p className="help is-danger">{_.get(error, 'vaild_from')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Leave it blank for active from now</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Vaild To</label>
                                    <DayPickerInput value ={storeData.valid_to} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'valid_to')} />

                                    <p className="help is-danger">{_.get(error, 'valid_to')}</p>
                                    <p style={{ fontSize: '10px', color: "#00F" }}>Leave it blank for never expires</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Youtube Video</label>
                                    <input className={"input " + (_.get(error, 'youtube_video') ? ' is-danger' : '')} type="text" name="youtube_video" placeholder="Youtube URL" value={storeData.youtube_video} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'youtube_video')}</p>
                                    <p style={{ fontSize: '10px', color: "red" }}>Ex: https://www.youtube.com/watch?v=iNXv5UMTBMU OR iNXv5UMTBMU</p>
                                </div>
                            </div>

                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Tracking Statistics (%)  </h3>
                        <hr></hr>

                        <div className="columns">

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Satisfied Customers</label>
                                    <input className={"input " + (_.get(error, 'satisfied_customers') ? ' is-danger' : '')} type="text" name="satisfied_customers" placeholder="Satisfied Customers %" value={storeData.satisfied_customers} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'satisfied_customers')}</p>

                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Avg Payment Speed</label>
                                    <input className={"input " + (_.get(error, 'avg_payment_speed') ? ' is-danger' : '')} type="text" name="avg_payment_speed" placeholder="Avg Payment Speed %" value={storeData.avg_payment_speed} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'avg_payment_speed')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Auto-Tracking Success</label>
                                    <input className={"input " + (_.get(error, 'auto_tracking_success') ? ' is-danger' : '')} type="text" name="auto_tracking_success" placeholder="Auto-Tracking Success %" value={storeData.auto_tracking_success} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'auto_tracking_success')}</p>

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase required</label>
                                    <input className={"input " + (_.get(error, 'manual_chase_possible') ? ' is-danger' : '')} type="text" name="manual_chase_possible" placeholder="Manual Chase required %" value={storeData.manual_chase_possible} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'manual_chase_possible')}</p>

                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase Success Rate</label>
                                    <input className={"input " + (_.get(error, 'manual_chase_success_rate') ? ' is-danger' : '')} type="text" name="manual_chase_success_rate" placeholder="Manual Chase Success Rate %" value={storeData.manual_chase_success_rate} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'manual_chase_success_rate')}</p>

                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Manual Chase Possible ?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(storeData.manual_chase_required) ? storeData.manual_chase_required : null}`} name="manual_chase_required" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Active</option>
                                            <option value="0">In-Active</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'cat_parent')}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Payment Performance</label>
                                    <input className={"input " + (_.get(error, 'payment_performance') ? ' is-danger' : '')} type="text" name="payment_performance" placeholder="Auto-Tracking Success %" value={storeData.payment_performance} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'payment_performance')}</p>

                                </div>
                            </div>

                        </div>
                        <h3 className="title is-size-5 has-text-grey-dark is-marginless">Meta Info </h3>
                        <hr></hr>
                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Title</label>
                                    <input className={"input " + (_.get(error, 'meta_title') ? ' is-danger' : '')} type="text" name="meta_title" placeholder="Meta Title" value={storeData.meta_title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'meta_title')}</p>

                                </div>
                            </div>

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Keywords</label>

                                    <input className={"input " + (_.get(error, 'meta_keywords') ? ' is-danger' : '')} type="text" name="meta_keywords" placeholder="Meta Keywords" value={storeData.meta_keywords} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'meta_keywords')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'meta_description') ? ' is-danger' : '')} name="meta_description" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={storeData.meta_description} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'meta_description')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Send Mail?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(storeData.send_mail) ? storeData.send_mail : null}`} name="send_mail" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'send_mail')}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">VIP ?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(storeData.vip_store) ? storeData.vip_store : null}`} name="vip_store" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'vip_store')}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Top 10 List ?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(storeData.top_list) ? storeData.top_list : null}`} name="top_list" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'top_list')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Home Page ? </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(storeData.home_list) ? storeData.home_list : null}`} name="home_list" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'home_list')}</p>
                                    </div>
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




