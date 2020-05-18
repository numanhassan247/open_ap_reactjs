export const initState = {
    users: [],
    confirmDelete: false,
    id: null,
    alert: null
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { users: action.users, confirmDelete: false, id: null, alert: null };
        case 'DELETE_PROMPT':
            return { ...state, confirmDelete: true, id: action.id, alert: null };
        case 'DELETE_CANCEL':
            return { ...state, confirmDelete: false, id: null, alert: null };
        case 'DELETE_OK':
            let newUsers = state.users.filter(user => user.id !== action.id);
            return { id: null, confirmDelete: false, users: newUsers, alert: null };
        case 'UPDATE':
            return { ...state, users: action.user, alert: action.alert };
        case 'REMOVE_ALERT':
            return { ...state, alert: null };
        default:
            throw new Error('shit happens');
    }
}

export default userReducer