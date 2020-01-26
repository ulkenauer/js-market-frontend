import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { setBasketItemRequest } from '../../actions'

import BasketItem from './Parts/BasketItem'
import { Divider, Button, Row } from 'antd'
import Counter from './Parts/Counter'

const Basket = ({ logout, setBasketItemRequest, basket, user }) => {

    const onChange = productId => amount => {
        console.log(`${productId} ${amount}`)
        setBasketItemRequest(productId, amount)
    }

    return (
        <div>
            <h1>Корзина</h1>
            <Button style={{marginRight: 10}} type="primary">Заморозить</Button>
            <Button style={{marginTop: 10}} type="danger">Очистить</Button>
            <Divider/>
            {
                _.map(basket.products, product => (<div key={product.id}><BasketItem onChange={onChange(product.id)} basketItem={product} /><Divider/></div>))
            }
            <div className="price" style={{float: "right"}}>
                Итого к оплате: {basket.total === null ? '' : basket.total.toFixed(2)}$
            </div>
        </div>
    )
}

Basket.propTypes = {
    user: PropTypes.object.isRequired,
    fetchIdentity: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})

const mapDispatchToProps = dispatch => ({
    setBasketItemRequest: (id, amount) => dispatch(setBasketItemRequest(id, amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)