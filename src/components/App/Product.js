import React, {useState} from 'react'

import {useParams} from 'react-router-dom'

import { Row, Col, Divider} from 'antd'

import {connect} from 'react-redux'
import { fetchProductDetails } from '../../actions'
import { setBasketItemRequest } from '../../actions'
import Counter from './Parts/Counter'

const Product = ({ dispatch, basket }) => {
    let { id } = useParams()

    const [flag, setFlag] = useState(false)
    const [product, setProduct] = useState(null)
    
    const handler = function (result) {
        setProduct(result)
    }

    if (!flag) {
        dispatch(fetchProductDetails(id, handler))
        setFlag(true)
    }

    const onChange = productId => amount => {
        dispatch(setBasketItemRequest(productId, amount))
    }

    return (
        <div>
            <h1>Продукт</h1>
            {
                (() => {
                    if (product !== null) {
                        let basketItem = _.find(basket.products, basketProduct => product.id === basketProduct.id)

                        return (<div>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={14} >
                                    <img style={{ width: '100%', display: 'inline-block', verticalAlign: "top" }} src={product.imageUrl}></img>    
                                </Col>
                                <Col xs={24} md={8} >
                                    <h2>{product.name}</h2>
                                <p className="product-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <span style={{ marginTop: '20px' }}>{_.capitalize(product.measureUnitsHint)}: {product.measureUnits} {product.measureUnitsText}</span>
                                    <Divider />
                                    <span className="price">{product.price.toFixed(2)}$</span>
                                    <div style={{ display: 'inline-block', float: "right" }}>
                                        {
                                            (() => {
                                                if (basketItem === undefined) {
                                                    return (<Counter disabled={basket.pendingRequest || basket.frozen} onChange={onChange(product.id)} value={0} />)
                                                } else {
                                                    return (<Counter disabled={basket.pendingRequest || basket.frozen} onChange={onChange(product.id)} value={basketItem.amount} type="primary" />)
                                                }
                                            })()
                                        }
                                    </div>
                                </Col>
                            </Row>
                            </div>)
                    }
                })()
            }
            
        </div>
    )
}


const mapStateToProps = state => ({
    basket: state.basket
})

export default connect(mapStateToProps)(Product)