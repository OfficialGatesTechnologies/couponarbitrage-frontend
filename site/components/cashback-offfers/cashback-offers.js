import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import jsCookie from 'js-cookie';
import renderHTML from 'react-render-html';
export default withRouter(class CashbackOffers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrList: [],
            loading: true,
            jwtToken: jsCookie.get('jwtToken')
        }

    }
    componentDidMount = () => {

    }

    render() {
        const { offers, valueType,onOpenTrackLink} = this.props;
        const { jwtToken} = this.state;
        return (
            <>
                <div className="cbk-get-box">
                    <h4>Cashback Offers</h4>
                    {
                        (offers.length > 0) ?
                            offers.map(function (dataRow) {
                                return <>
                                    {
                                        valueType == 1 ? <h3>£{dataRow.cashback}</h3> : <h3>{dataRow.cashback}%</h3>
                                    }
                                    <p>{renderHTML(dataRow.description )}</p>
                                    {
                                        jwtToken ?
                                            // <Link href={`/reminder?offerId=${dataRow._id}`} as={`/reminder/${dataRow._id}`}> </Link>
                                                <a onClick={onOpenTrackLink.bind(this,`/reminder/${dataRow._id}`)} className="btn get-green-btn" target="_blank">GET CASHBACK</a>
                                           
                                            :
                                            <Link href="/signin">
                                                <a className="btn get-green-btn">GET CASHBACK</a>
                                            </Link>
                                    }
                                    {
                                        dataRow.exclusive_rate === 1 ? <a className="btn get-purple-btn">EXCLUSIVE RATE</a> : ''
                                    }


                                </>
                            })
                            : <> <p></p><p>No cashback offers found.</p>
                                <Link href="/signin">
                                    <a className="btn get-green-btn">JOIN SITE</a>
                                </Link></>
                    }
                </div>
            </>
        )
    }
})





