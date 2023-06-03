// export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN'


export function fetchProducts() {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/products`);
      const data = await response.json();
      dispatch({ type: "FETCH_PRODUCTS", payload: data });
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
}



export const addProduct = (newproduct) => {
  return {
    type: "ADD_PRODUCT",
    payload: newproduct
  }
}

export const sellerDeleteProduct = (deletedProduct) => {
  return {
    type: "DELETE_PRODUCT",
    payload: deletedProduct
  }
}

// export const addProduct = (newproduct) => {
//   return (dispatch) => {
//     return fetch(`http:localhost:3001/products`, {
//       method: "POST",
//       headers: {
//         'Content-Type': "application/json",
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(newproduct)
//     })
//     .then(response => response.json())
//     .then(product => {
//       console.log(product)
//     })
//   }
// }
