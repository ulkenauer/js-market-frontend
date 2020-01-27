//VIEW
import React from 'react'
import PropTypes from 'prop-types'

import BasketItem from './Parts/BasketItem'
import { Divider, Button, notification } from 'antd'

const Basket = ({ freezeBasketRequest, clearBasketRequest, setBasketItemRequest, basket }) => {

    const onChange = productId => amount => {
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

export default Basket