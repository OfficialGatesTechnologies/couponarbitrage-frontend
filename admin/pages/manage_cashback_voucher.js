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
export default withRouter(class manage_cashback_voucher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            storeData: [],
            showvoucher_mode: '',
            offerData: {
                _id: '',
                store_id: "",
                voucher_title: '',
                voucher_mode: '',
                voucher_type: '',
                vouchers_code: '',
                voucher_summary: "",
                voucher_description: "",
                voucher_link: "",
                imageUrl: "",
                imageFile: "",
                issue_date: '',
                expiry_date: '',
                image_upload: "",
                vip_voucher: '',
            },
            errors: {
                store_id: null,
                voucher_title: null,
                voucher_mode: null,
                vouchers_code: null,
                voucher_summary: null,
                voucher_description: null,
                voucher_link: null,
                image_upload: null,
                issue_date: null,
                expiry_date: null,
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
            this.getRow(editId);
        }
        this.getDropDownData();
    }



    getRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/voucher-row?_id=' + editId)
            .then(res => {
                var offerData = res.data.results;

                this.setState({ offerData: offerData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_vouchers`);
                }
            })
    }

    getDropDownData = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/cashback-offer/get-all-stores')
            .then(res => {
                var storeData = res.data.results;
                this.setState({ storeData: storeData })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/cashback_vouchers`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { offerData } = this.state;
        const allFields = {
            store_id: {
                message: "Please select store.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'store_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            voucher_mode: {
                message: "Please select voucher Mode .",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'voucher_mode', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            voucher_type: {
                message: "Please select voucher type .",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'voucher_type', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            vouchers_code: {
                message: "Please enter the voucher code .",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'vouchers_code', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, voucher_title: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'voucher_title', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, voucher_link: {
                message: "Please enter the link.",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'voucher_link', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, image_upload: {
                message: "Please select upload type .",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'image_upload', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, imageFile: {
                message: "Please select an image. ",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'imageFile', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, imageUrl: {
                message: "Please enter the image url. ",
                doValidate: () => {
                    const value = _.trim(_.get(offerData, 'imageUrl', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
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
        const { offerData } = this.state;
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['store_id', 'voucher_mode', 'voucher_type','image_upload', 'voucher_title', 'voucher_link'];
        offerData.voucher_type == 'coupon'?fieldNeedToValidate.push('vouchers_code'):'';
        offerData.image_upload == '1'?fieldNeedToValidate.push('imageFile'):'';
        offerData.image_upload == '2'?fieldNeedToValidate.push('imageUrl'):'';
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createOffers() : this.updateOffers();

            }
        });

    }
    createOffers = () => {
        const { offerData } = this.state;
        const data = new FormData();
        _.forOwn(offerData, (value, key) => {
            data.set(key, value);
        });
        var tragetFile = '';
        const fileExist = document.getElementById('imageFile');
        if (typeof fileExist !== 'undefined' && fileExist !== null) {
            tragetFile = fileExist.files[0];
        }
        data.append('file', tragetFile);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/create-voucher', data).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_vouchers`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateOffers = () => {
        const { offerData } = this.state;
        const data = new FormData();
        _.forOwn(offerData, (value, key) => {
            data.set(key, value);
        });
        var tragetFile = '';
        const fileExist = document.getElementById('imageFile');
        if (typeof fileExist !== 'undefined' && fileExist !== null) {
            tragetFile = fileExist.files[0];
        }
        data.append('file', tragetFile);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/cashback-offer/update-voucher', data).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/cashback_vouchers`);
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
        const { offerData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        offerData[name] = value;
        this.setState({
            offerData: offerData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { offerData } = this.state;
        offerData[fieldName] = e.toLocaleDateString();
        this.setState({
            offerData: offerData
        })

    }

    render() {
        const { offerData, error } = this.state;


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
                                            <Link href="/cashback_vouchers" prefetch>
                                                <a href="#"> Cashback Voucher Codes  List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Cashback Voucher Code </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Voucher Code    Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Store    </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'store_id') ? ' is-danger' : '')} value={`${(offerData.store_id) ? offerData.store_id : null}`} name="store_id" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select Site</option>

                                            {
                                                this.state.storeData.length > 0 ?
                                                    this.state.storeData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.aid?dataRow.aid.name:''} - {dataRow.title}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'store_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Voucher Mode   </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'voucher_mode') ? ' is-danger' : '')} value={`${(offerData.voucher_mode) ? offerData.voucher_mode : null}`} name="voucher_mode" onChange={this.handleInputChange}>
                                            <option value="">Select Mode</option>
                                            <option value="web">Web</option>
                                            <option value="print">Print</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'voucher_mode')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Voucher Type    </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'voucher_type') ? ' is-danger' : '')} value={`${(offerData.voucher_type) ? offerData.voucher_type : null}`} name="voucher_type" onChange={this.handleInputChange}>
                                            <option value="">Select Type</option>
                                            <option value="coupon">Coupon</option>
                                            <option value="promotion">Promotion</option>
                                            <option value="freebie">Freebie</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'voucher_type')}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                offerData.voucher_type === 'coupon' ? <div className="column is-3">
                                    <div className="control">
                                        <label className="label has-text-grey">Voucher Code </label>
                                        <input className={"input " + (_.get(error, 'vouchers_code') ? ' is-danger' : '')} type="text" name="vouchers_code" placeholder="Code" value={offerData.vouchers_code} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                        <p className="help is-danger">{_.get(error, 'vouchers_code')}</p>
                                    </div>
                                </div> : ''
                            }





                        </div>
                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Title   </label>
                                    <input className={"input " + (_.get(error, 'voucher_title') ? ' is-danger' : '')} type="text" name="voucher_title" placeholder="Title" value={offerData.voucher_title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'voucher_title')}</p>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Link   </label>
                                    <input className={"input " + (_.get(error, 'voucher_link') ? ' is-danger' : '')} type="text" name="voucher_link" placeholder="URL" value={offerData.voucher_link} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'voucher_link')}</p>
                                </div>
                            </div>

                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Issue Date</label>
                                    <DayPickerInput value={offerData.issue_date} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'issue_date')} />

                                    <p className="help is-danger">{_.get(error, 'issue_date')}</p>

                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Expiry Date</label>
                                    <DayPickerInput value={offerData.expiry_date} inputProps={{ class: "input" }} onDayChange={this.handleDateChange.bind(this, 'expiry_date')} />

                                    <p className="help is-danger">{_.get(error, 'expiry_date')}</p>

                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Summary  </label>

                                    <textarea className={"textarea " + (_.get(error, 'voucher_summary') ? ' is-danger' : '')} name="voucher_summary" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={offerData.voucher_summary} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'voucher_summary')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Description  </label>

                                    <textarea className={"textarea " + (_.get(error, 'voucher_description') ? ' is-danger' : '')} name="voucher_description" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={offerData.voucher_description} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'voucher_description')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-3">
                                <div className="control">
                                    <label className="label has-text-grey">Image Upload Type ?</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(offerData.image_upload) ? offerData.image_upload : 0}`} name="image_upload" onChange={this.handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="1">Upload</option>
                                            <option value="2">URL</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'image_upload')}</p>
                                    </div>

                                </div>
                            </div>
                            {
                                offerData.image_upload == '1' ?
                                    <div className="column is-3">
                                        <div className="control">
                                            <label className="label has-text-grey">Upload</label>
                                            {
                                                offerData.imageFile ?
                                                    <Image
                                                        src={`${apiUrl}resources/vouchers/${offerData.imageFile}`}
                                                        width={100}
                                                        height={70}

                                                    /> : ''
                                            }

                                            <input type="file" name="imageFile" id="imageFile" onChange={this.handleInputChange} />
                                            <p className="help is-danger">{_.get(error, 'imageFile')}</p>
                                        </div>
                                    </div> : null
                            }
                            {
                                offerData.image_upload === '2' ? <div className="column is-6">
                                    <div className="control">
                                        <label className="label has-text-grey">URL   </label>
                                        <input className={"input " + (_.get(error, 'imageUrl') ? ' is-danger' : '')} type="text" name="imageUrl" placeholder="URL" value={offerData.imageUrl} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                        <p className="help is-danger">{_.get(error, 'imageUrl')}</p>
                                    </div>
                                </div> : ''
                            }



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




