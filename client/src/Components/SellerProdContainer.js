import React, { Component } from "react";
import AddProduct from "./AddProduct";
import { connect } from "react-redux";
import { sellerDeleteProduct } from "../Store/Actions/product_action";

class SellerProdContainer extends Component {
  state = {
    name: null,
    price: null,
    description: null,
    title: null,
    cost: null,
    quantity: null,
  };

  handleChange = (event, productinfo) => {
    console.log(productinfo);
    this.setState({
      name: productinfo.name,
      price: productinfo.price,
      description: productinfo.description,
      title: productinfo.title,
      cost: productinfo.cost,
      quantity: productinfo.quantity,
    });
    console.log(event.target.value);
    console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUpdateSubmit = (e, product) => {
    e.preventDefault();
    console.log("update button");
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        cost: this.state.cost,
        quantity: this.state.quantity,
      }),
    })
      .then((resp) => resp.json())
      .then((response) => console.log(response));
  };

  deleteOwnProduct = (e, product) => {
    e.preventDefault();
    console.log(product);
    this.props.sellerDeleteProduct(product);

    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((resp) => console.log(resp));
  };

  sellersProducts = () => {
    return this.props.product
      .filter((product) => {
        return product["seller_id"] === this.props.currentUser["user_id"];
      })
      .map((productinfo) => {
        return (
          <div className="main-sellerpage-container">
            <form
              classNameName="seller-update-form"
              onSubmit={(e) => this.handleUpdateSubmit(e, productinfo)}
            >
              <label className="label-seller-product-info">Name:</label>
              <input
                className="seller-product-info"
                placeholder={productinfo.name}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="name"
              />
              <br />
              <label className="label-seller-product-info">Price: Ksh</label>
              <input
                className="seller-product-info-price"
                placeholder={productinfo.price}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="price"
              />
              <br />
              <label className="label-seller-product-info">Description:</label>
              <textarea
                className="seller-product-description"
                placeholder={productinfo.description}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="description"
              />
              <br />
              <label className="label-seller-product-title-info">Title:</label>
              <input
                className="seller-product-info-title"
                placeholder={productinfo.title}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="title"
              />
              <br />
              <label className="label-seller-product-title-info">Cost: Ksh</label>
              <input
                className="seller-product-info-price"
                placeholder={productinfo.cost}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="cost"
              />
              <br />
              <label className="label-seller-product-title-info">
                Profit Margin per Item:
              </label>
              <span className="seller-product-info-title">
                {(
                  ((productinfo.price - productinfo.cost) / productinfo.price) *
                  100
                ).toFixed(2)}
                %
              </span>
              <br />
              <label className="label-seller-product-title-info">
                Current Quantity:
              </label>
              <input
                className="seller-product-info-price"
                placeholder={productinfo.quantity}
                onChange={(event) => this.handleChange(event, productinfo)}
                name="quantity"
              />
              <br />
              
              <img className="seller-product-info-image" src={productinfo.image} />
              
             
              <div >
              <button className="btn-warning seller-updatebutton">Update</button>
              <button
                className="seller-deletebutton"
                onClick={(e) => this.deleteOwnProduct(e, productinfo)}
              >
                Delete
              </button>
            </div>
              
            </form>
            
          </div>
        );
      });
  };

  render() {
    // total amount of products per seller
    let totalProducts;
    if (this.props.currentUser) {
      totalProducts = this.props.product
        .map(
          (product) => product.seller_id === this.props.currentUser["user_id"]
        )
        .filter((product) => product === true).length;
    }
    return (
      <React.Fragment>
        <p className="seller-username">{this.props.currentUser.username}</p>
        <AddProduct />
        <p className="seller-currentProducts">
          {this.props.currentUser.username} Current Products
        </p>
        <p className="seller-totalProducts">
          Total Amount of Products: {totalProducts}
        </p>
        {this.sellersProducts()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => {
  // console.log(user.user)
  return {
    currentUser: user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sellerDeleteProduct: (deletedProduct) =>
      dispatch({
        type: "DELETE_PRODUCT",
        payload: deletedProduct,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerProdContainer);
