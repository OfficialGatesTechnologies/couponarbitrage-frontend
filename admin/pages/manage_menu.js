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

export default withRouter(class manage_menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            menuData: {
                _id: '',
                name: '',
                type: '',
                link: "",
                parent: "",
                access: 0,
                ordering: "",
                introtext: "",
                description: "",
                defaultMenuItem: "",
                metatitle: "",
                metakey: "",
                metadesc: "",
                metadata: "",

            },
            errors: {
                name: null,
                type: null,
                link: null,
                parent: null,
                access: null,
                ordering: null,
                introtext: null,
                description: null,
                defaultMenuItem: null,
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
            this.getUserRow(editId);
        }
        this.getAllMenus(editId);
    }

    getAllMenus = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        let listUrl = apiUrl + 'admin/menu/all-list';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                });
            }).catch(() => {
                this.setState({ loading: false });

            })
    }

    getUserRow = (editId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/menu/menu-row?_id=' + editId)
            .then(res => {
                var menuData = res.data.results;
                this.setState({ menuData: menuData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/menus`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { menuData } = this.state;
        const allFields = {
            name: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(menuData, 'name', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            link: {
                message: "Please enter the link.",
                doValidate: () => {
                    const value = _.trim(_.get(menuData, 'link', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            type: {
                message: "Please select menu type.",
                doValidate: () => {
                    const value = _.trim(_.get(menuData, 'type', ""));
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
        if (changePass || this.state.editForm === false) {
            fieldNeedToValidate = ['name', 'link', 'type'];
        } else {
            fieldNeedToValidate = ['name', 'link', 'type'];
        }
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createMenu() : this.updateMenu();

            }
        });

    }
    createMenu = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { menuData } = this.state;
        const data = new FormData();
        _.forOwn(menuData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('imageFile').files[0];
        data.append('file', tragetFile);
        data.set('menuData', menuData);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/menu/create-menu', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/menus`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateMenu = () => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { menuData } = this.state;
        const data = new FormData();
        _.forOwn(menuData, (value, key) => {
            data.set(key, value);
        });

        const tragetFile = document.getElementById('imageFile').files[0];
        data.append('file', tragetFile);
        data.set('menuData', menuData);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/menu/update-menu', data, config).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/menus`);
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
        const { menuData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        menuData[name] = value;

        this.setState({
            menuData: menuData
        })
    }
    handleEditorChange = (name, e) => {
        const { menuData } = this.state;
        console.log('e.editor', e.editor);
        const value = e.editor.getData();
        menuData[name] = value;
        this.setState({
            menuData: menuData
        })
    }


    render() {
        const { menuData, error } = this.state;

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
                                        <li className="is-active"><a href="#">Menu Manager</a></li>
                                        <li>
                                            <Link href="/menus" as="/menus" prefetch>
                                                <a href="#">Menu Items List</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Menu Item</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Menu Item  Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Title  </label>
                                    <input className={"input " + (_.get(error, 'name') ? ' is-danger' : '')} name="name" type="text" placeholder="Title" value={menuData.name} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'name')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Menu Type</label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(menuData.type) ? menuData.type : 0}`} className={" " + (_.get(error, 'type') ? ' is-danger' : '')} name="type" onChange={this.handleInputChange}>
                                            <option value="0">Select Menu Type</option>
                                            <option value="cashback">Cashback Category</option>
                                            <option value="url">URL</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'type')}</p>
                                    </div> </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Link </label>
                                    <input className={"input " + (_.get(error, 'link') ? ' is-danger' : '')} type="text" name="link" placeholder="Link" value={menuData.link} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'link')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Parent </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(menuData.parent) ? menuData.parent : 0}`} name="parent" onChange={this.handleInputChange}>
                                            <option value="0">None</option>

                                            {
                                                this.state.arrList.length > 0 ?
                                                    this.state.arrList.map(function (dataRow) {

                                                        return (
                                                            <option value={dataRow._id}>{dataRow.name}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>

                                        <p className="help is-danger">{_.get(error, 'access')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Access Level </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(this.state.editForm && menuData.access) ? menuData.access : 0}`} name="access" onChange={this.handleInputChange}>
                                            <option value="0">Public</option>
                                            <option value="1">Registered</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'access')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Order </label>
                                    <input className={"input " + (_.get(error, 'ordering') ? ' is-danger' : '')} name="ordering" type="text" placeholder="Order" value={menuData.ordering} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'ordering')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Image  </label>
                                    {
                                        menuData.imageFile ?
                                            <Image
                                                src={`${apiUrl}resources/banner/${menuData.imageFile}`}
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
                                    <label className="label has-text-grey">Intro Text  </label>
                                    <CKEditor activeClass="p10"
                                        content={menuData.introtext}
                                        events={{

                                            "change": this.handleEditorChange.bind(this, 'introtext')
                                        }} />
                                    <p className="help is-danger">{_.get(error, 'introtext')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Description   </label>
                                    <CKEditor activeClass="p10"
                                        content={menuData.description}
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
                                    <label className="label has-text-grey">Meta Title </label>
                                    <input className={"input " + (_.get(error, 'metatitle') ? ' is-danger' : '')} name="metatitle" type="text" placeholder="Meta title" value={menuData.metatitle} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'metatitle')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Keywords </label>
                                    <textarea className={"textarea " + (_.get(error, 'metakey') ? ' is-danger' : '')} name="metakey" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={menuData.metakey} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'metakey')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Meta Description </label>
                                    <textarea className={"textarea " + (_.get(error, 'metadesc') ? ' is-danger' : '')} name="metadesc" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={menuData.metadesc} ></textarea>
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




