import React, { Component } from 'react';
import '../styles/styles.scss'
import axios from 'axios';
import { apiUrl } from '../utils/Common';
import { withRouter } from 'next/router';
import renderHTML from 'react-render-html';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import _ from 'lodash';
toast.configure();
export default withRouter(class ArticleArbitrage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            signedIn: false,
            commentData: {
                commentName: '',
                commentEmail: '',
                commentDesc:'',
                googleRecaptcha: '',
            },
            errors: {
                commentName: null,
                password: null,
                googleRecaptcha: null
            },
            disableBtn: false
        }
    }
    componentDidMount = () => {
        console.log(this.props.articleRow)
    }
    onTextFieldBlur = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const fieldName = e.target.name;
        let fieldNeedToValidate = [fieldName];
        errors[fieldName] = null;
        this.formValidation(fieldNeedToValidate);

    }
    formValidation = (fieldsToValidate = [], callback = () => { }) => {
        const { commentData } = this.state;
        const allFields = {
            commentName: {
                message: "Please enter the  name.",
                doValidate: () => {
                    const value = _.trim(_.get(commentData, 'commentName', ""));
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, commentEmail: {
                message: "Please enter valid email.",
                doValidate: () => {
                    const value = _.get(commentData, 'commentEmail', '');
                    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    if (emailValid) {
                        return true;
                    }
                    return false;
                }
            },
            commentDesc: {
                message: "Please enter the comment.",
                doValidate: () => {
                    const value = _.get(commentData, 'commentDesc', '');
                    if (value && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }, googleRecaptcha: {
                message: "Please verify the captcha.",
                doValidate: () => {
                    const value = _.get(commentData, 'googleRecaptcha', '');
                    if (value && value.length > 0) {
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
            this.setState({ disableBtn: true });
            _.each(errors, (err) => {
                if (err) {
                    isValid = false;
                    this.setState({ disableBtn: false });
                }
            });
            callback(isValid);
        })

    }
    handleInputChange = (e) => {
        const { commentData } = this.state;
        const target = e.target;
        const value = target.value;
        const name = target.name;
        commentData[name] = value;
        this.setState({
            commentData: commentData
        })
    }
    recaptchaChange = (value) => {
        const { commentData } = this.state;
        commentData['googleRecaptcha'] = value;
        this.setState({ commentData: commentData })
        let fieldNeedToValidate = ['googleRecaptcha'];
        this.formValidation(fieldNeedToValidate);

    }
    handleSubmit = (e) => {
        e.preventDefault();

        const { commentData } = this.state;
        let fieldNeedToValidate = ['commentName', 'commentDesc','commentEmail','googleRecaptcha'];
        this.formValidation(fieldNeedToValidate, (isValid) => {
            if (isValid) {
                this.setState({ disableBtn: false });
                axios.post(apiUrl + 'common/post-comment', {
                    articleId: this.props.articleRow._id,
                    commentName: commentData.commentName,
                    commentDesc: commentData.commentDesc,
                    commentEmail: commentData.commentEmail,
                    googleRecaptcha: commentData.googleRecaptcha,
                }).then((res) => {
                    window.grecaptcha.reset();
                    commentData['googleRecaptcha'] = '';
                    commentData['commentName'] = '';
                    commentData['commentDesc'] = '';
                    commentData['commentEmail'] = '';
                    this.setState({ disableBtn: true, commentData: commentData });   
                    let successMsg = res.data.msg;
                    toast.success(successMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                    
                }).catch(error => {
                    window.grecaptcha.reset();
                    commentData['googleRecaptcha'] = '';
                 
                    this.setState({ disableBtn: true, commentData });
                    let errorMsg = error.response.data.msg;
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 13
                    });
                });
            }
        });
    }
    render() {
        const { error, disableBtn } = this.state;
        return (
            
            <div>
                 <div className="fwid bg-white mg-t-40">
                        <div className="learn-box-detail">
                            <div className="fwid details-heading level">
                            <h2 className="level-left">{this.props.articleRow.title}</h2>
                            </div>
                            <div className="fwid details-texts">   
                            {this.props.articleRow.description ? renderHTML(this.props.articleRow.description) : ''}
                            </div>
                            <div className="fwid details-navs"></div>
                        </div>
                    </div>
                    <div className="fwid bg-white mg-t-40">
                        <div className="blog-list-cmd fwid">
                            <div className="fwid two-box bread-crumbs">
                                <div className="row" id="successMessage">
                                                                    </div>
                                <h3><b><span>0</span></b> Comments</h3>
                            </div>
                            <div className="cmd-list-wrap fwid">
                            
                                                      </div> 
                        </div>
                    </div>
                    <div className="fwid bg-white mg-t-40">
                        <div className="blog-list-cmd fwid">
                            <div className="fwid two-box bread-crumbs">
                                <div className="row" id="successMessage">
                                                                    </div>
                                <h3> Leave a comment</h3>
                            </div>
                            <div className="cmd-list-wrap fwid">
                            <div className="fwid fm-white-top">
                            <div className="field">
                                <label className="label">Your name</label>
                                <div className="control">
                                        <input className={"input " + (_.get(error, 'commentName') ? ' is-danger' : '')} type="text" name="commentName" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                 
                                        <p className="help is-danger">{_.get(error, 'commentName')}</p>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Your email</label>
                                <div className="control">
                                        <input className={"input " + (_.get(error, 'commentEmail') ? ' is-danger' : '')} type="text" name="commentEmail" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                                        <p className="help is-danger" >{_.get(error, 'commentEmail')}</p>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Comment</label>
                                <div className="control">
                                        <textarea placeholder="Comment" name="commentDesc" id="commentDesc_parent" className={"input " + (_.get(error, 'commentDesc') ? ' is-danger' : '')} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur}></textarea>
                                    
                                        <p className="help is-danger" >{_.get(error, 'commentDesc')}</p>
                                </div>
                            </div>
                           
                            <div className="field">
                              
                                   
                                        <div className="columns">
                                        <div className="column">
                                            <ReCAPTCHA
                                                className={" " + (_.get(error, 'password') ? ' is-danger' : '')}
                                                sitekey="6Le1I4gUAAAAACJP3hdjuWUAX7teX-BdjrXN-GWZ"

                                                onChange={this.recaptchaChange}
                                            />
                                            <p className="help is-danger" >{_.get(error, 'googleRecaptcha')}</p>
                                            </div></div>


                                 
                                <div className="fwid sm-mg-t30"> 
                                            <div className="sign-bot"><div className="text-left">
                                            <button  onClick={this.handleSubmit} className="btn btn-default green-btn xm-full-btn" type="submit" name="commentSubmit" value="true">Send Comment</button>
                                              
                                            </div></div>
                                        </div>
                                
                            </div>        
                           
                                       
                                    </div>
                                </div>
                            </div>
                            </div> 

                {/* Comments- sections */}

                
              
           </div> 
        )
    }
})





