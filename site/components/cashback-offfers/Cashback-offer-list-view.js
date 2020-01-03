import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import ContentLoader from 'react-content-loader';
export default withRouter(class CasbackOfferListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrList: [],
            loading: true
        }

    }
    componentDidMount = () => {

    }

    render() {
        const { valueType, offerList, loading } = this.props;
        return (
            <>



                {
                    loading ? <div className="cbk-clm-list-in" id="list-view">

                        <ContentLoader
                            height={100}
                            width={300}
                            speed={2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="17" y="12" rx="0" ry="0" width="55" height="58" />
                            <rect x="85" y="40" rx="0" ry="0" width="102" height="5" />
                            <rect x="85" y="50" rx="0" ry="0" width="102" height="5" />
                            <rect x="85" y="60" rx="0" ry="0" width="102" height="6" />
                            <rect x="85" y="15" rx="0" ry="0" width="102" height="5" />
                            <rect x="212" y="16" rx="0" ry="0" width="52" height="27" />
                        </ContentLoader>


                    </div> :
                        (offerList.length > 0) ?
                            offerList.map(function (dataRow) {

                                var imagePath = (dataRow.uploadType === 'imageFile') ?

                                    dataRow.imageFile :
                                    dataRow.uploadType === 'internal_banner' ?
                                        dataRow.internal_banner :
                                        dataRow.uploadType === 'banner' ? dataRow.banner :
                                            '';
                                return <div className="cbk-clm-list-in" id="list-view">
                                    <div className="cbk-clm-img">
                                        <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}><a>

                                            {
                                                dataRow.uploadType && dataRow.uploadType !== 'banner' ?
                                                    <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${dataRow.aid ? dataRow.aid.name : ''} ${dataRow.title ? dataRow.title : ''}`} />

                                                    : dataRow.banner !== "" ? dataRow.banner : '&nbsp;'
                                            }
                                        </a></Link>
                                    </div>
                                    <div className="cbk-clm-cnt">
                                        <h4 className="offer-content-title">{dataRow.aid ? dataRow.aid.name : ''} - {dataRow.title ? dataRow.title : ''}</h4>

                                        {
                                            dataRow.details_default == 1 ?
                                                <p>

                                                    Earn {valueType}{dataRow.value}cash back when you register a
                      new{dataRow.aid ? dataRow.aid.name : ''} account by clicking on the
                     {dataRow.aid ? dataRow.aid.name : ''} banner or by clicking "Join Site" below.
                      To be eligible for the {valueType}{dataRow.value} cash back you must deposit at
                      least  {valueType}50 and wager at least  {valueType}50 in the
                      {dataRow.title ? dataRow.title : ''} on selections with
                                                                                                                                                                odds of at least 2.00, within 7 days of registering.
                                                                                                                                                                Claims usually show up the following day but can take
                                                                                                                                                                up to 7 days in some cases.
                                            </p> : <p>{dataRow.details}</p>
                                        }


                                    </div>
                                    <div className="cbk-clm-act">
                                        {
                                            valueType == 1? <p>£{dataRow.value}</p>: <p>{dataRow.value}%</p>
                                        }
                                       

                                        <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}><a>Claim Cashback</a></Link>

                                    </div>
                                </div>
                            })
                            : <div className="fwid cashback-li">
                                <div className="fwid cashli-top"> No Current Offers in this category, please select a different category or try again later </div>
                            </div>
                }

            </>
        )
    }
})





