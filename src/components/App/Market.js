//VIEW
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {useHistory, useRouteMatch, useLocation} from 'react-router-dom'

import { Pagination, Row, Col, Input } from 'antd'

const { Search } = Input

import ProductCard from './Parts/ProductCard';

const Market = ({ products, invalidateProducts, fetchProducts }) => {

    let { path, url } = useRouteMatch();

    let location = useLocation()
    
    let history = useHistory()

    const getSearchParams = function ()
    {
        
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
        return [currentPage, currentSearch]
    }

    const [currentPage, currentSearch] = getSearchParams()

    const [page, setPage] = useState(currentPage)
    const [search, setSearch] = useState(currentSearch)

    useEffect(() => {
        const [currentPage, currentSearch] = getSearchParams()

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
        setPage(page)
    }

    const handleSearch = function (search) {
        invalidateProducts()
        setPage(1)
        setSearch(search)
    }

    let productItems = []
    if (page in products.pages) {
        if (products.pages[page].status === 'loaded') {
            productItems = products.pages[page].products
        }
    }
    
    return (
        <div>
            <h1>Магазин</h1>
            <div style={{ margin: 20 }}>
                <Search allowClear placeholder="input search text" defaultValue={search} onSearch={handleSearch} enterButton />
            </div>
            <div style={{ margin: 20 }}>
                
                <Pagination current={page} onChange={handlePagination} pageSize={20} total={products.maxPage * 20} />
            </div>
            
            <Row gutter={[16, 16]}>
                {productItems.map(product => {
                return (
                    <Col xs={24} sm={12} xl={6} key={product.id} span={6}>
                        <ProductCard product={product} />
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

export default Market