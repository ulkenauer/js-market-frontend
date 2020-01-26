import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {useHistory, useRouteMatch, Link, useLocation} from 'react-router-dom'

import { Pagination, Row, Col, Card, } from 'antd'
const { Meta } = Card;

import {connect} from 'react-redux'
import { fetchProducts, invalidateProducts } from '../../actions'
import Search from 'antd/lib/input/Search';

const Market = ({ products, invalidateProducts, fetchProducts, user }) => {

    const [flag, setFlag] = useState(false)

    let { path, url } = useRouteMatch();

    let location = useLocation()
    
    let history = useHistory()
    let pageSearch = location.search.match(/p=([0-9]+)/)
    let searchSearch = location.search.match(/search=(.+)/)
    
    let currentPage = 1
    if (pageSearch !== null) {
        currentPage = Number(pageSearch[1])
    }

    let currentSearch = ''
    if (searchSearch !== null) {
        currentSearch = decodeURIComponent(searchSearch[1])
    }
    

    const [page, setPage] = useState(currentPage)
    const [search, setSearch] = useState(currentSearch)

    useEffect(() => {
        let pageSearch = location.search.match(/p=([0-9]+)/)
        let searchSearch = location.search.match(/search=(.+)/)
        
        let currentPage = 1
        if (pageSearch !== null) {
            currentPage = Number(pageSearch[1])
        }
    
        let currentSearch = ''
        if (searchSearch !== null) {
            currentSearch = decodeURIComponent(searchSearch[1])
        }

        if (currentPage != page || decodeURIComponent(currentSearch) != decodeURIComponent(search)) {
            history.push(`${url}?p=${page}&search=${encodeURIComponent(search)}`)
        }
        if (page > products.maxPage && page in products.pages && products.pages[page].status === 'empty') {
            setPage(products.maxPage)
        }
        if ((page in products.pages) === false) {
            fetchProducts({page, search: encodeURIComponent(search)})
        }
    })

    const handlePagination = function (page, pageSize) {
        //fetchProducts(page)
        setPage(page)
    }

    const handleSearch = function (search) {
        invalidateProducts()
        setPage(1)
        setSearch(search)
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
                <Search placeholder="input search text" defaultValue={search} onSearch={handleSearch} enterButton />
            </div>
            <div style={{ margin: 20 }}>
                
                <Pagination current={page} onChange={handlePagination} pageSize={20} total={products.maxPage * 20} />
            </div>
            
            <Row gutter={[16, 16]}>
                {productItems.map(product => {
                    let imageSource = 'http://localhost:3000/' + ( product.imageUrl === null ? 'images/default.jpg' : product.imageUrl)
                return (
                    <Col xs={24} sm={12} xl={6} key={product.id} span={6}>
                        <Link to={{pathname: `/market/product/${product.id}`}}>
                            <Card hoverable cover={<img style={{height: 300, objectFit: 'cover'}} alt="example" src={imageSource} />}>
                                <Meta title={product.name} description={(
                                    <div>
                                        <div style={{ float: 'left', display: 'inline-block', verticalAlign: 'top' }}> {product.price.toFixed(2) + '$'} </div>
                                        <div style={{ float: 'right', display: 'inline-block', verticalAlign: 'top' }}>{product.measureUnits + ' ' + product.measureUnitsText}</div>
                                    </div>)} />
                            </Card>
                        </Link>
                    </Col>)
                })}
            </Row>
            <div style={{margin: 20}}>
            <Pagination current={page} onChange={handlePagination} pageSize={20} total={products.maxPage * 20} />
            </div>
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
    fetchProducts: (args) => dispatch(fetchProducts(args)),
    invalidateProducts : () => dispatch(invalidateProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Market)