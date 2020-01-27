import { connect } from 'react-redux'
import Profile from '../../components/App/Profile'
import {fetchIdentity, logout } from '../../actions'

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchIdentity: () => dispatch(fetchIdentity()),
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)