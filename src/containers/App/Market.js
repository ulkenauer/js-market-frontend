import { connect } from 'react-redux'
import Market from '../../components/App/Market'
import {fetchProducts, invalidateProducts} from '../../actions'

const mapStateToProps = state => ({
    user: state.user,
    products: state.products,
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: (args) => dispatch(fetchProducts(args)),
    invalidateProducts : () => dispatch(invalidateProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Market)