import React, { Component } from 'react';
import axios from 'axios';
import '../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../utils/Common';
import jsCookie from 'js-cookie';
export default withRouter(class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrList: [],
            loading: true,
            jwtToken: '',
            isActive: false,
        }
    }
    componentDidMount = () => {
        this.getMenusList();

        this.setState({ jwtToken: jsCookie.get('jwtToken') });
    }
    getMenusList = () => {
        this.setState({ loading: true });
        let listUrl = apiUrl + 'common/menus?showInMenu=1';
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
    toggleNav = () => {
        
        this.setState(prevState => ({
          isActive: !prevState.isActive
        }))
      }
    render() {

        return (

            <div>
                <div className="head-nav inner navbar is-shadowless">
                    <div className="container">
                        <div className="level is-fullwidth">
                            <div className="level-left">
                                <Link href="/">
                                    <a className="max-log-img">
                                        <img src="/static/images/logo.png" />
                                    </a>
                                </Link>
                            </div>
                            <div className="level-right">
                                <div className="navbar-end is-uppercase">
                                    <div className="navbar-item head-rt-menu">
                                        <div className="nav-it-top">
                                            <ul className="nav-tp-lt">
                                                <li><Link href="/"><a>Home</a></Link></li>
                                                <li><Link href="/contact"><a>Contact us</a></Link></li>
                                            </ul>

                                            {
                                                this.state.jwtToken ? <><ul className="is-relative is-inline-block">
                                                    <li className="is-relative is-inline-block" style={{ width: '20px', marginRight: '20px' }}><span class="notfiy">
                                                        <a href="/activity" title="notification">
                                                            <img src="/static/images/icons/note.svg" alt="i" />
                                                            <span id="count" class="note-count">0</span>
                                                        </a>
                                                    </span></li>
                                                    <li className="is-relative is-inline-block" style={{ width: '20px', marginRight: '10px' }}><span class="logout" title="logout">
                                                        <Link href="/logout">
                                                            <a>
                                                                <img src="/static/images/icons/logout.svg" alt="i" />
                                                            </a></Link>
                                                    </span></li>
                                                </ul><ul className="nav-tp-rt">
                                                        <li><Link href="/my-account"><a>My Account</a></Link></li>
                                                    </ul>
                                                </> : <ul className="nav-tp-rt">
                                                        <li><Link href="/signin"><a>Login</a></Link></li>
                                                        <li><Link href="/signup"><a>join</a></Link></li>
                                                    </ul>
                                            }

                                        </div>
                                        <div className="nav-it-bot">
                                            <div className="field has-addons">
                                                <div className="control">
                                                    <input className="input is-shadowless" type="text" placeholder="Search by store - Fastest paying cashback site" />
                                                </div>
                                                <div className="control">
                                                    <a className="button is-btn-srch"><i className="fa fa-search"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <nav className="" role="navigation" aria-label="main navigation">
                    <div className="header-bot-in">
                        <div className="container">
                            <div className="">
                                <a role="button" className="navbar-burger burger sm-menu" onClick={this.toggleNav} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a>
                            </div>
                            <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                                <ul>
                                    <li><Link href="/sharbing-software"><a className="navbar-item">Sharbing Software</a></Link></li>

                                    {

                                        (this.state.arrList.length > 0) ?
                                            this.state.arrList.map(function (dataRow) {
                                                return <li className="navbar-item has-dropdown is-hoverable">
                                                    <Link href={`${dataRow.submenus.length > 0 ? '' : '/' + dataRow.link}`}><a className={`${dataRow.submenus.length > 0 ? 'navbar-link' : 'navbar-item'}`}>{dataRow.name}</a></Link>

                                                    {
                                                        dataRow.submenus.length > 0 ?
                                                            <div className="navbar-dropdown flipInY animated" role="menu">
                                                                <SubMenuContent subMenus={dataRow.submenus} />
                                                            </div>
                                                            : ''
                                                    }
                                                </li>
                                            }) : ''
                                    }

                                    <li><Link href="/affiliates"><a className="navbar-item">Affiliates</a></Link></li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
})
const SubMenuContent = (props) => {

    return <div>
        {
            props.subMenus.map(function (dataRow, i) {
                return <div>
                    <Link href={`/${dataRow.link}`}><a className="navbar-item">{dataRow.name}</a></Link>
                    <hr className="dropdown-divider has-background-light"></hr>
                </div>
            })

        }

    </div>
}





