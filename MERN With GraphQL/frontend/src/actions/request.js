import { BACKEND_GRAPHQL } from '../env'

const Request = async (requestBody, authToken = '') => {
    try {
        const res = await fetch(BACKEND_GRAPHQL, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })

        const data = await res.json()

        // console.log(res)
        // console.log(data)

        if (data.errors) throw new Error(data.errors[0].message)
        if (res.status !== 200 && res.status !== 201)
            throw new Error('An Unexpected Error Occurred. Please Try again')
        return data.data
    } catch (e) {
        console.log(e)
        throw e
    }
}

export default Request
