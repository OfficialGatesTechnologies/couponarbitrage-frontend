import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import jsCookie from 'js-cookie';
export default withRouter(class CashbackVouchers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrList: [],
            loading: true,

        }

    }



    render() {
        const { voucherCodes, valueType, codeShow, showCode, ...props } = this.props;
        return (
            <>
                {
                    (voucherCodes.length > 0) ?
                        voucherCodes.map(function (dataRow, i) {
                            var voucher_link = dataRow.voucher_link ? dataRow.voucher_link : '';
                            var imageUrl = dataRow.image_upload == 1 ? apiUrl + 'resources/vouchers/' + dataRow.imageFile : dataRow.imageUrl;
                            return <><div className="vouch-sec-in">
                                <div className="vouch-image">
                                    <Link href="">
                                        <a><img src={imageUrl} alt="Img" /></a>
                                    </Link>
                                </div>
                                <div className="vouch-def">
                                    <h6>{dataRow.voucher_title}</h6>
                                    <p>{dataRow.voucher_description}</p>
                                    <p>{dataRow.voucher_summary}</p>
                                    {
                                        dataRow.voucher_type === 'coupon' ? <>
                                            {
                                                jsCookie.get('jwtToken') ?
                                                    <Link href={voucher_link} >
                                                        <a className="btn get-green-btn" target="_blank" data-value={i} onClick={showCode}  >
                                                            GET CODE & VISIT SITE
                                                        </a>
                                                    </Link>
                                                    :
                                                    <Link href="/signin">
                                                        <a className="btn get-green-btn">GET CODE & VISIT SITE</a>
                                                    </Link>
                                            }
                                            {
                                                codeShow[i] ? <div className="code-box-copy"> {dataRow.vouchers_code}</div> : <Link href="">
                                                    <a class="code-btns" id="vouchers_img_242">
                                                        <img src="static/images/codebtn.jpg" alt="Get code and open site" />
                                                    </a>
                                                </Link>
                                            }
                                        </> :
                                            jsCookie.get('jwtToken') ? <Link href={voucher_link}><a target="_blank" className="btn green-btn">Visit site</a></Link> : <Link href="/signin"><a className="btn green-btn">Visit site</a></Link>
                                    }

                                </div>
                            </div>
                            </>
                        })
                        : <> <p></p><p>At this time we've no additional voucher codes or offers available.
                        Make sure you favourite this retailer to keep updated on their latest offers.</p>
                            <Link href="/signin">
                                <a className="btn get-green-btn">Visit site</a>
                            </Link></>
                }

            </>
        )
    }
})





