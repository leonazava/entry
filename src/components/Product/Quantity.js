import { Component } from "react";
import { increment, decrement } from "store/cartStore";
import { connect } from "react-redux";

class QuantityClass extends Component {
  render() {
    let { index, value, increment, decrement } = this.props;
    return (
      <div className="quantity-setter">
        <div className="add" onClick={() => increment(index)}>
          <p>+</p>
        </div>
        <div className="quantity">{value.contents[index].quantity}</div>
        <div className="remove" onClick={() => decrement(index)}>
          <p>-</p>
        </div>
      </div>
    );
  }
}

export const Quantity = connect((state) => state.cart, {
  increment,
  decrement,
})(QuantityClass);
