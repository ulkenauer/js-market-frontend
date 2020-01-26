import { connect } from 'react-redux'
import App from '../components/App/App'
import { logout } from '../actions'

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)