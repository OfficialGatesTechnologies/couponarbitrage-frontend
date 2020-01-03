import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';

export default withRouter(class CashbackCategories extends Component {

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
        let listUrl = apiUrl + 'offers/cashback-cats?parentId=' + this.props.parentId;
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
        const { menuUrl } = this.props;
        return (
            <>
                <div className="nav-box">
                    <h4>Navigation</h4>
                    <ul>

                        {
                            (this.state.arrList.length > 0) ?
                                this.state.arrList.map(function (dataRow) {
                                    return <li className="" role="presentation"><Link href={`/${menuUrl}?subcat=${dataRow.cat_url}`} as={`/${menuUrl}/${dataRow.cat_url}`} ><a>{dataRow.cat_title}</a></Link></li>
                                })
                                : ''
                        }

                    </ul>
                </div>
            </>
        )
    }
})





