import React from 'react';
import '../styles/styles.scss';
import renderHTML from 'react-render-html';
const LearnSportsArbitrage_Top = (props) => (


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
                            <div className="fwid learn-box">{renderHTML(props.menuRow.description)}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
)
export default LearnSportsArbitrage_Top;



