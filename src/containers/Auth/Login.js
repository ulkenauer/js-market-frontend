import { connect } from 'react-redux'
import Login from '../../components/Auth/Login'

import { login } from '../../actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    login: (credentials, handler) => dispatch(login(credentials, handler)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)