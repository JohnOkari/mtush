
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

class SignUpForm extends Component {
  state ={
    user: {
      username: '',
      password: '',
      name: '',
      type: ''
    }
  }



  signUphandleChange = (event) => {
    // console.log(event.target.value)
    console.log(this.state)
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  signUphandleSubmit = (event) => {
    // console.log(event)
    event.preventDefault()
    console.log(this.state)
    console.log("submitted")
 
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: this.state.user
      })
    }).then(resp => resp.json())
    .then(user => {
      console.log(user)
      // debugger
      if (user.error != "does not work") {

        this.props.currentUser(user)
        localStorage.setItem('token', user.jwt)

        if (user.type === "Customer") {
          this.props.history.push("/cart")

        }
        else if (user.type === "Seller"){
          this.props.history.push("/seller")
        }
        else {
          const nouser = ""
          this.props.currentUser(nouser)
        }
      }
     
    })
  }



  render() {
    return(
      <React.Fragment>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">
                Sign Up
              </div>
              </h2>

              <form onSubmit={this.signUphandleSubmit} className="ui large form" >
                <div className="ui stacked secondary segment">
                  <select onChange={this.signUphandleChange} name="type"  id="signup-select">
                    <option value="">Account Type</option>
                    <option  value="Customer">Customer</option>
                    <option  value="Seller" >Seller</option>
                  </select>


                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input name="username" type="text" onChange={this.signUphandleChange} value={this.state.value} placeholder="Username"/>
                    </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="lock icon"></i>
                          <input name="password" type="password" onChange={this.signUphandleChange} value={this.state.value} placeholder="Password"/>
                        </div>
                        <div className="field">
                          <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input name="name" type="text" onChange={this.signUphandleChange} value={this.state.value} placeholder="Name"/>
                          </div>

                        </div>

                      </div>
                    </div>
                    <button className="ui green button">Sign Up</button>
                  </div>
                  <div className="ui error message"></div>
              </form>
            </div>
        </div>
    </React.Fragment>
    )
  }
  }

  const mapDispatchToProps = (dispatch) => {
  return {
    currentUser: (theuser) => {dispatch({type: "CURRENT_USER", payload: theuser})},
    // signInhandleChange: (userobj) => dispatch({type: "LOG_IN", payload: userobj})
  }
  }



  export default withRouter (connect(null, mapDispatchToProps)(SignUpForm));
