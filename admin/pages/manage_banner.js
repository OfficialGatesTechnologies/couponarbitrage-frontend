import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import CKEditor from "react-ckeditor-component";
import Image from 'react-image-resizer';

export default withRouter(class manage_banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            bannerData: {
                _id: '',
                bannerTitle: '',
              
                bannerFor: "home",
                bannerSubTitle: "",
                short_description: "",
                description: "",
                bannerUrl: "",
                metakey: "",
                metadesc: "",
                metadata: "",

            },
            errors: {
                bannerTitle: null,
           
                bannerFor: null,
                bannerSubTitle: null,
                short_description: null,
                description: null,
                bannerUrl: null,
                metakey: null,
                metadesc: null,
                metadata: null,

            },

            editForm: false,
        }


    }
    componentDidMount = () => {

        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })

        if (editId) {
            this.getBannerRow(editId);
        }
        this.getAllBanners();
    }

    getAllBanners = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/masterdata/all-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getBannerRow = (editId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/banner-row?_id=' + editId)
            .then(res => {
                var bannerData = res.data.results;
                this.setState({ bannerData: bannerData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/banners`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { bannerData } = this.state;
        const allFields = {
            bannerTitle: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(bannerData, 'bannerTitle', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            bannerImageFile: {
                message: "Please select valid file (.gif|.png|.jpg|.jpeg).",
                doValidate: () => {
                    const value = _.trim(_.get(bannerData, 'bannerImageFile', ""));
                    const fileValid = /(\.gif|.png|.jpg|.jpeg)$/i.test(value);
                    if (fileValid) {
                        return true;
                    }
                    return false;
                }
            },
            bannerFor: {
                message: "Please select bannerFor.",
                doValidate: () => {
                    const value = _.trim(_.get(bannerData, 'bannerFor', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },bannerUrl: {
                message: "Please enter the url.",
                doValidate: () => {
                    const value = _.trim(_.get(bannerData, 'bannerUrl', ""));
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
        const { changePass } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['bannerTitle', 'bannerImageFile', 'bannerFor','bannerUrl'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createBanner() : this.updateBanner();

            }
        });

    }
    createBanner = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { bannerData } = this.state;
        const data = new FormData();
        _.forOwn(bannerData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('bannerImageFile').files[0];
        data.append('file', tragetFile);
        data.set('bannerData', bannerData);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/create-banner', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/banner`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateBanner = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { bannerData } = this.state;
        const data = new FormData();
        _.forOwn(bannerData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('bannerImageFile').files[0];
        data.append('file', tragetFile);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-banner', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/banner`);
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
        const { bannerData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        bannerData[name] = value;

        this.setState({
            bannerData: bannerData
        })
    }
    handleEditorChange = (name, e) => {
        const { bannerData } = this.state;
        console.log('e.editor', e.editor);
        const value = e.editor.getData();
        bannerData[name] = value;
        this.setState({
            bannerData: bannerData
        })
    }


    render() {
        const { bannerData, error } = this.state;

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} - Banner </title>
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
                                        <li className="is-active"><a href="#">Banner Manager</a></li>
                                        <li>
                                            <Link href="/banner" as="/banner" prefetch>
                                                <a href="#">Banner  List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Banner </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Banner   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Banner For   </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(bannerData.bannerFor) ? bannerData.bannerFor : 0}`} name="bannerFor" onChange={this.handleInputChange}>
                                            <option value="home">home</option>
                                            <option value="feature"> Featured Offers</option>


                                        </select>

                                        <p className="help is-danger">{_.get(error, 'bannerFor')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Title  </label>
                                    <input className={"input " + (_.get(error, 'bannerTitle') ? ' is-danger' : '')} name="bannerTitle" type="text" placeholder="Title" value={bannerData.bannerTitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bannerTitle')}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Sub Title </label>
                                    <input className={"input " + (_.get(error, 'bannerSubTitle') ? ' is-danger' : '')} type="text" name="bannerSubTitle" placeholder="Sub Title" value={bannerData.bannerSubTitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bannerSubTitle')}</p>
                                </div>
                            </div>

                        </div>
                         
                         
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Banner Image    </label>
                                    {
                                        bannerData.bannerImageFile ?
                                            <Image
                                                src={`${apiUrl}resources/banner/${bannerData.bannerImageFile}`}
                                                width={250}
                                                height={170}

                                            /> : ''
                                    }

                                    <input className={" " + (_.get(error, 'bannerImageFile') ? ' is-danger' : '')} name="bannerImageFile" id="bannerImageFile" type="file"  onChange={this.handleInputChange} />
                                    <p className="help is-danger">{_.get(error, 'bannerImageFile')}</p>
                                </div>
                            </div>
                        </div>


                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Banner URL </label>
                                    <input className={"input " + (_.get(error, 'bannerUrl') ? ' is-danger' : '')} name="bannerUrl" type="text" placeholder="Meta title" value={bannerData.bannerUrl} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bannerUrl')}</p>
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




