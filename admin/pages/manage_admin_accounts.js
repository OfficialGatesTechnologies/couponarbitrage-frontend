import React, { Component } from 'react';
import Head from 'next/head';
import { site_name, apiUrl, ADMINMODULES } from '../utils/Common';
import { withRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router'
import axios from 'axios';
import Link from 'next/link';
import toastr from 'toastr';
import CheckBoxComp from '../components/CheckBoxComp';
export default withRouter(class manage_admin_accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                _id: '',
                firstName: '',
                username: "",
                email: "",
                password: "",
                cpassword: "",
                privileges: "",
                accessModules: "",
                type: ""
            },
            errors: {
                firstName: null,
                username: null,
                email: null,
                password: null,
                cpassword: null,
                privileges: null,
                accessModules: null,
                type: null
            },
            changePass: null,
            editForm: false,
            arrprivileges: [],
            arrAccessModules: [],

            privileges: [
                { id: 1, value: "VIEW", text: "VIEW", isChecked: false },
                { id: 2, value: "INSERT", text: "INSERT", isChecked: false },
                { id: 3, value: "UPDATE", text: "UPDATE", isChecked: false },
                { id: 4, value: "DELETE", text: "DELETE", isChecked: false }
            ]
        }


    }
    componentDidMount = () => {
        const accoutId = this.props.router.query.id
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/auth/check-auth')
            .then(res => {
                this.setState({
                    // userData: {
                    //     _id: res.data._id,
                    //     firstName: res.data.firstName,
                    //     username: res.data.username,
                    //     email: res.data.email,
                    // }
                })
            })
            .catch((error) => {
                if (error) {
                    Router.push(`/login`);
                }
            })
        console.log('accoutId', accoutId);
        if (accoutId) {
            this.getUserRow(accoutId);
        }
    }

    getUserRow = (accountid) => {
        let privileges = this.state.privileges
        let accessModules = ADMINMODULES
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.get(apiUrl + 'admin/account/admin-row?_id=' + accountid)
            .then(res => {
                var userData = res.data.results;
                var arrprivileges = userData.privileges;
                var arraccessModules = userData.accessModules;
                privileges.forEach(privileges => {
                    if (arrprivileges.indexOf(privileges.value) >= 0) {
                        privileges.isChecked = true
                    }
                })
                accessModules.forEach(accessModules => {
                    if (arraccessModules.indexOf(accessModules.value) >= 0) {
                        accessModules.isChecked = true;
                    }
                })
                this.setState({ arrprivileges: arrprivileges, arrAccessModules: arraccessModules, userData: userData, editForm: true, privileges: privileges, ADMINMODULES: ADMINMODULES })
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    toastr.error('Invalid URI', 'Error!');
                    Router.push(`/admin_accounts`);
                }
            })
    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { userData } = this.state;
        const allFields = {
            firstName: {
                message: "Please enter the  name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'firstName', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            username: {
                message: "Please enter the user name.",
                doValidate: () => {
                    const value = _.trim(_.get(userData, 'username', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            password: {
                message: "Please enter the password.",
                doValidate: () => {
                    const value = _.get(userData, 'password', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, cpassword: {
                message: "Confirm password does't match with password.",
                doValidate: () => {
                    const vpassword = _.trim(_.get(userData, 'password', ""));
                    const vcpassword = _.trim(_.get(userData, 'cpassword', ""));
                    if (vpassword.length > 0 && vpassword === vcpassword) {
                        return true;
                    }
                    return false;
                }
            }
            , email: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(userData, 'email', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            }, type: {
                message: "Please select the type.",
                doValidate: () => {
                    const type = _.trim(_.get(userData, 'type', ""));

                    if (type.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, privileges: {
                message: "Please select atleast one privilege.",
                doValidate: () => {
                    const privileges = _.trim(_.get(userData, 'privileges', ""));

                    if (privileges.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, accessModules: {
                message: "Please select atleast one module.",
                doValidate: () => {
                    const accessModules = _.trim(_.get(userData, 'accessModules', ""));

                    if (accessModules.length > 0) {
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
        const { userData, changePass } = this.state;
        let fieldNeedToValidate = [];
        if (changePass || this.state.editForm === false) {
            fieldNeedToValidate = ['firstName', 'username', 'email', 'type', 'password', 'cpassword', 'privileges', 'accessModules'];
        } else {
            fieldNeedToValidate = ['firstName', 'username', 'email', 'type', 'privileges', 'accessModules'];
        }
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                toastr.clear();


                !this.state.editForm ? this.createAdminaccount() : this.updateAdminAccount();

            }
        });

    }
    createAdminaccount = (e) => {
        const { userData, changePass } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/account/create-admin', {
            userData: userData,
            changePass: changePass
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/admin_accounts`);
        }).catch(error => {

            let errorMsg = error.response.data.msg;
            toastr.error(errorMsg, 'Error!');

        });
    }
    updateAdminAccount = (e) => {
        const { userData, changePass } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtAdminToken');
        axios.post(apiUrl + 'admin/account/update-myaccount', {
            userData: userData,
            changePass: changePass,
            updateAdmin: 1
        }).then((result) => {
            let sucMsg = result.data.msg;
            toastr.success(sucMsg, '');
            Router.push(`/admin_accounts`);
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
        const { userData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        userData[name] = value;
        this.setState({
            userData: userData
        })
    }
    handleCheckBoxChange = (e) => {
        var checked = e.target.checked;
        let errors = this.state.errors;
        this.setState({ changePass: checked });
        if (!checked) {
            errors['password'] = null;
            errors['cpassword'] = null;
        }
    }
    handlePrivilegesCheckBox = (e) => {
        const { userData } = this.state;
        let errors = this.state.errors;
        let privileges = this.state.privileges
        privileges.forEach(privileges => {
            if (privileges.value === e.target.value) {
                privileges.isChecked = e.target.checked
                if (e.target.checked === true) {
                    this.state.arrprivileges.push(e.target.value);
                } else {
                    this.state.arrprivileges.pop(e.target.value);
                }
            }
        })
        userData['privileges'] = this.state.arrprivileges;
        this.setState({ privileges: privileges, userData: userData })
        let fieldNeedToValidate = ['privileges'];
        errors['privileges'] = null;
        this.formValidation(fieldNeedToValidate);
    }
    handleModulesCheckBox = (e) => {
        const { userData } = this.state;
        let errors = this.state.errors;
        let accessModules = ADMINMODULES
        accessModules.forEach(accessModules => {
            if (accessModules.value === e.target.value) {
                accessModules.isChecked = e.target.checked
                if (e.target.checked === true) {
                    this.state.arrAccessModules.push(e.target.value);
                } else {
                    this.state.arrAccessModules.pop(e.target.value);
                }
            }
        })
        userData['accessModules'] = this.state.arrAccessModules;
        this.setState({ ADMINMODULES: ADMINMODULES, userData: userData })
        let fieldNeedToValidate = ['accessModules'];
        errors['accessModules'] = null;
        this.formValidation(fieldNeedToValidate);
    }

    render() {
        const { userData, changePass, error, editForm } = this.state;
        const passContent = changePass || editForm === false ?
            <div className="columns">
                <div className="column is-6">
                    <div className="control ">
                        <label className="label has-text-grey">Password</label>
                        <input className={"input " + (_.get(error, 'password') ? ' is-danger' : '')} name="password" type="password" placeholder="Password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                        <p className="help is-danger">{_.get(error, 'password')}</p>
                    </div></div>
                <div className="column is-6">
                    <div className="control ">
                        <label className="label has-text-grey">Confirm password </label>
                        <input className={"input " + (_.get(error, 'cpassword') ? ' is-danger' : '')} type="password" name="cpassword" placeholder="Confirm password" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                        <p className="help is-danger">{_.get(error, 'cpassword')}</p>
                    </div>
                </div></div>
            : null;
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
                                        <li>
                                            <Link href="/admin_accounts" prefetch>
                                                <a href="#">Administrators</a>
                                            </Link>
                                        </li>

                                        <li className="is-active"><a href="#">{this.state.editForm ? 'Edit' : "Add New"} Admin Account</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="box is-shadowless has-background-white" >
                        <h2 className="title is-size-5 has-text-grey-dark is-uppercase is-marginless">Account Info  </h2>
                        <hr></hr>


                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Name </label>
                                    <input className={"input " + (_.get(error, 'firstName') ? ' is-danger' : '')} name="firstName" type="text" placeholder="Name" value={userData.firstName} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'firstName')}</p>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Username </label>
                                    <input className={"input " + (_.get(error, 'username') ? ' is-danger' : '')} type="text" name="username" placeholder="Username" value={userData.username} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'username')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">E-Mail </label>
                                    <input className={"input " + (_.get(error, 'email') ? ' is-danger' : '')} name="email" type="text" placeholder="Email" value={userData.email} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                    <p className="help is-danger">{_.get(error, 'email')}</p>
                                </div>
                            </div>

                        </div>

                        {
                            this.state.editForm ? <div className="columns">
                                <div className="column is-6">
                                    <div className="field">
                                        <input onChange={this.handleCheckBoxChange} id="changepassword" type="checkbox" name="accessPrivilege" />
                                        <label htmlFor="changepassword"> Change Password?</label>
                                    </div>
                                </div>
                            </div> : ''
                        }

                        {passContent}

                        <div className="columns">
                            <div className="column is-6">
                                <div className="control">
                                    <label className="label has-text-grey">Account Type </label>
                                    <div className="select is-fullwidth">
                                        <select name="type" onChange={this.handleInputChange}>
                                            <option value="">Select Type</option>
                                            <option value="Administrator">Administrator</option>
                                            <option value="SubAdmin">Sub Admin</option>
                                        </select>
                                        <p className="help is-danger">{_.get(error, 'type')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="columns">
                            <div className="column is-6">
                                <div class="field">
                                    <div class="control ctrl-lab">
                                        <label className="label has-text-grey">Privileges </label>
                                        {
                                            this.state.privileges.map((privileges) => {
                                                return (<CheckBoxComp handleCheckChieldElement={this.handlePrivilegesCheckBox} {...privileges} />)
                                            })
                                        }
                                        <p className="help is-danger">{_.get(error, 'privileges')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-8">
                                <div class="field">
                                    <div class="control ctrl-lab">
                                        <label className="label has-text-grey">Access modules</label>
                                        {
                                            ADMINMODULES.map((modules) => {
                                                return (<CheckBoxComp handleCheckChieldElement={this.handleModulesCheckBox} {...modules} />)
                                            })
                                        }
                                        <p className="help is-danger">{_.get(error, 'accessModules')}</p>
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




