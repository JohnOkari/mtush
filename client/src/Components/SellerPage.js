import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../Store/Actions/product_action'
import SellerProdContainer from './SellerProdContainer'
import {withRouter} from 'react-router-dom'

class SellerPage extends Component{

  componentDidMount() {
    // console.log("i have mounted")
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      
      fetch(`http://localhost:3000/current_user`, {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: token
        }
      }).then(response => response.json())
      .then(resp => {
        // console.log(resp);
        // this.setState({
        //   user:resp
        // })
        this.props.fetchProducts()
        // this.props.renderProps.history.push("/cart")
      })



    }
    else {
      console.log('inside the else', this.props.history);;
      this.props.history.push('/login')
      // push them to the route you want
    }

  }




  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState)
   console.log(this.props.clothesProducts.allProducts.length)
   console.log(prevProps.clothesProducts.allProducts.length)
   if (prevProps.clothesProducts.allProducts.length !== this.props.clothesProducts.allProducts.length) {
     this.props.fetchProducts()
   }

  }

  mapProducts = () => {
    console.log("mapping", this.props.clothesProducts )
     return (this.props.clothesProducts.allProducts ? <SellerProdContainer product={this.props.clothesProducts.allProducts} /> : null )
  }

render() {
// console.log(this.props.clothesProducts.allProducts)
  return(

    <React.Fragment>
      <div className="seller-message">Welcome to Your Products</div>
      {this.mapProducts()}
    </React.Fragment>
  )
}
}
const mapStateToProps = ({products}) => {
  // console.log(products)
  return {
    clothesProducts: products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerPage));
