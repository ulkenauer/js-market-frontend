import { connect } from 'react-redux'
import App from '../../components/App/App'
import { logout } from '../../actions'
import {fetchBasket} from '../../actions'

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchBasket: () => dispatch(fetchBasket()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)