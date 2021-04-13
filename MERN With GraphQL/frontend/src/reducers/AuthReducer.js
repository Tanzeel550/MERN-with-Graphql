const defaultState = {
    token: null,
    user: null,
    isAuthenticated: false
}

const AuthReducer = (state = defaultState, action) => {
    let token, user
    switch (action.type) {
        case 'LOGIN':
            ;({ token, user } = action)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            return { token, user, isAuthenticated: true }
        case 'LOGOUT':
            return defaultState
        case 'SET_USER':
            token = localStorage.getItem('token')
            user = JSON.parse(localStorage.getItem('user'))
            return { token, user, isAuthenticated: !!(user && token) }
        default:
            return state
    }
}

export default AuthReducer
