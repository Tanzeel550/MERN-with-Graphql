import Request from './request'

export const startCreateEvent = ({ title, description, price, date }) => async (
    dispatch,
    getState
) => {
    try {
        const requestBody = {
            query: `
            mutation {
                createEvent(data: {
                    title: "${title}",
                    description: "${description}",
                    price: ${price},
                    date: "${date}"
                }) {
                    id
                    creator {
                        id
                        email
                    }
                }
            }`
        }
        const data = await Request(requestBody, getState().auth.token)
        dispatch({
            type: 'ADD_EVENT',
            event: {
                id: data.createEvent.id,
                title,
                description,
                price,
                date,
                creator: data.createEvent.creator
            }
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

export const startGetEvents = () => async dispatch => {
    try {
        const requestBody = {
            query: `query {
                events {
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
            }`
        }
        const data = await Request(requestBody)
        dispatch({
            type: 'SET_EVENTS',
            events: data.events
        })
    } catch (e) {
        throw new Error(e.message)
    }
}
