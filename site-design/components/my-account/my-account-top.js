import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class MyAccountTop extends Component {
    constructor(props) {
        super(props)
        this._toggleDiv = this._toggleDiv.bind(this)
      }
      
      _toggleDiv() {
        $(this.refs['toggle-div']).slideToggle()
      }
    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
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
                                            <h1 className="trun-title-box is-marginless is-5">Mani</h1>
                                            </div>
                                            </div>
                                            <div className="level-left mg-b-20">
                                            <div className="level-item">
                                            <p className="subtitle is-5 has-text-grey">
                                            <span>Email</span> :
                                            </p>
                                            </div>
                                            <div className="level-item">
                                            <h1 className="trun-title-box is-marginless is-5">manigandan.g@officialgates.com</h1>
                                            </div>
                                            </div>
                                            <div className="level-left">
                                            <div className="level-item">
                                            <div className="dropdown-btn is-relative">
                                           
                                                <button className="add-account-toggle green-btn" onClick={this._toggleDiv}>
                                                <span>Switch Account</span>
                                                <span className="icon is-small has-text-weight-light m-l-5">
                                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                                </button>
                                                <div className="add-account" ref="toggle-div">
                                                <div className="buttons are-medium">
                                             
                                                <Link href=""><a className="button green-btn txt-decnone">Add Account</a></Link>
                                             
                                               
                                                <Link href=""><a className="button purple-btn txt-decnone">Sign Out</a></Link>
                                                
                                    
                                                
                                                
                                               
                                                </div>
                                                </div>
                                            </div>
                                           
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            
                                            
                                            
                                            
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                
              
           </div> 
         
        )
    }
})





