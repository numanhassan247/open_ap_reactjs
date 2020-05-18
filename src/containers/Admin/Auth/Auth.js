import '@coreui/coreui';
import '../../../scss/Admin/style.scss';

import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import Alert from '../../../components/Admin/UI/Alert/Alert'
import Spinner from '../../../components/Admin/UI/Spinner/Spinner'
import Login from '../../../components/Admin/Auth/Login'
import Register from '../../../components/Admin/Auth/Register'

const Auth = (props) => {
    let history = useHistory();


    const [form, setForm] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        rePassword: ''
    });


    if (props.isAuth) {
        return <Redirect to='/admin' />
    }



    const handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleClickLogin = () => {
        history.push("/admin/login");
    }
    const handleClickRegister = () => {
        history.push("/admin/register");
    }
    const handleDoAuth = () => {
        console.log('click auth...');
        let isLogin = true;
        let registerData = {};
        if (props.formType === 'register') {
            registerData = {
                first_name: form.fname,
                last_name: form.lname
            }
            isLogin = false;
        }
        props.onAuth(form.email, form.password, isLogin, registerData);
    }

    let spinner = null;
    if (props.loading) {
        spinner = <Spinner />
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage =
            Array.isArray(props.error.message) ?
                <Alert isRemovable={true} type='error'>
                    {props.error.message.map((error, i) => {
                        return <p key={i}>{error}</p>
                    })}
                </Alert>
                :
                <Alert isRemovable={true} type='error'>
                    {props.error.message}
                </Alert>
    }

    return (


        (props.formType === 'login') ?
            <Login
                spinner={spinner}
                formType={props.formType}
                errorMessage={errorMessage}
                form={form}
                handleOnChangeInput={handleOnChangeInput}
                handleDoAuth={handleDoAuth}
                handleClickRegister={handleClickRegister}
            />
            :
            <Register
                spinner={spinner}
                formType={props.formType}
                errorMessage={errorMessage}
                form={form}
                handleOnChangeInput={handleOnChangeInput}
                handleDoAuth={handleDoAuth}
                handleClickLogin={handleClickLogin}
                handleClickRegister={handleClickRegister}
            />
    );
}

const mapStateToProps = state => ({
    loading: state.reducerAuth.loading,
    error: state.reducerAuth.error,
    isAuth: state.reducerAuth.token
})
const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isLogin, registerData) => dispatch(actions.auth(email, password, isLogin, registerData))

})


export default connect(mapStateToProps, mapDispatchToProps)(Auth)
