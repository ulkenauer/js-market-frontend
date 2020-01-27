import { connect } from 'react-redux'
import Basket from '../../components/App/Basket'
import {setBasketItemRequest, clearBasketRequest, freezeBasketRequest} from '../../actions'

const mapStateToProps = state => ({
    user: state.user,
    basket: state.basket
})

const mapDispatchToProps = dispatch => ({
    setBasketItemRequest: (id, amount) => dispatch(setBasketItemRequest(id, amount)),
    clearBasketRequest: (handler) => dispatch(clearBasketRequest(handler)),
    freezeBasketRequest: () => dispatch(freezeBasketRequest()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Basket)