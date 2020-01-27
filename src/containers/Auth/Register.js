import { connect } from 'react-redux'
import Register from '../../components/Auth/Register'

import { register } from '../../actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    register: (credentials, handler) => dispatch(register(credentials, handler)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)