import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';

export default withRouter(class manage_subscribers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            subscriberData: {
                _id: '',
                subscriberEmail: '',

            },
            errors: {
                subscriberEmail: null,
            },
            editForm: false,
        }
    }
    componentDidMount = () => {
        const editId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(() => {

            }).catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        if (editId) {
            this.getCatRow(editId);
        }

    }



    getCatRow = (editId) => {

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/masterdata/subscriber-row?_id=' + editId)
            .then(res => {
                var subscriberData = res.data.results;
                this.setState({ subscriberData: subscriberData, editForm: true })
            }).catch((error) => {
                if (error) {
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/subscribers`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { subscriberData } = this.state;
        const allFields = {

            subscriberEmail: {
                message: "Please enter the email.",
                doValidate: () => {
                    const value = _.trim(_.get(subscriberData, 'subscriberEmail', ""));
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
        fieldNeedToValidate = ['subscriberEmail'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();
                !this.state.editForm ? this.createSite() : this.updateSite();

            }
        });

    }
    createSite = () => {
        const { subscriberData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/create-subscriber', {
            subscriberData: subscriberData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/subscribers`);
        }).catch(error => {
            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');
        });
    }
    updateSite = () => {
        const { subscriberData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/masterdata/update-subscriber', {
            subscriberData: subscriberData,
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/subscribers`);
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
        const { subscriberData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        subscriberData[name] = value;
        this.setState({
            subscriberData: subscriberData
        })
    }




    render() {
        const { subscriberData, error } = this.state;

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
                                            <Link href="/subscribers" prefetch>
                                                <a href="#"> Subscribers List </a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Subscribers </a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Subscribers   Info  </h2>
                        <hr></hr>

                        <div className="columns">

                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Name  </label>
                                    <input className={"input " + (_.get(error, 'subscriberEmail') ? ' is-danger' : '')} type="text" name="subscriberEmail" placeholder="Name" value={subscriberData.subscriberEmail} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'subscriberEmail')}</p>
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




