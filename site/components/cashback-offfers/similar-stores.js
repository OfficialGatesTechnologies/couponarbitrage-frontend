import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import renderHTML from 'react-render-html';
export default withRouter(class SimilarStores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrList: [],
            loading: true
        }

    }
    componentDidMount = () => {
        this.getMenusList();
    }
    getMenusList = () => {
        this.setState({ loading: true });
        let listUrl = apiUrl + 'offers/offer-list?pageLimit=5&parentId=' + this.props.parentId + '&subcat=' + this.props.catId;
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

        const { valueType } = this.props;

        return (
            <>
                <div className="similar-ret">
                    <h4>Similar retailers</h4>
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
                                        <div className="level-left">
                                            <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}>
                                                <a>
                                                    {
                                                        dataRow.uploadType && dataRow.uploadType !== 'banner' ?
                                                            <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${dataRow.aid ? dataRow.aid.name : ''} ${dataRow.title ? dataRow.title : ''}`} />

                                                            : dataRow.banner !== "" ? renderHTML(dataRow.banner) : '&nbsp;'
                                                    }
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="level-right">
                                            <span><img src="static/images/icons/acc-ar-close.png" alt="i" /></span>
                                        </div>
                                    </div>
                                    <div className="simi-arr"></div>

                                    <div className="smilar-cb">
                                        <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}><a>

                                            {
                                                valueType == 1 ? <span>£{dataRow.value}</span> : <span>{dataRow.value}%</span>
                                            } cashback<span><img src="static/images/icons/acc-ar-doub.png" alt="i" /></span></a></Link>

                                    </div>
                                </div>



                            })
                            : <div className="retail-sec"><div className="smilar-cb">No retailers found. </div></div>
                    }

                </div>

            </>
        )
    }
})





