import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
import { Carousel } from 'react-responsive-carousel';
export default withRouter(class CashbackBanner extends Component {
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
        let listUrl = apiUrl + 'common/banner-list?bannerFor=feature';
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
            <>
                <div className="column">
                    <div className="cbk-banner-link">
                        <Carousel
                            autoPlay
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop={true}>
                             {
                            (this.state.arrList.length > 0) ?
                                this.state.arrList.map(function (dataRow) {
                                    return <div>
                                    <Link href={dataRow.bannerUrl}><a><img src={`${apiUrl}resources/banner/${dataRow.bannerImageFile}`} alt="banner" /></a></Link>
                                </div>
                                })
                                : ''
                        }
                            
                           
                        </Carousel>

                    </div>
                </div>
            </>
        )
    }
})





