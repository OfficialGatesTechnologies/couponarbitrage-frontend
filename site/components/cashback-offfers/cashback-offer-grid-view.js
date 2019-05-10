import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import ContentLoader from 'react-content-loader';
export default withRouter(class CasbackOfferGridView extends Component {

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
                <div className="columns is-multiline is-variable is-1 cbk-clm-list-in is-no-border" id="grid-view">
                    {
                        loading ?
                            <ContentLoader
                                height={100}
                                width={300}
                                speed={2}
                                primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb">
                                <rect x="17" y="12" rx="0" ry="0" width="55" height="58" />
                                <rect x="85" y="40" rx="0" ry="0" width="102" height="5" />
                                <rect x="85" y="50" rx="0" ry="0" width="102" height="5" />
                                <rect x="85" y="60" rx="0" ry="0" width="102" height="6" />
                                <rect x="85" y="15" rx="0" ry="0" width="102" height="5" />
                                <rect x="212" y="16" rx="0" ry="0" width="52" height="27" />
                            </ContentLoader>
                            :
                            (offerList.length > 0) ?
                                offerList.map(function (dataRow) {
                                    var imagePath = (dataRow.uploadType === 'imageFile') ?
                                        dataRow.imageFile :
                                        dataRow.uploadType === 'internal_banner' ?
                                            dataRow.internal_banner :
                                            dataRow.uploadType === 'banner' ? dataRow.banner :
                                                '';
                                    return <div className="column is-4 pd-t-b-4">
                                        <div className="card text-center is-shadowless bor-e1">
                                            <article className="card-image">
                                                <div className="card-content text-center">
                                                    <div className="content">
                                                        <div className="image-lt mg-b-20 is-fullwidth">
                                                            {
                                                                dataRow.uploadType && dataRow.uploadType !== 'banner' ?
                                                                    <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${dataRow.aid ? dataRow.aid.name : ''} ${dataRow.title ? dataRow.title : ''}`} />

                                                                    : dataRow.banner !== "" ? dataRow.banner : '&nbsp;'
                                                            }
                                                        </div>
                                                        <h4 className="offer-content-title">{dataRow.aid ? dataRow.aid.name : ''} - {dataRow.title ? dataRow.title : ''}</h4>
                                                        <div className="text-center mg-auto">
                                                            {
                                                                valueType == 1 ? <p className="price-box">£{dataRow.value}</p> : <p className="price-box">{dataRow.value}%</p>
                                                            }

                                                            <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}><a className="price-btn">Claim Cashback</a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                })
                                : <div className="fwid cashback-li">
                                    <div className="fwid cashli-top"> No Current Offers in this category, please select a different category or try again later </div>
                                </div>
                    }
                </div>
            </>
        )
    }
})





