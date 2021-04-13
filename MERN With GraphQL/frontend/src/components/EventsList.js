import React, { useState } from 'react'
import { connect } from 'react-redux'

import './EventsList.css'
import Modal from './Modal'
import { startBookEvent } from '../actions/bookingActions'
import { withRouter } from 'react-router-dom'

const EventItem = ({ event, userId, setSelectedEvent, bookings }) => {
    return (
        <li className="events__list--item" key={event.id}>
            <div>
                <h1>{event.title}</h1>
                <h2>
                    ${event.price} - {new Date(+event.date).toLocaleDateString()}{' '}
                    {new Date(+event.date).toLocaleTimeString()}
                </h2>
            </div>
            <div>
                {userId !== event.creator.id ? (
                    bookings?.some(booking => booking.event.id === event.id) ? (
                        <button className="btn" onClick={() => setSelectedEvent(event)}>
                            View Details
                        </button>
                    ) : (
                        <p>This Event has already been booked!</p>
                    )
                ) : (
                    <p>You are the owner of this event</p>
                )}
            </div>
        </li>
    )
}

const EventsList = ({ events, userId, startBookEvent, history, bookings }) => {
    const [selectedEvent, setSelectedEvent] = useState(null)

    const bookEvent = async () => {
        try {
            await startBookEvent(selectedEvent.id)
            setSelectedEvent(null)
            alert('Booking has been created')
            setTimeout(() => history.push('/bookings'), 1500)
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={selectedEvent}
                canCancel={true}
                canConfirm={true}
                onConfirm={bookEvent}
                title="Book Event"
                onCancel={() => setSelectedEvent(null)}
                confirmText="Book"
            >
                <div>
                    <h1>{selectedEvent?.title}</h1>
                    <h2>
                        ${selectedEvent?.price} -{' '}
                        {new Date(+selectedEvent?.date).toLocaleDateString()}{' '}
                        {new Date(+selectedEvent?.date).toLocaleTimeString()}
                    </h2>
                    <p>{selectedEvent?.description}</p>
                </div>
            </Modal>

            <ul className="events__list">
                {events.map(event => (
                    <EventItem
                        event={event}
                        key={event.id}
                        userId={userId}
                        setSelectedEvent={setSelectedEvent}
                        bookingsList={bookings}
                    />
                ))}
            </ul>
        </React.Fragment>
    )
}

const mapStateToProps = (state, props) => ({
    events: state.events,
    userId: state.auth?.user?.id,
    history: props.history,
    bookings: props.bookings
})

export default withRouter(connect(mapStateToProps, { startBookEvent })(EventsList))
