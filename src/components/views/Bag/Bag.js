import { Component } from "react";
import { Navbar } from "components";
import { Cart } from "components/Cart/Cart";
import "./styles.sass";

class Bag extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="Bag">
          <h1>CART</h1>
          <Cart />
        </div>
      </>
    );
  }
}

export default Bag;
