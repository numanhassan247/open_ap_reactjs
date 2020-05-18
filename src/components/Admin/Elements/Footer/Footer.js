import React from 'react'

const Footer = () => {
    return (
        <footer className="c-footer">
            <div><a href="https://coreui.io">B2B</a> © {new Date().getFullYear()}</div>
            <div className="mfs-auto">Powered by&nbsp;<a href="https://coreui.io/">CoreUI Free </a></div>
        </footer>
    )
}

export default Footer
