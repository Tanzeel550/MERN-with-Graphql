import { applyMiddleware, combineReducers, createStore } from 'redux'
import AuthReducer from '../reducers/AuthReducer'
import thunk from 'redux-thunk'
import EventReducer from '../reducers/EventReducer'
import BookingReducer from '../reducers/BookingReducer'

const configStore = createStore(
    combineReducers({
        auth: AuthReducer,
        events: EventReducer,
        bookings: BookingReducer
    }),
    applyMiddleware(thunk)
)

configStore.subscribe(() => {
    console.log(configStore.getState())
})

export default configStore
