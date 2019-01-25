import React, { Component } from 'react';
import { ADMINMODULES } from '../utils/Common';
import Link from 'next/link';
import { withRouter } from 'next/router';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


export default withRouter(class NavBar extends Component {

    render() {

        return (
            <SideNav >
                <SideNav.Toggle />
               
            </SideNav>


        )
    }
})



