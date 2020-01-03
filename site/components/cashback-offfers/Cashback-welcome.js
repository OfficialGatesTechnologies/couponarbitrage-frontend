import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
export default withRouter(class TopTenRetailers extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount = () => {

    }

    render() {

        return (
            <>
                <div className="cbk-top-row">
                    <div className="columns is-desktop is-half-desktop">
                        <div className="column">
                            <div className="cbk-box has-text-centered">
                                <img src="/static/images/others/cbk-01.png" alt="image" />
                                <h5>Cashback On Over<br />100 Brands</h5>
                            </div>
                        </div>
                        <div className="column">
                            <div className="cbk-box has-text-centered">
                                <img src="/static/images/others/cbk-02.png" alt="image" />
                                <h5>Boost Your Gambling<br />Profits</h5>
                            </div>
                        </div>
                        <div className="column">
                            <div className="cbk-box has-text-centered">
                                <img src="/static/images/others/cbk-03.png" alt="image" />
                                <h5>Fastest Cashback<br />Guarantee</h5>
                            </div>
                        </div>
                        <div className="column">
                            <div className="cbk-box has-text-centered">
                                <img src="/static/images/others/cbk-04.png" alt="image" />
                                <h5>Multiple Payment<br />Options</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})





