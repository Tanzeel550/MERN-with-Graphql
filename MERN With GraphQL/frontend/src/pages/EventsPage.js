import React, { useState } from 'react'
import { connect } from 'react-redux'
import DateTimePicker from 'react-datetime-picker'

import './EventsPage.css'
import Modal from '../components/Modal'
import { startCreateEvent } from '../actions/eventActions'
import EventsList from '../components/EventsList'

const EventsPage = props => {
    const [creating, setCreating] = useState(false)
    const [title, setTitle] = useState('T')
    const [price, setPrice] = useState(1)
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('alskdjf')

    const formSubmit = async e => {
        e.preventDefault()
        try {
            await props.startCreateEvent({ title, price, date, description })
            setCreating(false)
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <>
            <Modal
                title="This is modal"
                canCancel={true}
                canConfirm={true}
                isOpen={creating}
                onCancel={() => setCreating(false)}
                onConfirm={formSubmit}
            >
                <form>
                    <div className="form-control">
                        <label htmlFor="title" className="input-label">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value.trim())}
                            required={true}
                            className="input-input"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price" className="input-label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            min={0}
                            value={price}
                            onChange={e => setPrice(+e.target.value.trim())}
                            required={true}
                            className="input-input"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="date" className="input-label">
                            Date
                        </label>
                        <DateTimePicker value={date} onChange={date => setDate(date)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description" className="input-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            value={description}
                            onChange={e => setDescription(e.target.value.trim())}
                            required={true}
                            className="input-textarea"
                        />
                    </div>
                </form>
            </Modal>

            {props.isAuthenticated && (
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn" onClick={() => setCreating(true)}>
                        Create Event
                    </button>
                </div>
            )}
            <EventsList />
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user?.id,
    events: state.events
})

export default connect(mapStateToProps, { startCreateEvent })(EventsPage)
