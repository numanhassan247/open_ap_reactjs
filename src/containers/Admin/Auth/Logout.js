import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'

const Logout = (props) => {
    useEffect(() => {
        props.onLogout();
    });

    return (
        <Redirect to='/admin/login' />
    )
}


const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.authLogout())
})

export default connect(null, mapDispatchToProps)(Logout)