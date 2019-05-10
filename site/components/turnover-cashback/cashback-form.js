import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import _ from 'lodash';
import axios from 'axios';
import Link from 'next/link'; // CashbackForm
import ReCAPTCHA from "react-google-recaptcha";
import Modal from 'react-responsive-modal';
import { apiUrl } from '../../utils/Common';
import { toast } from 'react-toastify';
toast.configure();
export default withRouter(class CashbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: '',
        email: '',
        customer_type: '',
        account_id: '',
        network_type: props.network_type,
        googleRecaptcha: "",
        currency: props.currenyCode

      },
      errors: {
        name: null,
        email: null,
        termsCond: null,
        account_id: null,
        customer_type: null,
        title: null
      }
    }
  }
  formValidation = (fieldsToValidate = [], callback = () => { }) => {
    const { userData } = this.state;
    const allFields = {
      email: {
        message: "Please enter valid email.",
        doValidate: () => {
          const value = _.get(userData, 'email', '');
          const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
          if (emailValid) {
            return true;
          }
          return false;
        }
      },
      account_id: {
        message: "Please enter the acount id.",
        doValidate: () => {
          const value = _.get(userData, 'account_id', '');
          if (value.length > 0) {
            return true;
          }
          return false;
        }
      },
      termsCond: {
        message: "Please accept the terms and conditions.",
        doValidate: () => {
          const value = _.get(userData, 'termsCond', '');
          if (value) {
            return true;
          }
          return false;
        }
      },
      customer_type: {
        message: "Please select one.",
        doValidate: () => {
          const value = _.get(userData, 'customer_type', '');
          if (value) {
            return true;
          }
          return false;
        }
      },

      googleRecaptcha: {
        message: "Please verify the captcha.",
        doValidate: () => {
          const value = _.get(userData, 'googleRecaptcha', '');
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
  handleSubmit = (e) => {

    e.preventDefault();
    let fieldNeedToValidate = [];
    fieldNeedToValidate = ['email',  'customer_type', 'googleRecaptcha', 'termsCond'];
    if(this.props.brandName !== 'AsianConnect88'){
      fieldNeedToValidate.push('account_id');
    }
    this.formValidation(fieldNeedToValidate, (isValid) => {
      if (isValid) {
        this.setState({ disableBtn: false });
        const { userData } = this.state;
        axios.post(apiUrl + 'common/turnover-registration', {
          userData: userData,
        }).then((res) => {
          let successMsg = res.data.msg;
          toast.success(successMsg, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 13
          });
        }).catch(error => {
          window.grecaptcha.reset();
          userData['googleRecaptcha'] = '';
          this.setState({ disableBtn: true, userData });
          let errorMsg = error.response.data.msg;
          toast.error(errorMsg, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 13
          });
        });
      }
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
  recaptchaChange = (value) => {
    const { userData } = this.state;
    userData['googleRecaptcha'] = value;
    this.setState({ userData: userData })
    let fieldNeedToValidate = ['googleRecaptcha'];
    this.formValidation(fieldNeedToValidate);
  }
  handleCheckBoxChange = (e) => {
    const { userData } = this.state;
    var checked = e.target.checked;
    userData['termsCond'] = checked;
    this.setState({ userData: userData });
    let fieldNeedToValidate = ['termsCond'];
    this.formValidation(fieldNeedToValidate);
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { brandName, logoClassName, currenyCode, accountIdImage,regLink,btnClassName } = this.props;
    const { open, error } = this.state;
    return (
      <div>
        <div className="container-inner pd-b-40 max-wp80">

          <header id="join-us" className="has-text-centered">
            <h2 className="content-head"><strong>Join Us</strong> for <strong>Free</strong></h2>
          </header>
          <div className={`omsc-one-half omsc-last xs-pd0 fwid ${logoClassName}`}>
            <h3>New {brandName} Customer</h3>

            <ul className="no-style">
              <li>
                <Link href={regLink}>
                  <a className= {`button ${btnClassName} is-fullwidth`} target="new">
                    <strong></strong> Registration</a>
                </Link>
              </li>
              <li>
                Send the data of your new account on
                the below to join our FREE {brandName} Bonus Program.</li>
            </ul>
          </div>
          <div className="ecopayz is-inline-block is-fullwidth">
            <div className="mg-b-30">
              <div className="level field bor-bot-e1">
                <div className="titl level-left">
                  <h3 className="is-no-border bor-0">Application Form</h3>
                </div>
                <div className="titl level-right">
                  <span className="is-small fon-10">Existing {brandName} Customer Info <Link href="#"><a data-toggle="tooltip" title="" data-placement="top" className="tooltip-icon" data-original-title="Existing Skrill users may apply but we cannot guarantee you will be accepted onto the bonus scheme"><img src="/static/images/icons/info-round.png" alt="info" /></a></Link></span>
                </div>
              </div>
            </div>


            <div className="field">
              <label className="label">Name</label>
              <div className="control"><input type="text" className="input" name="name" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />

              </div>
            </div>
            <div className="field">
              <label className="label">{brandName} Email Address <span className="gfield_required">*</span></label>
              <div className="control"><input type="text" className="input" name="email" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
                <p className="help is-danger">{_.get(error, 'email')}</p>
              </div>
            </div>
{
  brandName !== 'AsianConnect88'?<div className="field">
  <label className="label">{brandName} 10 Digit Account ID <span className="gfield_required">*</span></label>
  <div className="control"><input type="text" className="input" name="account_id" onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur} />
    <p className="help is-danger" >{_.get(error, 'account_id')}</p>
  </div>
</div>:''
}

            

            {
              accountIdImage?<div className="field gfield_description">

              <Link href="">
                <a className="fancybox" onClick={this.onOpenModal}>What is my account ID?</a>
              </Link>
            </div>:''
            }
            

            <div className="field">
              <label className="label">Currency</label>
              <div className="select is-fullwidth">
                <select name="currency" value={currenyCode} onChange={this.handleInputChange} onKeyUp={this.onTextFieldBlur} onBlur={this.onTextFieldBlur}>
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CAD">CAD</option>
                  <option value="PLN">PLN</option>
                  <option value="any other currency">any other currency</option>
                </select>
              </div>
            </div>
            <div className="field pd-t-b-15">
              <input className="is-checkradio" id="customer_type1" value="1" onChange={this.handleInputChange} type="radio" name="customer_type" />
              <label for="customer_type1">New Customer</label>
              <input className="is-checkradio" id="customer_type2" value="2" onChange={this.handleInputChange} type="radio" name="customer_type" />
              <label for="customer_type2">Existing Customer</label>
              <p className="help is-danger" >{_.get(error, 'customer_type')}</p>
            </div>
            <div className="field">
              <div className="control level-left">
                <ReCAPTCHA
                  sitekey="6Le1I4gUAAAAACJP3hdjuWUAX7teX-BdjrXN-GWZ"
                  onChange={this.recaptchaChange}
                />
                <p className="help is-danger" >{_.get(error, 'googleRecaptcha')}</p>
              </div>
            </div>
            <div className="field">
              <div className="checkbox join-check-wrap">
                <label>
                  <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check" onChange={this.handleCheckBoxChange} />
                  <span className="cr chck-bor"><i className="cr-icon fas fa-check"></i></span>
                  <span className="has-text-black">I have read and accept the </span>
                  <Link href="javascript:void(0);"><a target="_blank" className="jo-trms">Terms and conditions</a></Link><span>.*</span>
                </label>
                <p className="help is-danger" >{_.get(error, 'termsCond')}</p>
              </div>

            </div>
            <div className="field text-center gform_footer">
              <button name="sendData" onClick={this.handleSubmit} type="submit" id="sendData" className="btn btn-default purple-btn xm-full-btn" value="Register">SUBMIT FORM TO APPLY</button>
            </div>
          </div>
        </div>
        <Modal open={open} showCloseIcon={false} center>
          <div className="modal1">
            <a className="close" onClick={this.onCloseModal}> &times;</a>
            <img src={`/static/images/${accountIdImage}`} alt="Skrill Cashback Scheme" />
          </div>
        </Modal>
      </div>
    );
  }
}
);




