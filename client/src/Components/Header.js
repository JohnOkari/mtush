import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteUser } from '../Store/Actions/userActions'

class Header extends Component {

  deleteToken = () => {
    localStorage.removeItem('token')
    this.props.deleteUser()
  }
render() {

  return(

  <div className="ui massive menu">

    <div className="ui item" style={{color: "black"}}>
      <NavLink to="/"style={{width: "150px", color: "black"}}>
        MyMtush
      </NavLink>
    </div>

    <div className="ui item">
      <NavLink to="/"style={{width: "100px", color: "black"}}>
        Products
      </NavLink>
    </div>

      {this.props.currentUser.type === "Customer" ? <div className="ui item"><NavLink to="/cart" style={{width: "100px", color: "black"}}>
        {this.props.currentUser.username} Cart
      </NavLink></div> : null}

      <div className="right menu">
         <div className="ui item">
           <NavLink to="/login" style={{width: "100px", color: "black"}}>
             Log-in
           </NavLink>
         </div>

       <div className="ui item">
      <NavLink to="/signup" style={{width: "100px", color: "black"}}>
        Sign-up
      </NavLink>
    </div>
    <div className="ui item">
      {this.props.currentUser? <NavLink to="/signUp" onClick={this.deleteToken}style={{width: "100px", color: "black"}}>
        Log Out
      </NavLink> : null}
    </div>
    <div className="ui item">
    { this.props.currentUser.type === "Seller" ? <NavLink to="/seller" style={{width: "100px", color: "black"}}>
        Seller Page
      </NavLink>: null}
    </div>
  </div>
  </div>


  )
}


}

const mapStateToProps = state => {
  // console.log(state.user.user)
  return {
    currentUser: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => dispatch({type: "DELETE_USER"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
