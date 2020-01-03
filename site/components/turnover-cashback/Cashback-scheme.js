import React, { Component } from 'react';
import '../../styles/styles.scss';
import Link from 'next/link';
import renderHTML from 'react-render-html';
const SkrillCashbackScheme = (props) => (
    <div>
        <div className="box-section mg-t0">
            <div className="fwid box-sec-01">
                <div className="row-same-height columns is-variable is-0">
                    <div className="column is-6 hero is-medium is-bold bg-green colors-box">

                        <div className="fwid two-box"> <span className="box-white-line">&nbsp;</span>
                            <h2 className="box-head">{props.menuRow.name}</h2>
                        </div>

                    </div>
                    <div className="column is-6 col-md-height bg-white texts-box">
                        <div className="fwid two-box">
                            <div className="fwid learn-box">
                                <h1 className="trun-title-box">{props.menuRow.name}</h1>
                                <p>{renderHTML(props.menuRow.description)}</p></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="fwid learn-boxs learn-list mg-t-40">
            <div className="bg-white colors-box">
                <div className="bread-crumbs-wrap">
                    <div className="fwid two-box bread-crumbs">
                        <h3 className="bread-title">{props.menuRow.name}</h3>
                        <div className="fwid texts-box">
                            <div className="fwid free-arbs-menus mg-t-30 mg-b-30">
                                <ul role="tablist" className="no-style clearfix">
                                    <li className="" role="presentation"><Link href="/ecopayz-cashback"><a title="ecopayz Cashback Scheme">Ecopayz Cashback Scheme</a></Link></li>
                                    <li className="active" role="presentation"><Link href="/skrill-cashback"><a title="Skrill Cashback Scheme">Skrill Cashback Scheme</a></Link></li>
                                    <li className="" role="presentation"><Link href="/sbobet-cashback"><a title="SBOBET Cashback Program">SBOBET Cashback Program</a></Link></li>
                                    <li className="" role="presentation"><Link href="/neteller-cashback"><a title="Neteller Cashback Scheme" >Neteller Cashback Scheme</a></Link></li>
                                    <li className="" role="presentation"><Link href="/asian-connect-cashback"><a title="Asianconnect Cashback">Asianconnect Cashback</a></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="fwid purple-txt mg-t-40">
            <div className="bg-white colors-box">
                <div className="bread-crumbs-wrap">
                    <div className="fwid two-box bread-crumbs">
                        <h3 className="bread-title">{props.menuRow.name}</h3>
                        {renderHTML(props.menuRow.introtext)}
                    </div>
                </div>
            </div>
        </div>

    </div>
)
export default SkrillCashbackScheme;






