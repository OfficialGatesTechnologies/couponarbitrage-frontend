import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';
import { site_name, apiUrl, siteUrl } from '../utils/Common';
import Modal from 'react-responsive-modal';
import ReactTooltip from 'react-tooltip';
import CustomLoader from '../components/custome-loader';
import _ from 'lodash';
export default withRouter(
  class CashbackCliamPopup extends Component {
    constructor(props) {
      super(props);

    }

    componentDidMount = () => {
    };

    render() {

      const {
        onCloseModal,
        open,
        cashbackRow,
        valueType,
        popupData,
        handleClaimSubmit,
        error,
        handleCheckBoxChange,
        handleInputChange,
        onTextFieldBlur
      } = this.props;
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      var dateStr = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
      return (

        <Modal open={open} showCloseIcon={false} center>

          <div className="modal1">
            <a className="close" onClick={onCloseModal}> &times;</a>
            <div className="fwid leave-review">
              <div className="leave-rev-head">
                <div className="leave-rev-head-bg bg-green">

                  <h2 className="modal-title">Claim Cashback</h2>
                </div>
                <div className="log-form-body full-width">

                  <div className="field">
                    <label className="label">Name: <img data-place="right" data-tip="Your Full Name, as given on your Skrill Account" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <input type="text" name="cbname" value={`${popupData ? popupData.cbname : ''}`} className="input" onChange={handleInputChange} onKeyUp={onTextFieldBlur} onBlur={onTextFieldBlur} />

                    </div>
                    <p className="help is-danger" >{_.get(error, 'cbname')}</p>
                  </div>

                  <div className="field">
                    <label className="label">Username Used at {cashbackRow.title ? cashbackRow.title : ''}: <img data-place="right" data-tip="Your Username on the gaming account" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <input type="text" name="username" value={`${popupData ? popupData.username : ''}`} className="input" onChange={handleInputChange} onKeyUp={onTextFieldBlur} onBlur={onTextFieldBlur} />
                    </div>
                    <p className="help is-danger" >{_.get(error, 'username')}</p>
                  </div>

                  <div className="field">
                    <label className="label">Gaming Site: <img data-place="right" data-tip="The gambling site that your registered with" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <p>{cashbackRow.aid ? cashbackRow.aid.name : ''}</p>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Claim Type: <img data-place="right" data-tip="The type of account you have registered with the gaming site" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <p>{cashbackRow.title ? cashbackRow.title : ''}</p>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Claim Amount: <img data-place="right" data-tip="The amount of cash back you are claiming" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <p>
                        {
                          valueType == 1 ? <h3>£{cashbackRow.value}</h3> : <h3>{cashbackRow.value}%</h3>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Joined Date: <img data-place="right" data-tip="The date you registered your account" src="/static/images/info-icon.png" alt="info" /></label>
                    <div className="control">
                      <p>{dateStr}</p>
                    </div>
                  </div>

                  <div className="field">
                    <div className="checkbox join-check-wrap">
                      <label>
                        <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check" onChange={handleCheckBoxChange} />
                        <span className="cr"><i className="cr-icon fas fa-check"></i></span>
                        <span className="has-text-black jo-acpt">I accept the </span>
                        <Link href=""><a className="jo-trms" target="_BLANK">terms and conditions <img data-place="right" data-tip="Check this box to confirm you agree to our terms and conditions" src="/static/images/info-icon.png" alt="info" /></a></Link>
                      </label>
                    </div>
                    <p className="help is-danger" >{_.get(error, 'termsCond')}</p>
                  </div>

                  <div className="field has-text-right">
                    <button name="reviewBut" type="submit" onClick={handleClaimSubmit} class="btn btn-default purple-btn xm-full-btn" value="login">Submit</button>
                  </div>
                </div>
              </div>
              {/* <p>
                  Please <Link href="/login"><a>login</a></Link> to leave review.
                  </p> */}
            </div>
          </div>
          <ReactTooltip />
        </Modal>

      );
    }
  }
);
