import React, { Component } from "react";
import { withRouter } from "next/router";
import Modal from 'react-responsive-modal';
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';
export default withRouter(
  class ReviewPopup extends Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 1
      };
    }

    componentDidMount = () => { };

   
    render() {
      const {
        onCloseModal,
        open,
        cashbackRow,
        valueType,
        popupData,
        handleReviewSubmit,
        error,
        onStarClick,
        handleInputChange,
        onTextFieldBlur
      } = this.props;
      const { rating } = this.state;
      return (
        <Modal open={open} showCloseIcon={false} center>
          <div className="modal1">
            <a className="close" onClick={onCloseModal}>
              &times;
            </a>
            <div className="fwid leave-review">
              <div className="leave-rev-head">
                <div className="leave-rev-head-bg bg-green">

                  <h2 className="modal-title">Leave Review ( {cashbackRow.aid ? cashbackRow.aid.name : ''} - {cashbackRow.title ? cashbackRow.title : ''})</h2>
                </div>
                <div className="log-form-body full-width">
                  <div className="field">
                    <label className="label">Tittle:</label>
                    <div className="control">
                      <input type="text" className="input" name="title" value={`${popupData ? popupData.title : ''}`} onChange={handleInputChange} onKeyUp={onTextFieldBlur} onBlur={onTextFieldBlur} />
                    </div>
                    <p className="help is-danger" >{_.get(error, 'title')}</p>
                  </div>
                  <div class="field">
                    <label className="label">Comments:</label>
                    <div className="control">
                      <textarea className="input frm-textarea" type="text" name="comments" cols="40" rows="3" value={`${popupData ? popupData.comments : ''}`} onChange={handleInputChange} onKeyUp={onTextFieldBlur} onBlur={onTextFieldBlur}></textarea>
                    </div>
                    <p className="help is-danger" >{_.get(error, 'comments')}</p>
                  </div>
                  <div className="field">
                    <label className="label">Give Rating:</label>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={popupData.rating}
                      onStarClick={onStarClick.bind(this)}
                      starColor="#4CA557"
                      emptyStarColor="#efefef"
                    />
                  </div>
                  <div className="field has-text-right">
                    <button name="reviewBut" onClick={handleReviewSubmit}  type="submit" id="reviewBut" class="btn btn-default purple-btn xm-full-btn" value="login">Submit</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Modal>
      );
    }
  }
);
