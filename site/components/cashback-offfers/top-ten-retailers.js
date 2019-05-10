import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
export default withRouter(class TopTenRetailers extends Component {

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
        let listUrl = apiUrl + 'offers/offer-list?offferFor=top&pageLimit=10&parentId=' + this.props.parentId;
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
                <div className="cbk-top-cat">
                    <div className="top-cat-ttl has-text-centered">TOP 10 Retailers</div>
                    <ol>
                        {
                            (this.state.arrList.length > 0) ?
                                this.state.arrList.map(function (dataRow) {
                                    return <li><Link href={`/cashback-details?url_key=${dataRow.url_key}`} as={`/${dataRow.url_key}`}><a>{`${dataRow.aid ? dataRow.aid.name : ''} ${dataRow.title ? dataRow.title : ''}`} -

                                        {
                                            valueType == 1 ? <span>£{dataRow.value}</span> : <span>{dataRow.value}%</span>
                                        }
                                    </a></Link></li>
                                })
                                : ''
                        }
                    </ol>
                </div>

            </>
        )
    }
})





