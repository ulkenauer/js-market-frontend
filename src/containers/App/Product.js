import { connect } from 'react-redux'
import Product from '../../components/App/Product'

const mapStateToProps = state => ({
    basket: state.basket,
})

export default connect(mapStateToProps)(Product)