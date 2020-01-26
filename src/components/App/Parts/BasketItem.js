import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Counter from './Counter'

const BasketItem = ({ basketItem, onChange }) => {

    const imageSource = 'http://localhost:3000/' + ( basketItem.imageUrl === null ? 'images/default.jpg' : basketItem.imageUrl)
    return (
        <Row>
            <Col xs={6}>
                <Link to={{pathname: `/market/product/${basketItem.id}`}}>
                <img style={{width: '100%'}} src={imageSource}></img>
                </Link>
            </Col>
            <Col xs={18}>
            {basketItem.name}
            {basketItem.amount}
            <Counter onChange={onChange} value={basketItem.amount} type="primary" />
            </Col>
        </Row>
    )
}

BasketItem.propTypes = {
    basketItem: PropTypes.object.isRequired,
}

export default BasketItem