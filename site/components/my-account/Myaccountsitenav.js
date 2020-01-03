import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { apiUrl } from '../../utils/Common';
import renderHTML from 'react-render-html';
export default withRouter(class myaccountsitenav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            totalRecords: 0,
            pageLimit: 3,
        }

    }
    componentDidMount = () => {
        this.getList();
    }
    getList = () => {
        const { pageLimit } = this.state;
        this.setState({ loading: true });
        let listUrl = apiUrl + 'offers/offer-list?pageLimit=' + pageLimit + '&offferFor=nav';
        axios.get(listUrl)
            .then(res => {
                this.setState({
                    arrList: res.data.results,
                    loading: false
                });
            }).catch(() => {
                this.setState({ loading: false });
            })
    }
    render() {

        return (

            <div>
                <div className="nav-box">
                    <h4>Navigation</h4>
                    <ul>
                        <li className="active" role="presentation"><Link href="/earnings"><a>Earnings</a></Link></li>
                        <li className="" role="presentation"><Link href="/click-to-merchants"><a>Clicks to Merchants</a></Link></li>

                    </ul>
                </div>
                <div className="similar-ret">
                    <h4>Why Not Try...</h4>
                    {
                        (this.state.arrList.length > 0) ?
                            this.state.arrList.map(function (dataRow) {
                                var imagePath = (dataRow.uploadType === 'imageFile') ?

                                    dataRow.imageFile :
                                    dataRow.uploadType === 'internal_banner' ?
                                        dataRow.internal_banner :
                                        dataRow.uploadType === 'banner' ? dataRow.banner :
                                            '';
                                return <div className="retail-sec">
                                    <div className="simi-image level">
                                        <div className="level-right">
                                            <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}>
                                                <span>
                                                    <a>
                                                        {
                                                            dataRow.uploadType && dataRow.uploadType !== 'banner' ?
                                                                <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${dataRow.aid ? dataRow.aid.name : ''} ${dataRow.title ? dataRow.title : ''}`} />

                                                                : dataRow.banner !== "" ? renderHTML(dataRow.banner) : '&nbsp;'
                                                        }
                                                    </a>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="level-right"><span><img src="static/images/icons/acc-ar-close.png" alt="i" /></span></div>
                                    </div>
                                    <div className="simi-arr"></div>

                                </div>
                            })
                            : ''
                    }

                </div>

            </div>
        )
    }
})





