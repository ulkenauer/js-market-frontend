import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { freezeBasketRequest, setBasketItemRequest, clearBasketRequest } from '../../actions'

import BasketItem from './Parts/BasketItem'
import { Divider, Button, Row, notification } from 'antd'

const Basket = ({ logout, freezeBasketRequest, clearBasketRequest, setBasketItemRequest, basket, user }) => {

    const onChange = productId => amount => {
        console.log(`${productId} ${amount}`)
        setBasketItemRequest(productId, amount)
    }

    const handler = description => {
        notification['error']({
          message: 'Ошибка',
          description: description
        });
      };

    return (
        <div>
            <h1>Корзина</h1>
            <Button disabled={basket.pendingRequest || basket.products.length === 0 || basket.frozen} onClick={freezeBasketRequest} style={{marginRight: 10}} type="primary">Заморозить</Button>
            <Button disabled={basket.pendingRequest || basket.products.length === 0} onClick={() => { clearBasketRequest(handler) }} style={{marginTop: 10}} type="danger">Очистить</Button>
            <Divider/>
            {
                _.map(basket.products, product => (<div key={product.id}><BasketItem disabled={basket.pendingRequest || basket.frozen} onChange={onChange(product.id)} basketItem={product} /><Divider/></div>))
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
    clearBasketRequest: (handler) => dispatch(clearBasketRequest(handler)),
    freezeBasketRequest: () => dispatch(freezeBasketRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)