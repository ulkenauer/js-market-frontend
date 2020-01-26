import { connect } from 'react-redux'
import Auth from '../components/Auth/Auth'

const mapStateToProps = state => ({
    user: state.user
})
export default connect(
    mapStateToProps
)(Auth)