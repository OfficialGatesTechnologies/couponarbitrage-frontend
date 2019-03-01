import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class manage_articles_commands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            articleData: {
                _id: '',
                commentEmail: '',
                articleId: "",
                commentName: "",
                commentDesc: "",
            },
            errors: {
                commentEmail: null,
                articleId: null,
                commentName: null,
                commentDesc: null,
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
            this.getArticleCommentRow(editId);
        }
        this.getAllArticles();
    }

    getAllArticles = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/article/all-article-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getArticleCommentRow = (editId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/article/comment-row?_id=' + editId)
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
            articleId: {
                message: "Please select article.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'articleId', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            commentName: {
                message: "Please enter the name.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'commentName', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            commentEmail: {
                message: "Please enter the email.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'commentEmail', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, commentDesc: {
                message: "Please enter the comments.",
                doValidate: () => {
                    const value = _.trim(_.get(articleData, 'commentDesc', ""));
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
        let fieldNeedToValidate = [];
        fieldNeedToValidate = ['articleId', 'commentName', 'commentEmail', 'commentDesc'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createArticleComment() : this.updateArticleComment();

            }
        });

    }
    createArticleComment = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/article/create-comment', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/articles_commands`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateArticleComment = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { articleData } = this.state;
        const data = new FormData();
        _.forOwn(articleData, (value, key) => {
            data.set(key, value);
        });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/article/update-comment', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/articles_commands`);
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
                                            <Link href="/articles_commands" as="/articles_commands" prefetch>
                                                <a href="#">Comment List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Comment </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Comment   Info  </h2>
                        <hr></hr>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Article  </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(articleData.articleId) ? articleData.articleId : 0}`} name="articleId" onChange={this.handleInputChange}>
                                            <option value="0">Select Category</option>

                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow._id}>{dataRow.title}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'articleId')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Name </label>
                                    <input className={"input " + (_.get(error, 'commentName') ? ' is-danger' : '')} type="text" name="commentName" placeholder="Sub Title" value={articleData.commentName} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'commentName')}</p>
                                </div>
                            </div>

                        </div>
                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Email  </label>
                                    <input className={"input " + (_.get(error, 'commentEmail') ? ' is-danger' : '')} name="commentEmail" type="text" placeholder="Link" value={articleData.commentEmail} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'commentEmail')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Comment </label>
                                    <textarea className={"textarea " + (_.get(error, 'commentDesc') ? ' is-danger' : '')} name="commentDesc" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={articleData.commentDesc} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'commentDesc')}</p>
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




