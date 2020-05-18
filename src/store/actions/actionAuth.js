import * as actionTypes from './actionTypes'
import Axios from 'axios';
const API_URL = process.env.REACT_APP_API_ENDPOINT;


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId, data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        data: data
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('data')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isLogin, registerData) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            ...registerData
        }
        let url = API_URL + 'register';
        if (isLogin) {
            url = API_URL + 'login';
        }
        console.log(authData);
        Axios.post(url, authData)
            .then(rsp => {
                console.log(rsp.data.result.data);
                console.log(rsp.data.result.data.token);
                console.log(rsp.data.result.data.user.id);
                console.log(rsp.data.result.data.user);

                const expirationDate = new Date(new Date().getTime() + (3600 * 1000))
                let token = (isLogin) ? rsp.data.result.data.token : 'asdfasdf';
                let userId = (isLogin) ? rsp.data.result.data.user.id : rsp.data.result.data.id;
                let data = (isLogin) ? rsp.data.result.data.user : rsp.data.result.data;

                localStorage.setItem('token', token)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', userId)
                localStorage.setItem('data', data)

                dispatch(authSuccess(token, userId, data))
                // dispatch(checkAuthTimeout(rsp.data.expiresIn))
            })
            .catch(err => {
                console.log(err);


                if (err.response.data)
                    dispatch(authFail(err.response.data))
                else
                    console.log(err.message);

                // console.log(err.response, err.response.data);
            })
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const data = localStorage.getItem('data')
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        dispatch(authSuccess(token, userId, data))
        if (!token) {
            dispatch(authLogout())
        }

    }
} 