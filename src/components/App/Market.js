import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {useHistory, useRouteMatch, Link, useLocation} from 'react-router-dom'

import { Pagination, Row, Col, Card, } from 'antd'
const { Meta } = Card;

import {connect} from 'react-redux'
import { fetchProducts } from '../../actions'

const Market = ({ products, fetchProducts, user }) => {

    const [flag, setFlag] = useState(false)

    const [page, setPage] = useState(1)

    let { path, url } = useRouteMatch();

    let location = useLocation()
    
    let pageSearch = location.search.match(/p=([0-9]+)/)

    if (pageSearch !== null) {
        let currentPage = Number(pageSearch[1])
        if (page !== currentPage) {
            setPage(currentPage)
        }
    }

    useEffect(() => {
        if (page > products.maxPage && page in products.pages && products.pages[page].status === 'empty') {
            //setPage(1)
            history.push(`${path}?p=${products.maxPage}`)
            //setPage(products)
        }
    })


    if ((page in products.pages) === false) {
        console.log('page is not loaded')
        fetchProducts(page)
    }

    console.log(products.length === 0)

    let history = useHistory()

    const handlePagination = function (page, pageSize) {
        //fetchProducts(page)
        //setPage(page)
        history.push(`${path}?p=${page}`)
    }

    console.log(page)
    let productItems = []
    if (page in products.pages) {
        if (products.pages[page].status === 'loaded') {
            productItems = products.pages[page].products
        }
    }

    return (
        <div>
            <h1>Магазин</h1>
            <div style={{margin: 20}}>
            <Pagination current={page} onChange={handlePagination} pageSize={20} total={products.maxPage * 20} />
            </div>
            
            <Row gutter={[16, 16]}>
                {productItems.map(product => {
                    let imageSource = 'http://localhost:3000/' + ( product.imageUrl === null ? 'images/default.jpg' : product.imageUrl)
                return (
                    <Col xs={24} sm={12} xl={6} key={product.id} span={6}>
                        <Card hoverable cover={<img style={{height: 300, objectFit: 'cover'}} alt="example" src={imageSource} />}>
                            <Meta title={product.name} description={product.price.toFixed(2) + '$'} />
                        </Card>
                    </Col>)
                })}
            </Row>
            {/* <Pagination onChange={handlePagination} defaultCurrent={page}  /> */}
        </div>
    )
}

Market.propTypes = {
    user: PropTypes.object.isRequired,
    fetchProducts: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.user,
    products: state.products,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: (page) => dispatch(fetchProducts(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Market)