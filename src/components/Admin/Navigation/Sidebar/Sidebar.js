import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => {



    return (
        <div className={"c-sidebar c-sidebar-dark c-sidebar-fixed " + (props.sideBarShow && ' c-sidebar-lg-show')} >

            <div className="c-sidebar-brand d-md-down-none">
                B2B
            </div >

            <ul className="c-sidebar-nav ps ps--active-y">
                <li className="c-sidebar-nav-item">

                    <NavLink exact className="c-sidebar-nav-link " activeClassName='c-active' to={'/admin'} >
                        <i className="c-sidebar-nav-icon cil-apps"></i>Dashboard
                    </NavLink>
                </li>

                <li className="c-sidebar-nav-item">
                    <NavLink to={'/admin/users'} className="c-sidebar-nav-link" activeClassName='c-active'>
                        <i className="c-sidebar-nav-icon cil-list-rich"></i>
                        Users Managment
                    </NavLink>
                </li>

            </ul >
            <button className="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-unfoldable"></button>
        </div>
    )
}

export default Sidebar
