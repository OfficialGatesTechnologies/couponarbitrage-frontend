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
import AsyncSelect from 'react-select/lib/Async';
export default withRouter(class manage_store_reviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            catData: [],
            storeData: [],
            affData: [],
            bannerData: [],
            showcashback_type: '',
            reviewData: {
                _id: '',
                store_id: "",
                user_id: '',
                comments: "",
                expiry_date: '',
                rating: "",
                vip_review: '',
            },
            errors: {
                store_id: null,
                user_id: null,
                comments: null,
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
        axios.get(apiUrl + 'admin/masterdata/review-row?_id=' + editId)
            .then(res => {
                var reviewData = res.data.results;
                var selectedOption = {'value':reviewData.user_id._id,'label':reviewData.user_id.email};
                this.setState({ reviewData: reviewData, editForm: true,selectedOption:selectedOption })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/store_reviews`);
                }
            })
    }

    getDropDownData = () => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/get-all-stores')
            .then(res => {
                var storeData = res.data.results;
                //selectedOption = {}
                this.setState({ storeData: storeData })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/store_reviews`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { reviewData } = this.state;
        const allFields = {
            store_id: {
                message: "Please select store.",
                doValidate: () => {
                    const value = _.trim(_.get(reviewData, 'store_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            user_id: {
                message: "Please select a user.",
                doValidate: () => {
                    const value = _.trim(_.get(reviewData, 'user_id', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },

            rating: {
                message: "Please select a rating.",
                doValidate: () => {
                    const value = _.trim(_.get(reviewData, 'rating', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, title: {
                message: "Please enter the title.",
                doValidate: () => {
                    const value = _.trim(_.get(reviewData, 'title', ""));
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
        fieldNeedToValidate = ['store_id', 'user_id', 'rating', 'title'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createReviews() : this.updateReviews();

            }
        });

    }
    createReviews = () => {
        const { reviewData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/create-review', { reviewData: reviewData }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/store_reviews`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateReviews = () => {
        const { reviewData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-review', { reviewData: reviewData }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/store_reviews`);
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
        const { reviewData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        reviewData[name] = value;
        this.setState({
            reviewData: reviewData
        })

    }
    handleDateChange = (fieldName, e) => {
        const { reviewData } = this.state;
        reviewData[fieldName] = e.toLocaleDateString();
        this.setState({
            reviewData: reviewData
        })

    }
    searchUsers = (query, callback) => {
        if (!query) {
            return [];
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/user/search-users?query=' + encodeURIComponent(query))
            .then(function (response) {
                const items = response.data.results;
                let options = items.map(function (item) {
                    return {
                        value: item._id,
                        label: item.username + ' ' + item.name + ' (' + item.email + ')',
                    };
                });
                callback(options);
            });
    }

    handleSelectChange = (option) => {

        const { reviewData } = this.state;
        reviewData['user_id'] = option.value;
        this.setState({
            reviewData: reviewData,
            selectedOption: option
        })
    }

    render() {
        const { reviewData, error } = this.state;
console.log(this.state.selectedOption);

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
                                        <li className="is-active"><a href="#">Master Data</a></li>
                                        <li>
                                            <Link href="/store_reviews" prefetch>
                                                <a href="#">Review List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"}  Review </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless"> Review    Info  </h2>
                        <hr></hr>

                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Store    </label>
                                    <div className="select is-fullwidth">
                                        <select className={"input " + (_.get(error, 'store_id') ? ' is-danger' : '')} value={`${(reviewData.store_id) ? reviewData.store_id : null}`} name="store_id" onChange={this.handleInputChange}>
                                            <option key="0" value="0">Select Site</option>

                                            {
                                                this.state.storeData.length > 0 ?
                                                    this.state.storeData.map(function (dataRow, i) {

                                                        return (
                                                            <option key={i + 1} value={dataRow._id}>{dataRow.aid ? dataRow.aid.name : ''} - {dataRow.title}</option>

                                                        )

                                                    }) : ''
                                            }
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'store_id')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">User   </label>
                                    <AsyncSelect
                                        loadOptions={(query, callback) => this.searchUsers(query, callback)}
                                        placeholder="Type to search user..."
                                        onChange={this.handleSelectChange}
                                        value={this.state.selectedOption}
                                    />
                                    <p className="help is-danger">{_.get(error, 'user_id')}</p>
                                </div>
                            </div>



                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Rating  </label>
                                    <div className="select is-fullwidth">
                                        <select value={`${(reviewData.rating) ? reviewData.rating : 0}`} name="rating" onChange={this.handleInputChange}>
                                            <option value="0">Select Rating</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'rating')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="control">
                                    <label className="label has-text-grey">Title </label>
                                    <input className={"input " + (_.get(error, 'title') ? ' is-danger' : '')} type="text" name="title" placeholder="URL" value={reviewData.title} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'title')}</p>
                                </div>
                            </div>


                        </div>

                        <div className="columns">
                            <div className="column is-12">
                                <div className="control">
                                    <label className="label has-text-grey">Comments  </label>

                                    <textarea className={"textarea " + (_.get(error, 'comments') ? ' is-danger' : '')} name="comments" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} value={reviewData.comments} ></textarea>
                                    <p className="help is-danger">{_.get(error, 'comments')}</p>
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




