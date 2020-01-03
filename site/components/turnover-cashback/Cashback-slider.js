import '../../styles/styles.scss';
import Slider from 'react-rangeslider';
const formatValue = (currenyCode, value) => currenyCode + '' + value
const CashbackSlider = (props) => (
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
                                        max={props.maxValue}
                                        step={1}
                                        keyboard={true}
                                        labels={props.horizontalLabels}
                                        value={props.value}
                                        format={formatValue.bind(this, props.currenyCode)}
                                        onChange={props.handleSliderChange}
                                    />

                                </div>
                            </div>

                            <div className="fwid twobox-value">
                                <div className="fwid values-list">

                                    {
                                         props.brandName == 'AsianConnect88' ?
                                         <>
                                            <div className="mem-bonus-1">SBObet / Pinnacle Sports / BetISN / GA288 : <span className="valuebox prime-3" id="coupon_bonus">{props.couBonus} {props.currenyCode}</span></div>
                                            <div className="mem-bonus-1">Matchbook & Skype Betting : <span className="valuebox prime-3" id="coupon_bonus">{props.vipBonus} {props.currenyCode}</span></div>
                                         </>
                                         :
                                        props.brandName == 'SBObet' ?
                                            <div className="mem-bonus-1">Your SBOBET Monthly Cashback: <span className="valuebox prime-3" id="coupon_bonus">{props.couBonus} {props.currenyCode}</span></div>
                                            : <>
                                                <div className="mem-level">{props.brandName} VIP Membership Level: <span className={`valuebox ${props.className}`} id="membership_level">{props.membership_level}</span></div>
                                                <div className="mem-bonus-1">Monthly Bonus From Couponarbitrage: <span className="valuebox prime-3" id="coupon_bonus">{props.couBonus} {props.currenyCode}</span></div>
                                                {

                                                    props.brandName == 'Neteller' ? <div className="mem-bonus-1">Monthly VIP Rewards Bonus From NETELLER :
                                                     <span className="valuebox prime-3" id="coupon_bonus">{props.vipBonus} {props.currenyCode}</span></div> : ''
                                                }
                                                <div className="mem-bonus-total">Total Monthly Couponarbitrage & {props.brandName} Bonus: <span className="valuebox" id="total_bonus">{props.totalBonus} {props.currenyCode}</span></div>
                                            </>
                                    }



                                </div>
                                <div className="fwid values-benefits">
                                    <div className="mem-head-text">

                                        <h4 className="green-txt">Your Benefits with Us</h4>
                                    </div>
                                    <div className="boxslist">
                                        <ul className="no-style rect-list">
                                            {props.staticTextHtml ? props.staticTextHtml : props.generateRange(0)}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="fwid twobox-animate">
                                <div className="circle  green-circle">
                                    <svg x="0px" y="0px"
                                        width="200px" height="200px" viewBox="-23.673 16.381 334.325 392.751">
                                        <g>
                                            <ellipse id="svg_1" fill="none" stroke="#EEEEEE" stroke-width="44" cx="144.402" cy="212.631" rx="175" ry="175" r="147" />

                                            <ellipse id="svg_2"
                                                fill="none"
                                                stroke={props.strokeColor}
                                                stroke-width="44"
                                                style={{
                                                    strokeDasharray: props.maxCashbackValue,
                                                    strokeDashoffset: props.strokeDashoffset,
                                                }}
                                                transform = "rotate(-90 142.576 212.883)" 
                                                cx="142.576"
                                                cy="212.883"
                                                rx="175" ry="175"
                                                r="175" />

                                        </g>
                                        <ellipse id="svg_2_1_" fill={props.strokeColor} stroke="#F0F0F0" stroke-width="36.5" cx="144.402" cy="213.631" rx="120.5" ry="120.5" />
                                        <text class="title circle-amount is-1" fill="white" x="175" y="175" text-anchor="middle" dominant-baseline="central">{props.currenySymbol}{props.couBonus}</text>
                                    </svg>

                                    <div className="circle-text"><i className="icon-circletxt c-primary-3">&nbsp;</i>
                                    {
                                            props.brandName == 'AsianConnect88'?' SBObet / Pinnacle Sports / BetISN / GA2BB ':'Couponarbitrage Cashback'
                                        }  
                                    
  </div>
                                </div>

                                {
                                    props.brandName == 'Neteller' || props.brandName == 'AsianConnect88' ? <div className="circle  green-circle">
                                        <svg x="0px" y="0px"
                                            width="200px" height="200px" viewBox="-23.673 16.381 334.325 392.751">
                                            <g>
                                                <ellipse id="svg_1" fill="none" stroke="#EEEEEE" stroke-width="44" cx="144.402" cy="212.631" rx="175" ry="175" r="147" />

                                                <ellipse id="svg_2"
                                                    fill="none"
                                                    stroke={props.strokeColor2}
                                                    stroke-width="44"
                                                    style={{
                                                        strokeDasharray: props.vipMaxCashbackValue,
                                                        strokeDashoffset: props.vipStrokeDashoffset,
                                                    }}
                                                    transform = "rotate(-90 142.576 212.883)" 
                                                    cx="142.576"
                                                    cy="212.883"
                                                    rx="175" ry="175"
                                                    r="175" />

                                            </g>
                                            <ellipse id="svg_2_1_" fill={props.strokeColor2} stroke="#F0F0F0" stroke-width="36.5" cx="144.402" cy="213.631" rx="120.5" ry="120.5" />
                                            <text class="title circle-amount is-1" fill="white" x="175" y="175" text-anchor="middle" dominant-baseline="central">{props.currenySymbol}{props.vipBonus}</text>
                                        </svg>

                                        <div className="circle-text"><i className="icon-circletxt c-primary-3">&nbsp;</i>
                                        {
                                            props.brandName == 'AsianConnect88'?' Matchbook & Skype Betting':<span> {props.brandName} VIP Rewards </span>
                                        }
                                        
                                        
                                         </div>
                                    </div> : ''

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
)
export default CashbackSlider;





