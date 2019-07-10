import React, { Component } from 'react';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Slider from 'react-rangeslider';
 
export default withRouter(class CashbackSlider extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 10
        }
    }

    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = value => {
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
    };
    componentDidMount = () => {

    }
    render() {
        const { value } = this.state;
        const horizontalLabels = {
            0: '0',
            // 62500: '62500',
            // 125000: '125000',
            // 187000: '187000',
            250000: '250000'
        }
        const formatkg = value => 'EUR ' + value
        return (

            <div className="omsc-full-width-section bg-medium section-pricing">
                <div className="omsc-full-width-section-inner">
                    <div className="omsc-full-width-section-content">
                        <div className="container">
                            <div className="container-inner xs-mg-0">
                                <div className="demo">
                                    <div className="sliderbox w-100">

                                        <div className='slider1'>
                                            <Slider

                                                hideMinMax={false}
                                                grid={true}
                                                grid_num={4}
                                                grid_snap={false}
                                                min={0}
                                                max={250000}
                                                step={1}
                                                keyboard={true}
                                                labels={horizontalLabels}
                                                value={value}
                                                format={formatkg}
                                                onChangeStart={this.handleChangeStart}
                                                onChange={this.handleChange}
                                                onChangeComplete={this.handleChangeComplete}
                                            />

                                        </div>

                                    </div>

                                    <div className="fwid twobox-value">
                                        <div className="fwid values-list">
                                            <div className="mem-level">Skrill VIP Membership Level: <span className="valuebox vip-level-1" id="membership_level">Not eligible for Skrill VIP</span></div>
                                            <div className="mem-bonus-1">Monthly Bonus From Couponarbitrage: <span className="valuebox prime-3" id="coupon_bonus">0 EUR</span></div>

                                            <div className="mem-bonus-total">Total Monthly Couponarbitrage & Skrill Bonus: <span className="valuebox" id="total_bonus">0 EUR</span></div>
                                        </div>
                                        <div className="fwid values-benefits">
                                            <div className="mem-head-text">

                                                <h4 className="green-txt">Your Benefits with Us</h4>
                                            </div>
                                            <div className="boxslist">
                                                <ul className="no-style rect-list">
                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="125000" style={{ display: 'none' }}>
                                                        <div className="rect-content">Cashback From Us Every Month Based On Your Transactions</div>
                                                    </li>
                                                    <li className="rect-item  limit-visibility is-visible" data-min="126000" data-max="250000" >
                                                        <div className="rect-content">Get a Skrill Prepaid MasterCard</div>
                                                    </li>
                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                        <div className="rect-content">Fast Track Verification</div>
                                                    </li>
                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                        <div className="rect-content">Dedicated VIP Care</div>
                                                    </li>
                                                    <li className="rect-item  limit-visibility is-visible" data-min="0" data-max="250000" >
                                                        <div className="rect-content">€10 Sign Up Bonus From Us</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fwid twobox-animate">
                                        <div className="circle  green-circle">
                                            <svg x="0px" y="0px"
                                                width="200px" height="200px" viewBox="-23.673 46.381 334.325 332.751"
                                                enable-background="new -23.673 46.381 334.325 332.751">
                                                <g>
                                                    <ellipse id="svg_1" fill="none" stroke="#EEEEEE" stroke-width="38.5" cx="144.402" cy="212.631" rx="147" ry="147" />

                                                    <ellipse id="svg_2" fill="none" stroke="#811e68" stroke-width="38.5" stroke-dasharray="2750" stroke-dashoffset="29984" cx="142.576" cy="212.883" rx="147" ry="147" />
                                                </g>
                                                <ellipse id="svg_2_1_" fill="#811e68" stroke="#F0F0F0" stroke-width="26.5" cx="144.402" cy="213.631" rx="100.5" ry="100.5" />
                                                <text class="title circle-amount is-1" fill="white" x="175" y="175" text-anchor="middle" dominant-baseline="central">€3125.00</text>
                                            </svg>

                                            <div className="circle-text"><i className="icon-circletxt c-primary-3">&nbsp;</i>Couponarbitrage Cashback </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        )
    }
})





