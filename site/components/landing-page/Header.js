import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styles.scss'
import { withRouter } from 'next/router';
import Link from 'next/link';
import { apiUrl } from '../../utils/Common';
export default withRouter(class Header extends Component {

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
        let listUrl = apiUrl + 'common/menus?showInLandingPageMenu=1';
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

            <div>

                <nav className="head-nav navbar is-shadowless" role="navigation" aria-label="main navigation">
                    <div className="container">

                        <div className="navbar-brand navbar-start">
                            <Link href="/">
                                <a className="max-log-img">

                                    <img src="static/images/logo.png" />
                                </a></Link>
                            <a role="button" className="navbar-burger burger sm-menu" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className="navbar-menu">
                            <div className="navbar-end is-uppercase">
                                <Link href=""><a className="navbar-item">Home</a></Link>
                                {

                                    (this.state.arrList.length > 0) ?
                                        this.state.arrList.map(function (dataRow) {
                                            return <div className="navbar-item has-dropdown is-hoverable">
                                                <Link href={`${dataRow.submenus.length > 0 ? '' : dataRow.link}`}><a className={`${dataRow.submenus.length > 0 ? 'navbar-link cus-link' : 'navbar-item'}`}>{dataRow.name}</a></Link>
                                                <hr className="dropdown-divider has-background-light"></hr>
                                                {
                                                    dataRow.submenus.length > 0 ?
                                                        <div className="navbar-dropdown flipInY animated">
                                                            <SubMenuContent subMenus={dataRow.submenus} />
                                                        </div>
                                                        : ''
                                                }
                                            </div>
                                        }) : ''
                                }
                                <Link href="/contact"><a className="navbar-item">Contact</a></Link>
                                <div className="navbar-item">
                                    <div className="button1">
                                        <Link href="/signin">
                                            <a className="sm-btn-orange is-radiusless" >
                                                MEMBER LOGIN
                                        </a>
                                        </Link>
                                        <span className="jus-btn is-size-7 mg-t-10">
                                            <Link href="/cashback-bonuses"><a>I JUST WANT TO BROWSE</a></Link>
                                        </span>
                                    </div>
                                </div>
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
                    <Link href={dataRow.link}><a className="navbar-item">{dataRow.name}</a></Link>
                    <hr className="dropdown-divider has-background-light"></hr>
                </div>
            })

        }

    </div>
}





