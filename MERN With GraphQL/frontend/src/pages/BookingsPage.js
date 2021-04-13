import React from 'react'
import { connect } from 'react-redux'
import { startDeleteBooking } from '../actions/bookingActions'

import './BookingsPage.css'

const BookingsPage = props => {
    const deleteBooking = async bookingID => {
        try {
            await props.startDeleteBooking(bookingID)
            alert('Your booking was deleted')
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <ul className="bookings__list">
            {props.bookings.map(booking => (
                <li key={booking._id} className="bookings__item">
                    <div className="bookings__item-data">
                        {booking.event.title} - {new Date(+booking.createdAt).toLocaleDateString()}
                    </div>
                    <div className="bookings__item-actions">
                        <button className="btn" onClick={() => deleteBooking(booking.id)}>
                            Cancel
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = ({ bookings }) => ({ bookings })

export default connect(mapStateToProps, { startDeleteBooking })(BookingsPage)
