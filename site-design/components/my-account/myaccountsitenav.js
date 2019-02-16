import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class myaccountsitenav extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                <div className="nav-box">
                    <h4>Navigation</h4>
                    <ul>
                        <li className="active" role="presentation"><Link href="/earnings"><a>Earnings</a></Link></li>
                        <li className="" role="presentation"><Link href="/click-to-merchants"><a>Clicks to Merchants</a></Link></li>

                    </ul>
                </div>
                <div className="similar-ret">
                    <h4>Why Not Try...</h4>
                    <div className="retail-sec">
                        <div className="simi-image level">
                        <div className="level-right">
                        <Link href="">
                        <span>
                        <a><img src="static/images/others/dashcasino-similar-img-01.png" alt="Red Bus - Bingo"/></a>
                        </span>
                    </Link>
                        </div>
                        <div className="level-right"><span><img src="static/images/icons/acc-ar-close.png" alt="i" /></span></div>                        
                        </div>
                        <div className="simi-arr"></div>

                </div>
                    <div className="retail-sec">
                        <div className="simi-image level">
                        <div className="level-right">
                    <Link href="">
                    <span>
                        <a><img src="static/images/others/dashcasino-similar-img.png" alt="Red Bus - Bingo"/></a>
                        </span>
                        </Link>
                        </div>
                        <div className="level-right"><span><img src="static/images/icons/acc-ar-close.png" alt="i" /></span></div>                        
                        </div>
                        <div className="simi-arr"></div>

                </div>
                <div className="retail-sec">
                        <div className="simi-image level">
                        <div className="level-right">
                    <Link href="">
                    <span>
                    <a><img src="static/images/others/dashcasino-similar-img-02.png" alt="Red Bus - Bingo"/></a>
                    </span>
                        </Link>
                        </div>
                        <div className="level-right"><span><img src="static/images/icons/acc-ar-close.png" alt="i" /></span></div>                        
                        </div>
                        <div className="simi-arr"></div>

                </div>
            </div>
              
           </div> 
        )
    }
})





