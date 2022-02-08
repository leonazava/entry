import { Component } from "react";
import { connect } from "react-redux";
import { add } from "store/cartStore";

class AddToCartBtnClass extends Component {
  render() {
    return (
      <button
        className="add-to-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {" "}
        {this.props.children}
      </button>
    );
  }
}

export const AddToCartBtn = connect((state) => state.cart, { add })(
  AddToCartBtnClass
);
