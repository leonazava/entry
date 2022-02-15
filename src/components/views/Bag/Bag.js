import { Component } from "react";
import { Cart } from "components/Cart/Cart";
import "./styles.sass";

class Bag extends Component {
  render() {
    return (
      <div className="Bag">
        <h1>CART</h1>
        <Cart />
      </div>
    );
  }
}

export default Bag;
