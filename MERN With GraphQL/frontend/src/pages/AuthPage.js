import React, { useState } from 'react'
import './AuthPage.css'
import { startCreateUser, startLogin } from '../actions/authActions'
import { connect } from 'react-redux'

const AuthPage = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        // if (email.trim().length === 0 || password.trim().length === 0) return
        let data
        try {
            if (isLogin) {
                data = await props.startLogin({ email, password })
                alert('You have logged in successfully')
            } else {
                data = await startCreateUser({ email, password })
                alert('User has been created. Please Login')
            }

            // console.log(data)
            // setEmail("")
            // setPassword("")
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email" className="input-label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value.trim())}
                    className="input-input"
                />
            </div>
            <div className="form-control">
                <label htmlFor="password" className="input-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value.trim())}
                    minLength="8"
                    className="input-input"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn">
                    Submit
                </button>
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="btn">
                    Switch to {!isLogin ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </form>
    )
}

export default connect(null, { startLogin })(AuthPage)
