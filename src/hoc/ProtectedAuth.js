import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { Redirect } from 'react-router-dom'

const ProtectedAuth = (props) => {
    return (props.isAuth) ?
        (
            props.children
        )
        :
        <Redirect to='/admin/login' />
}

const mapStateToProps = state => ({
    isAuth: state.reducerAuth.token
})
export default connect(mapStateToProps)(ProtectedAuth)
