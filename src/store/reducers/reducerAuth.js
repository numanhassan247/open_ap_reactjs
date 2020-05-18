import * as actionTypes from '../actions/actionTypes'


const initialState = {
    loading: false,
    error: null,
    userId: null,
    data: null,
    token: null
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        default:
            return state
    }
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId,
        data: action.userData
    }
}
const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}
const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        data: null,
        userId: null
    }
}

export default reducer
