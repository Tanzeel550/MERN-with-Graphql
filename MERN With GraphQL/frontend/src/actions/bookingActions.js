import Request from './request'

export const startBookEvent = eventId => async (dispatch, getState) => {
    try {
        const requestBody = {
            query: `
            mutation {              
                createBooking(eventID: "${eventId}") {
                    id
                    createdAt
                    updatedAt
                    event {
                        id
                        title
                        description
                        price
                        date
                        creator {
                            id
                            email
                        }
                    }
                    user {
                        id
                    }
                }
            }`
        }
        const data = await Request(requestBody, getState().auth.token)
        dispatch({
            type: 'ADD_BOOKING',
            booking: data.createBooking
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getMyBookings = () => async (dispatch, getState) => {
    try {
        const requestBody = {
            query: `
            query {
                bookings {
                    id
                    event {
                        id
                        title
                        description
                        price
                        date
                        creator {
                            id
                            email
                        }
                    }
                    user {
                        id
                        email
                    }
                    createdAt
                    updatedAt
                }
            }
            `
        }
        const data = await Request(requestBody, getState().auth.token)
        dispatch({
            type: 'SET_BOOKINGS',
            bookings: data.bookings
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

export const startDeleteBooking = bookingID => async (dispatch, getState) => {
    try {
        const requestBody = {
            query: `
            mutation {
                cancelBooking(bookingID: "${bookingID}") { id }
            }`
        }
        await Request(requestBody, getState().auth.token)
        dispatch({
            type: 'CANCEL_BOOKING',
            bookingID
        })
    } catch (e) {
        throw new Error(e.message)
    }
}
