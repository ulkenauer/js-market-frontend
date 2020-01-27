import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Card} from 'antd'
const { Meta } = Card;

const ProductCard = ({ product }) => {

    return (
        <Link to={{pathname: `/market/product/${product.id}`}}>
            <Card hoverable cover={<img style={{height: 300, objectFit: 'cover'}} alt="example" src={product.imageUrl} />}>
                <Meta title={product.name} description={(
                    <div>
                        <div style={{ float: 'left', display: 'inline-block', verticalAlign: 'top' }}> {product.price.toFixed(2) + '$'} </div>
                        <div style={{ float: 'right', display: 'inline-block', verticalAlign: 'top' }}>{product.measureUnits + ' ' + product.measureUnitsText}</div>
                    </div>)} />
            </Card>
        </Link>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}
export default ProductCard