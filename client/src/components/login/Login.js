import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Local from './Local.js';
import Signup from './Signup.js';
import C3 from './C3.js';
import axios from 'axios';


class Login extends Component {

  constructor(props) {
    super(props);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
    this.submitNewLocal = this.submitNewLocal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: null,
      message: null
    }
  }

  componentDidMount = () => {
    if (this.state.message) {
      this.setState({ message: null })
    }
  }

  handleLogout(){
    console.log('logging out')
    axios.post('/api/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          isLoggedIn: false,
          username: null,
        })
        this.redirectTo('/');
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  onLoginChange(data) {
    this.setState(data);
  }


  submitNewLocal() {
    console.log('here');
    //request to server to add new user info
    axios.post('/api/signup', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
            this.props.history.push('/')
          this.setState({
            message: "Signup successful. Please login now."
          })
        }
      })
      .catch(error => {
        console.log('signup error: ');
        console.log(error)
        this.setState({message: "Signup Unsuccessful."})
      })
    }
    

  submitLocal() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          // update App.js state  
          this.props.updateUser({
            isLoggedIn: true,
            username: response.data.username
          })
          // update the state to redirect to home
          this.props.history.push('/dashboard')
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
        this.setState({message: "Login Unsuccessful"})
      })
  }


  render() {
    return (
      <div className="center-text">
        <C3 isLoggedIn={this.state.isLoggedIn} logout={this.handleLogout} />
        <Switch>
          <Route
            exact path="/"
            render={props =>
              <Local
                onLoginChange={this.onLoginChange}
                submitLocal={this.submitLocal}
                message={this.state.message}
                {...props}
              />}
          />
          <Route
            exact path="/signup"
            render={props =>
              <Signup
                submitNewLocal={this.submitNewLocal}
                onLoginChange={this.onLoginChange}
                message={this.state.message}
                {...props}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default Login;

