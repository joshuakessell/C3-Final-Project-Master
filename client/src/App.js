import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Login from './components/login/Login.js';
import Dashboard from './components/dashboard/dashboard.js'
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      isLoggedIn: false,
      username: null
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          isLoggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user session');
        this.setState({
          isLoggedIn: false,
          username: null
        })
      }
    })
  }

  updateUser(data) {
    this.setState(data)
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App center-text">
        {!this.state.isLoggedIn ? (
          <Route
            path="/"
            render={props =>
            <Login
              updateUser={this.updateUser}
              {...props}
            />}
          />
        ) : (
          <Route
            path="/dashboard"
            render={props =>
            <Dashboard
              {...props}
            />}
          />)
        }
      
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
