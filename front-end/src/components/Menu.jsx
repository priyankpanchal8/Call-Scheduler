import {  Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import { setHeader } from '../actions/HomePage';
import { completedLogout } from '../actions/Auth';
import { connect } from 'react-redux';
import { Component } from 'react';
import Header from './Master/Header';
import PrivateRoute from './PrivateRoute';
import Users from '../containers/User';
import Schedule from '../containers/Schedule';
import axios from 'axios';

class Menu extends Component {
  constructor(props) {
    super(props);
    
    axios.interceptors.response.use(null, error => {
      if (error.response.status === 401) {
        this.props.logoutUser();
    }
    });

  }

  componentDidUpdate(){
    document.title = this.props.headerText + " | Call Schedule";
  }

  render() {
    let isAuthenticated = {
      isAuthenticated: this.props.isAuthenticated
    }
    let renderingProps = {
      setHeaderText: this.props.setHeaderText
    }
    return (
      <div>
        <Header {...isAuthenticated} logoutUser={this.props.logoutUser} />
        <div className="container" style={{ marginTop: 20 }}>
          <h2>{this.props.headerText}</h2>
          <Routes>
            <Route exact path="/" element={<PrivateRoute {...isAuthenticated} />}>
              <Route path='/' element={<Home {...this.props} {...renderingProps} />} />
            </Route>
            <Route exact path="/users" element={<PrivateRoute {...isAuthenticated} />}>
              <Route path='/users' element={<Users {...this.props} {...renderingProps} />} />
            </Route>
            <Route exact path="/schedule" element={<PrivateRoute {...isAuthenticated} />}>
              <Route path='/schedule' element={<Schedule {...this.props} {...renderingProps} />} />
            </Route>
            {/* <PrivateRoute {...isAuthenticated} path='/' element={<Home />} /> */}
            <Route path='/login' element={<Login {...this.props} {...renderingProps} />} />
            <Route path='/registration' {...this.props} element={<Registration {...renderingProps} />} />
          </Routes>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let { HomeState, authState } = state;
  return {
    ...ownProps,
    headerText: HomeState.currentHeaderText,
    isAuthenticated: authState.isAuthenticated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setHeaderText: (text) => {
      dispatch(setHeader(text));
    },
    logoutUser: () => {
      dispatch(completedLogout());
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
