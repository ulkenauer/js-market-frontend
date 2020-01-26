import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const UserCard = ({ fetchIdentity, user }) => {

    if (user.phone === null) {
        fetchIdentity()
    }

    return (
        <div>Номер телефона: {user.phone}</div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    fetchIdentity: PropTypes.func
}

export default UserCard