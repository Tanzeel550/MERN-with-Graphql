const BookingReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BOOKING':
            return [...state, action.booking]
        case 'SET_BOOKINGS':
            return action.bookings
        case 'CANCEL_BOOKING':
            return state.filter(booking => booking.id !== action.bookingID)
        default:
            return state
    }
}

export default BookingReducer
