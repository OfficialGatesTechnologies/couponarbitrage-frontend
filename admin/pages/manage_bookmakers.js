import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import Image from 'react-image-resizer';

export default withRouter(class manage_mookmakers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            articleData: {
                _id: '',
                bm_name: '',
                bm_id: '',
                bm_tag : "",
                bm_affiliate_link: "",
                short_description: "",
                description: "",
                metatitle: "",
                metakey: "",
                metadesc: "",
                metadata: "",

            },
            errors: {
                bm_name: null,
                bm_id: null,
                bm_tag : null,
                bm_affiliate_link: null,
                short_description: null,
                description: null,           
                metatitle: null,
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
            this.getArticleRow(editId);
        }
        this.getAllBookmaker();
    }

    getAllBookmaker = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/bookmaker/all-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getArticleRow = (editId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/bookmaker/bookmaker-row?_id=' + editId)
            .then(res => {
                var articleData = res.data.results;
                this.setState({ articleData: articleData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/bookmakers`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { articleData } = this.state;
        const allFields = {
        
            bm_name : {
                message: "Please enter the name.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'bm_name', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            bm_id: {
                message: "Please enter the link.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'bm_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            bm_tag: {
                message: "Please select a tag .",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'bm_tag', ""));
                    if (value.length > 0 && value != 0) {
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
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['bm_tag','bm_name', 'bm_id', 'bm_tag '];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createBookmaker() : this.updateBookmaker();
            }
        });

    }
    createBookmaker = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('bm_logo').files[0];
        data.append('file', tragetFile);
        data.set('articleData', articleData);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/create-bookmaker', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/bookmakers`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateBookmaker = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('bm_logo').files[0];
        data.append('file', tragetFile);
 
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/bookmaker/update-bookmaker', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/bookmakers`);
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
        const { articleData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        articleData[name] = value;
        this.setState({
            articleData: articleData
        })
    }
    handleEditorChange = (name, e) => {
        const { articleData } = this.state;
        const value = e.editor.getData();
        articleData[name] = value;
        this.setState({
            articleData: articleData
        })
    }


    render() {
        const { articleData, error } = this.state;

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
                                        <li className="is-active"><a href="#">Betting Settings</a></li>
                                        <li>
                                            <Link href="/bookmakers" as="/bookmakers" prefetch>
                                                <a href="#">Bookmakers   List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Bookmaker </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Bookmaker  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                        <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Bookmaker Tag Name   </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.bm_tag ) ? articleData.bm_tag  : 0}`} name="bm_tag" onChange={this.handleInputChange}>
                                            <option value="0">Select Tag</option>

                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow._id}>{dataRow.tagName}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'bm_tag')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Bookmaker Name   </label>
                                    <input className={"input " + (_.get(error, 'bm_name') ? ' is-danger' : '')} name="bm_name" type="text" placeholder="Name" value={articleData.bm_name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bm_name')}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="columns">
                        <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Bookmaker Id   </label>
                                    <input className={"input " + (_.get(error, 'bm_id') ? ' is-danger' : '')} name="bm_id" type="text" placeholder="Link" value={articleData.bm_id} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bm_id')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Bookmaker Affiliate Link  </label>
                                    <input className={"input " + (_.get(error, 'bm_affiliate_link') ? ' is-danger' : '')} type="text" name="bm_affiliate_link" placeholder="Sub Title" value={articleData.bm_affiliate_link} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'bm_affiliate_link')}</p>
                                </div>
                            </div>
                            
                        </div>
                         
                        
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Logo      </label>
                                    {
                                        articleData.bm_logo ?
                                            <Image
                                                src={`${apiUrl}resources/bookmaker/${articleData.bm_logo}`}
                                                width={84}
                                                height={23}

                                            /> : ''
                                    }

                                    <input className={" " + (_.get(error, 'bm_logo') ? ' is-danger' : '')} name="bm_logo" id="bm_logo" type="file" />
                                    <p className="help is-danger">{_.get(error, 'bm_logo')}</p>
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




