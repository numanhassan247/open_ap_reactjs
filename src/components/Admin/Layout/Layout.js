import React, { Fragment, useState } from 'react'

import Sidebar from '../Navigation/Sidebar/Sidebar';
import Header from '../Elements/Header/Header';
import Footer from '../Elements/Footer/Footer';

const Layout = (props) => {

    const [sideBarShow, setSideBarShow] = useState(true);

    const toggleSideBarShow = () => {
        setSideBarShow(!sideBarShow)
    }

    return (
        <Fragment>
            <Sidebar sideBarShow={sideBarShow} />
            <div className='c-wrapper'>
                <Header toggleSideBarShow={toggleSideBarShow} />
                <div className='c-body'>
                    <main className='c-main'>
                        <div className='container-fluid'>
                            <div id='ui-view'>
                                <div>
                                    <div className='fade-in'>
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}

export default Layout
