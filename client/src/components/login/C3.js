import React, { Component } from "react";

class C3 extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }


    render(){
      return (
        <div>
          <div className='title'>
            <h1>C3</h1><h5 className="inline">Communicate. Collaborate. Create.</h5>
            <br />
          </div>
        </div>
      )
    }
  }

  export default C3;