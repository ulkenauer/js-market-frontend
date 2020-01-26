import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Counter from './Counter'

const BasketItem = ({ basketItem, onChange, disabled }) => {

    const imageSource = 'http://localhost:3000/' + ( basketItem.imageUrl === null ? 'images/default.jpg' : basketItem.imageUrl)
    return (
        <Row>
            <Col xs={24} md={6}>
                <Link to={{pathname: `/market/product/${basketItem.id}`}}>
                <img style={{width: '100%'}} src={imageSource}></img>
                </Link>
            </Col>
            <Col xs={24} md={18}>
                <h2>{basketItem.name}</h2>
                <p className="product-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
            <Counter disabled={disabled} onChange={onChange} value={basketItem.amount} type="primary" />
            </Col>
        </Row>
    )
}

BasketItem.propTypes = {
    basketItem: PropTypes.object.isRequired,
    disabled: PropTypes.bool
}

BasketItem.defaultProps = {
    disabled: false
}

export default BasketItem