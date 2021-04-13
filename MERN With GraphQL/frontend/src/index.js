import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import configStore from './store/configStore'

const jsx = (
    <Provider store={configStore}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))
