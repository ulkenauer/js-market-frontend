import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { fetchIdentity } from '../../actions'
import { logout } from '../../actions'

const Profile = ({ logout, fetchIdentity, user }) => {

    if (user.phone === null) {
        fetchIdentity()
    }

    return (
        <div>
            <div>Номер телефона: {user.phone}</div>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    fetchIdentity: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchIdentity: () => dispatch(fetchIdentity()),
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)