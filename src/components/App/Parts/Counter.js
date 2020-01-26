import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const Counter = (props) => {
    const { initialvalue, value, onChange } = props

    const [counter, setCounter] = useState(initialvalue)

    if (value !== null && counter !== value) {
        setCounter(value)
    }

    const decrease = event => {
        setCounter(counter - 1)
        if (onChange !== null) {
            onChange(counter - 1)
        }
    }
    const increase = event => {
        setCounter(counter + 1)
        if (onChange !== null) {
            onChange(counter + 1)
        }
    }

    return (
        <div>
            <Button onClick={decrease} {...props} style={{height: '40px', borderRadius: '5px 0 0 5px'}} >-</Button>
            <span style={{ height: '40px' }} className="number-display"> <span className="number">{counter}</span></span>
            <Button onClick={increase} {...props} style={{height: '40px', borderRadius: '0 5px 5px 0'}} >+</Button>
        </div>
    )
}

Counter.propTypes = {
    value: PropTypes.number,
    initialvalue: PropTypes.number,
    onChange: PropTypes.func
}

Counter.defaultProps = {
    initialvalue: 0,
    onChange: null,
    value: null
}

export default Counter