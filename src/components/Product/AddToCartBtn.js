import { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "store/cartStore";

class AddToCartBtnClass extends Component {
  render() {
    let { data, toggle } = this.props;
    return (
      <button
        // className="add-to-cart-btn"
        className={`add-to-cart-btn ${data.inStock ? "" : "disabled"}`}
        onClick={(e) => {
          if (!data.inStock) return;
          e.stopPropagation();
          this.props.addToCart(data);
          // close the options modal in PLP
          toggle && toggle();
        }}
      >
        {" "}
        {this.props.children}
      </button>
    );
  }
}

export const AddToCartBtn = connect((state) => state.cart, { addToCart })(
  AddToCartBtnClass
);
