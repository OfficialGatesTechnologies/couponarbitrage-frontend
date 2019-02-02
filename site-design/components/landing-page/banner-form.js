import React, { Component } from 'react';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';

export default withRouter(class BannerForm extends Component {

    state = {

    }
    componentDidMount = () => {

    }
    render() {

        return (
            
            <div>
                
                    <div className="ban-form">
                    
                    <div className="card is-shadowless">
                    <div className="card-header banner-form-text-title">
                        <h2 className="card-header-title-txt">
                        JOIN FREE TODAY
                        </h2>
                    </div>
                    <div className="card-content bg-orange">
                       
                        <div className="content Form_index_ban_input">
                            <div className="columns m-b-0">
                                <div className="column">
                                <div className="control">
                                    <input className="input" type="text" placeholder="First Name" />
                                </div>
                                </div>
                                <div className="column">
                                <div className="control">
                                <input className="input" type="text" placeholder="Last Name" />
                                </div>
                                </div>
                            </div>
                            <div className="columns m-b-0">
                                <div className="column">
                                <div className="control">
                                    <input className="input" type="text" placeholder="User Name" />
                                </div>
                                </div>
                                <div className="column">
                                <div className="control">
                                <input className="input" type="text" placeholder="Email Address" />
                                </div>
                                </div>
                            </div>
                            <div className="columns m-b-0">
                                <div className="column">
                                <div className="control">
                                    <input className="input" type="text" placeholder="Password" />
                                </div>
                                </div>
                                <div className="column">
                                <div className="control">
                                <input className="input" type="text" placeholder="Verify Password" />
                                </div>
                                </div>
                            </div>
                            <div className="columns m-b-0">
                                <div className="column is-half">
                                <div className="control">
                                    <input className="input" type="text" placeholder="Phone Number" />
                                </div>
                                </div>
                                
                                <div className="column">
                                    <div className="control">
                                    <input className="input" type="text" placeholder="Security code" />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="control">
                                    <img src="/static/images/captcha.jpg" width="100" height="30" alt=" "/>
                                    </div>
                                </div>
                               

                            </div>
                            <div className="columns">
                                <div className="column">
                                <div className="txt-box-check">
                                    <div className="form-group">
                                        <div className="checkbox join-check-wrap">
                                            <label>
                                             <input type="checkbox" name="termsCond" value="1" id="termsCond" className="fm-check" />                       <span className="cr"><i className="cr-icon fas fa-check"></i></span>
                                               <span className="has-text-white">I accept the</span> <a target="_BLANK" href="#!">terms and conditions</a>
                                            </label>
                                                <div className="full-width">
                                                <span className="err_msg err_msg_add" id="err_termsCond"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                <div className="join-btn has-text-centered">
                                    <input type="submit" name="signupBut" id="signupBut" className="join-btn-in has-text-weight-semibold" value="JOIN NOW" />
                                </div>
                                
                                <div className="ban-other-log">
                                <p>
                                    or login using: <span><Link href="#!"><a><img src="static/images/icons/join-fb.png"/></a></Link></span>
                                </p>
                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                
                </div>
                <div className="txt-banner">
                    <h2>The World's Favourite</h2>
                    <h1>Gambling Site</h1>
                    <h6>Helping punters since 2010</h6>
                </div>
                
                
              
           </div> 
        )
    }
})





