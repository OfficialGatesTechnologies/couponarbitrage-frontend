import React from 'react';
import '../styles/styles.scss'
import Link from 'next/link';
import renderHTML from 'react-render-html';
const LearnSportsArbitrage_Box = (props) => (

   
    <div>
        <div className="fwid learn-boxs mg-t-40 columns is-multiline is-variable is-1"> 
        {
            (props.menuRow.length > 0) ?
                props.menuRow.map(function (dataRow) {
                    return <div className="column is-6 pd-t-b-4 is-relative">
                            <div className="bg-white colors-box">
                                <div className="fwid two-box">
                                    <h4><i className="icon-learnbox">&nbsp;</i> {dataRow.name}</h4>
                                {renderHTML(dataRow.description)}
                                <Link href={`/learn-sports-arbitrage/${dataRow.link}`}><a title="More" className="icon-more">&nbsp;</a></Link>
                                </div>
                            </div>
                        </div>

                  
                }) : 
                    <div className="column  pd-t-b-4 is-relative">
                        <div className="bg-white colors-box">
                            <div className="fwid two-box"> No articles found </div></div></div>
                
            
        }
        

    </div>
    </div>
)
export default LearnSportsArbitrage_Box;





