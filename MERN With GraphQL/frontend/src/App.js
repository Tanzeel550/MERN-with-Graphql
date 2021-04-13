import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'
import MainNavigation from './components/MainNavigation'
import { setUser } from './actions/authActions'
import { getMyBookings } from './actions/bookingActions'
import { startGetEvents } from './actions/eventActions'
import Loading from './components/Loading'

const App = ({ isAuthenticated, setUser, getMyBookings, startGetEvents }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCredentials = async () => {
            try {
                setUser()
                await startGetEvents()
                await getMyBookings()
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
        getCredentials()

        window.addEventListener('offline', () => {
            alert('You have disconnected from the network')
        })
    }, [])

    return !loading ? (
        <BrowserRouter>
            <React.Fragment>
                <MainNavigation />
                <main className="main-content">
                    <Switch className="main-content">
                        {isAuthenticated && <Redirect from="/" to="/events" exact={true} />}
                        {isAuthenticated && <Redirect from="/auth" to="/events" exact={true} />}
                        {isAuthenticated && (
                            <Route path="/bookings" component={BookingsPage} exact={true} />
                        )}

                        <Route path="/events" component={EventsPage} exact={true} />

                        {!isAuthenticated && <Route path="/auth" component={Auth} exact={true} />}
                        {!isAuthenticated && <Redirect to="/auth" exact={true} />}
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    ) : (
        <Loading />
    )
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated })

export default connect(mapStateToProps, { setUser, getMyBookings, startGetEvents })(App)
