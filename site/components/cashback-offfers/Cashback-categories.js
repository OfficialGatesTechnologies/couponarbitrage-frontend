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
        const { menuUrl, handleSort, sortOrder, sortKey,handleInputChange,handleSearch } = this.props;
        return (
            <>
                <div className="cbk-categories">
                    <h1>Cashback Categories</h1>
                    <div className="cbk-at-list">
                        <ul>

                            {
                                (this.state.arrList.length > 0) ?
                                    this.state.arrList.map(function (dataRow) {
                                        return <li><Link href={`/${menuUrl}?subcat=${dataRow.cat_url}`} as={`/${menuUrl}/${dataRow.cat_url}`} ><a>{dataRow.cat_title}</a></Link></li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>

                    <div className="cbk-srch-off">
                        <div className="columns is-vcentered">
                            <div className="column is-6">
                                <span className="is-inline-block has-text-weight-bold">Search Offers</span>
                                <div className="is-inline-block v-al-mid m-l-15">
                                    <div className="field has-addons">
                                        <div className="control">
                                            <input className="input srch-off-input is-shadowless" name="searchKey" type="text" onChange={handleInputChange} />
                                        </div>
                                        <div className="control">
                                            <a onClick={handleSearch} className="button is-btn-srch-off"><i className="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="srt-col column is-6">
                                <span className="is-inline-block has-text-weight-bold">Sort By:</span>
                                <ul className="is-inline-block m-l-15">
                                    <li onClick={handleSort.bind(this, 'title', sortOrder)}>
                                        {
                                            sortKey === 'title' && sortOrder == 'asc' ? ' Z-A' : 'A-Z'
                                        }


                                    </li>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <li onClick={handleSort.bind(this, 'value', sortOrder)}>
                                        {
                                            sortKey === 'value' && sortOrder == 'asc' ? ' Highest £' : 'Lowest £'
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
})





