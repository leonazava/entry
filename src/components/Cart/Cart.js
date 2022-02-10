import { Component, createRef } from "react";
import "./styles.sass";

class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <Product />
      </div>
    );
  }
}

class Product extends Component {
  render() {
    return <h1>product</h1>;
  }
}

export default Cart;
