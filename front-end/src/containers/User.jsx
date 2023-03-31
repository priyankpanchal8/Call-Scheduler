import { connect } from 'react-redux'
import User from '../components/Users'

import { getAllUsers, connectUser, disConnect } from '../actions/User'


const mapStateToProps = (state, ownProps) => {
    const User = state.User;
    return {
        ...ownProps,
        ...User
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        connectUser: (u1, u2) => dispatch(connectUser(u1, u2)),
        disConnect: (u1, u2) => dispatch(disConnect(u1, u2))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);