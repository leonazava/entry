import { Component } from "react";
import { increment, decrement } from "store/cartStore";
import { connect } from "react-redux";

class QuantityClass extends Component {
  render() {
    let { index, value, increment, decrement } = this.props;
    return (
      <div className="quantity-setter">
        <div className="add" onClick={() => increment(index)}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 1V16"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 8.5H16"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="quantity">
          <p>{value.contents[index].quantity}</p>
        </div>
        <div className="remove" onClick={() => decrement(index)}>
          <svg
            width="17"
            height="1"
            viewBox="0 0 17 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0.5H16"
              stroke="#1D1F22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export const Quantity = connect((state) => state.cart, {
  increment,
  decrement,
})(QuantityClass);
