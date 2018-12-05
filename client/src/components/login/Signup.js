import React, { Component } from "react";
import Input from "./form/Input.js";
import Button from './form/Button.js';

class Signup extends Component {
  constructor(props){
    super(props)
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.props.onLoginChange({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitNewLocal(event);
  }

  redirectToTarget = (event) => {
    event.preventDefault();
    this.props.history.push(event.target.name);
  }

  render() {
    return (
      <div>
      <div className="outline">
        <h5>Local Signup</h5>
        <form className="form-group">
          <ul className="form-group">
            <li><Input placeholder="username" handleChange={this.handleChange} value={this.props.username} /></li>
            <li><Input placeholder="password" type="password" handleChange={this.handleChange} value={this.props.password} /></li>
            <li><Input placeholder="email" handleChange={this.handleChange} value={this.props.email} /></li>
          </ul>
          <ul className="form-group inline-block">
            <li><Button type="submit" useClick={this.handleSubmit}  value="sign up" /></li>
          </ul>
        </form>
      <Button value="go back" useClick={this.redirectToTarget} name="/" />
      </div>
      </div>
    )
  }
}

export default Signup;