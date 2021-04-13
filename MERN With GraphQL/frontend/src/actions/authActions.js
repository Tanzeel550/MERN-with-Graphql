import Request from './request'

export const startCreateUser = async ({ email, password }) => {
    try {
        const requestBody = {
            query: `
            mutation {
                createUser(data: {email: "${email}", password: "${password}"}) {
                    id
                    email
                }
            }`
        }
        await Request(requestBody)
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}

export const startLogin = ({ email, password }) => async dispatch => {
    try {
        const requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        token
                        user {
                            id
                            email
                        }
                    }
                }
            `
        }
        const { token, user } = (await Request(requestBody)).login
        dispatch({ type: 'LOGIN', token, user })
    } catch (e) {
        throw new Error(e.message)
    }
}

export const startLogout = () => dispatch => {
    dispatch({ type: 'LOGOUT' })
}

export const setUser = () => dispatch => {
    dispatch({ type: 'SET_USER' })
}
