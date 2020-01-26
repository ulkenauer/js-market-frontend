import { connect } from 'react-redux'
import UserCard from '../components/UserCard'
import { fetchIdentity } from '../actions'

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchIdentity: () => dispatch(fetchIdentity())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCard)