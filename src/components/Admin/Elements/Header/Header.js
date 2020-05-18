import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return (

        <header className="c-header c-header-light c-header-fixed">

            <button className="c-header-toggler c-className-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
                <i className='cil cil-menu'></i>
            </button>

            <button onClick={props.toggleSideBarShow} className="c-header-toggler c-className-toggler mfs-3 d-md-down-none" type="button" responsive="true">
                <i className=' cil cil-menu'></i>
            </button >


            <ul className="c-header-nav d-md-down-none">
                <li className="c-header-nav-item px-3">
                    <span className="c-header-text" >Dashboard</span>
                </li>
            </ul>
            <ul className="c-header-nav mfs-auto">
                <li className="c-header-nav-item px-3 c-d-legacy-none">
                    <button className="c-className-toggler c-header-nav-btn" type="button" id="header-tooltip" data-target="body" data-class="c-dark-theme" data-toggle="c-tooltip" data-placement="bottom" title="" data-original-title="Toggle Light/Dark Mode">

                    </button>
                </li >
            </ul >
            <ul className="c-header-nav">

                <li className="c-header-nav-item dropdown">
                    <a className="c-header-nav-link" data-toggle="dropdown" href="admin" role="button" aria-haspopup="true" aria-expanded="false">
                        <div className="c-avatar">
                            <i className="c-avatar-img cil-user" ></i>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right-fixed pt-0">

                        <div className="dropdown-header bg-light py-2"><strong>Settings</strong></div>
                        <Link to={'/admin/profile'} className="dropdown-item" >
                            <i className="cil cil-user c-icon mfe-2"></i>Profile
                        </Link>

                        <Link to='/admin/logout' className="dropdown-item" >
                            <i className="cil cil-account-logout c-icon mfe-2"></i>Logout
                        </Link>
                    </div >
                </li >

            </ul >





            <div className="c-subheader justify-content-between px-3">

                <ol className="breadcrumb border-0 m-0 px-0 px-md-3">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item"><a href="admin">Admin</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>

                </ol>


            </div >
        </header >
    )
}

export default Header
