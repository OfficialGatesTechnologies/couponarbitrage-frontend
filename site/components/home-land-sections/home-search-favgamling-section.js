import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import renderHTML from 'react-render-html';
export default withRouter(class HomeSearchFavGamlingsection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            totalRecords: 0,
            pageLimit: 17,
        }

    }
    componentDidMount = () => {
        this.getList();
    }
    getList = () => {
        const { pageLimit } = this.state;
        this.setState({ loading: true });
        let listUrl = apiUrl + 'offers/offer-list?pageLimit=' + pageLimit + '&offferFor=home';
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
                <div className="fav-gamb">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h3 className="has-text-centered">Search for your favourite gambling sites below</h3>
                                <div className="fav-gamb-list">
                                    <ul>
                                        {
                                            (this.state.arrList.length > 0) ?
                                                this.state.arrList.map(function (dataRow) {
                                                    var imagePath = (dataRow.uploadType === 'imageFile') ?

                                                        dataRow.imageFile :
                                                        dataRow.uploadType === 'internal_banner' ?
                                                            dataRow.internal_banner :
                                                            dataRow.uploadType === 'banner' ? dataRow.banner :
                                                                '';
                                                    return <li>
                                                        <Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}>
                                                            <a title="">
                                                                <div id="flip-this" className="flip-horizontal">
                                                                    <div className="front">
                                                                        {
                                                                            dataRow.uploadType && dataRow.uploadType !== 'banner' ?
                                                                                <img src={`${apiUrl}resources/cashbackbanners/${imagePath}`} width="125" alt={`${dataRow.aid?dataRow.aid.name:''} ${dataRow.title?dataRow.title:''}`} />

                                                                                : dataRow.banner !== "" ? renderHTML(dataRow.banner) : '&nbsp;'
                                                                        }

                                                                    </div>
                                                                    <div className="back"  >
                                                                        <h4>£{dataRow.value} <br />Cashback</h4>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                })
                                                : ''
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
})





