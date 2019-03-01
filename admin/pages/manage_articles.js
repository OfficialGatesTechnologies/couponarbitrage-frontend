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

export default withRouter(class manage_articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            articleData: {
                _id: '',
                title: '',
                title_alias: '',
                category: "",
                sub_title: "",
                short_description: "",
                description: "",
                metatitle: "",
                metakey: "",
                metadesc: "",
                metadata: "",

            },
            errors: {
                title: null,
                title_alias: null,
                category: null,
                sub_title: null,
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
        this.getAllArticles();
    }

    getAllArticles = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/article/all-list';
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
        axios.get(apiUrl + 'admin/article/article-row?_id=' + editId)
            .then(res => {
                var articleData = res.data.results;
                this.setState({ articleData: articleData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/articles`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { articleData } = this.state;
        const allFields = {
            title: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'title', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            title_alias: {
                message: "Please enter the link.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'title_alias', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            category: {
                message: "Please select category.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'category', ""));
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
        fieldNeedToValidate = ['title', 'title_alias', 'category'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createArticle() : this.updateArticle();

            }
        });

    }
    createArticle = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('imageFile').files[0];
        data.append('file', tragetFile);
        data.set('articleData', articleData);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/article/create-article', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/articles`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateArticle = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('imageFile').files[0];
        data.append('file', tragetFile);
 
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/article/update-article', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/articles`);
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
        console.log('e.editor', e.editor);
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
                                        <li className="is-active"><a href="#">Article Manager</a></li>
                                        <li>
                                            <Link href="/articles" as="/articles" prefetch>
                                                <a href="#">Article  List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Article </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Article   Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Title  </label>
                                    <input className={"input " + (_.get(error, 'title') ? ' is-danger' : '')} name="title" type="text" placeholder="Title" value={articleData.title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'title')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Link  </label>
                                    <input className={"input " + (_.get(error, 'title_alias') ? ' is-danger' : '')} name="title_alias" type="text" placeholder="Link" value={articleData.title_alias} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'title_alias')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                        <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Category  </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.category) ? articleData.category : 0}`} name="category" onChange={this.handleInputChange}>
                                            <option value="0">Select Category</option>

                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow._id}>{dataRow.name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'category')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Sub Title </label>
                                    <input className={"input " + (_.get(error, 'sub_title') ? ' is-danger' : '')} type="text" name="sub_title" placeholder="Sub Title" value={articleData.sub_title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'sub_title')}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="columns">
                        <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Short Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'short_description') ? ' is-danger' : '')} name="short_description" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={articleData.short_description} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'short_description')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                           
                           <div className="column is-12">
                               <div className="control">
                                   <label className="label has-text-grey">Description   </label>
                                   <CKEditor activeClass="p10"
                                       content={articleData.description}
                                       events={{

                                           "change": this.handleEditorChange.bind(this, 'description')
                                       }} />
                                   <p className="help is-danger">{_.get(error, 'description')}</p>
                               </div>
                           </div>
                       </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Banner Image    </label>
                                    {
                                        articleData.imageFile ?
                                            <Image
                                                src={`${apiUrl}resources/banner/${articleData.imageFile}`}
                                                width={250}
                                                height={170}

                                            /> : ''
                                    }

                                    <input className={" " + (_.get(error, 'imageFile') ? ' is-danger' : '')} name="imageFile" id="imageFile" type="file" />
                                    <p className="help is-danger">{_.get(error, 'imageFile')}</p>
                                </div>
                            </div>
                        </div>
                        

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Title </label>
                                    <input className={"input " + (_.get(error, 'metatitle') ? ' is-danger' : '')} name="metatitle" type="text" placeholder="Meta title" value={articleData.metatitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'metatitle')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Keywords </label>
                                    <textarea className={"textarea " + (_.get(error, 'metakey') ? ' is-danger' : '')} name="metakey" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={articleData.metakey} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'metakey')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'metadesc') ? ' is-danger' : '')} name="metadesc" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={articleData.metadesc} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'metadesc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Robots   </label>
                                    <div className="select is-fullwidth">
                                        <select name="metadata" onChange={this.handleInputChange}>
                                            <option value="INDEX, FOLLOW" >INDEX, FOLLOW</option>
                                            <option value="INDEX, NOFOLLOW">INDEX, NOFOLLOW</option>
                                            <option value="NOINDEX, FOLLOW">NOINDEX, FOLLOW</option>
                                            <option value="NOINDEX, NOFOLLOW">NOINDEX, NOFOLLOW</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'metadata')}</p>
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




