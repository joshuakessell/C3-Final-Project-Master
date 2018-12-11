import React, { Component } from "react";
import Input from './form/Input.js';
import Button from './form/Button.js';
import { withRouter } from 'react-router-dom';


class Local extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.props.onLoginChange({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitLocal(event);
  }

  redirectToTarget = (event) => {
    event.preventDefault();
    this.props.history.push(event.target.name);   
  }

  render() {
    return (
      <div>
        <div className="outline">
        <h5>Login</h5>
          <form>
            <div className="inline-block has-icon-left">
              <ul className="form-group inline-block">
                <li><Input placeholder="username" handleChange={this.handleChange} value={this.props.username} /></li>
                <li><Input placeholder="password" type="password" handleChange={this.handleChange} value={this.props.password} /></li>
              </ul>
              <ul className="form-group inline-block fright">
                <li><Button type="submit" useClick={this.handleSubmit} value="login" /></li> 
              </ul>
            </div>
            </form>
          <div>
            <ul className="block">
              <li><Button name="/signup" useClick={this.redirectToTarget} value="don't have an account?" /></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Local);