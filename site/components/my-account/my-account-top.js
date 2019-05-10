import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';


const MyAccountTop = (props) => (

    <div>
        <div className="box-section mg-t0">
            <div className="fwid box-sec-01">
                <div className="row-same-height columns is-variable is-0">
                    <div className="column is-6 hero is-medium is-bold bg-green colors-box">

                        <div className="fwid two-box"> <span className="box-white-line">&nbsp;</span>
                            <h2 className="box-head">My Account</h2>
                        </div>
                    </div>
                    <div className="column is-6 col-md-height bg-white texts-box">
                        <div className="fwid two-box">
                            <div className="fwid learn-box">
                                <div className="level-left mg-b-20">
                                    <div className="level-item">
                                        <p className="subtitle is-5 has-text-grey">
                                            <span>Name</span> :
                                            </p>
                                    </div>
                                    <div className="level-item">
                                        <h1 className="trun-title-box is-marginless is-5">{props.userData.name}</h1>
                                    </div>
                                </div>
                                <div className="level-left mg-b-20">
                                    <div className="level-item">
                                        <p className="subtitle is-5 has-text-grey">
                                            <span>Email</span> :
                                            </p>
                                    </div>
                                    <div className="level-item">
                                        <h1 className="trun-title-box is-marginless is-5">{props.userData.email}</h1>
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>

);

export default MyAccountTop;





