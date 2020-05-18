import { useReducer, useCallback } from "react"
import Axios from 'axios'
import _ from 'lodash';

const API_URL = process.env.REACT_APP_API_ENDPOINT


const requestReducer = (state, action) => {
    switch (action.type) {
        case 'RESET':
            return { loading: false, error: null, data: [], requestID: null }
        case 'SEND':
            return { ...state, loading: true, error: null }
        case 'RESPONSE':
            const returnState = {}
            if (!_.isEmpty(action.data))
                returnState.data = action.data
            if (action.requestID)
                returnState.requestID = action.requestID
            return { ...state, loading: false, alert: action.alert, ...returnState }
        case 'RESET_REQUESTID':
            return { ...state, requestID: null }
        case 'ERROR':
            return { ...state, loading: false, error: action.error }
        default:
            throw new Error('shit happens');
    }
}


const initState = {
    loading: false,
    error: null,
    data: [],
    requestID: null,
    alert: null
}

const useRequest = () => {

    const [state, dispatch] = useReducer(requestReducer, initState)


    const send = useCallback((args) => {

        let { url, method, authCheck, headers, data, requestID } = args
        method = method || 'get'
        authCheck = authCheck || true
        headers = headers || null
        data = data || null
        requestID = requestID || null

        const config = {
            url: API_URL + url,
            method: method || 'get'
        };
        if (authCheck)
            config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        if (headers)
            config.headers = (config.headers) ? { ...config.headers, headers } : headers
        if (data)
            config.data = data

        dispatch({ type: 'SEND' })
        Axios(config)
            .then(res => {
                const alert = {
                    type: res.data.status,
                    message: res.data.message
                }
                dispatch({ type: 'RESPONSE', data: res.data.result.data, requestID: requestID, alert: alert })
            })
            .catch(err => {
                let errMsg = 'Unknown Error';
                let errCode = '000';

                switch (err.response.status) {
                    case 401: // unauthorized
                        errMsg = err.response.data.message;
                        errCode = err.response.status;
                        break;
                    case 404: // not found
                        errMsg = err.response.data.message;
                        errCode = err.response.status;
                        break;
                    default:
                        break;
                }
                dispatch({ type: 'ERROR', error: { code: errCode, message: errMsg }, requestID: requestID })
            })
            .then(function () {
                // always executed
                dispatch({ type: 'RESET_REQUESTID' })
            });

    }, [])

    return {
        loading: state.loading,
        data: state.data,
        error: state.error,
        requestID: state.requestID,
        alert: state.alert,
        send: send
    }
}

export default useRequest