import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { fetchIdentity } from '../../actions'
import { logout } from '../../actions'

const Basket = ({ logout, fetchIdentity, user }) => {

    if (user.phone === null) {
        fetchIdentity()
    }

    return (
        <div>
            <div>Корзина</div>
        </div>
    )
}

Basket.propTypes = {
    user: PropTypes.object.isRequired,
    fetchIdentity: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)