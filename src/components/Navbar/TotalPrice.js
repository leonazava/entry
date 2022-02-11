import { Component } from "react";
import { connect } from "react-redux";
import { calculateTotalPrice } from "store/cartStore";

class TotalPriceClass extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currency.value.active !== this.props.currency.value.active) {
      this.props.calculateTotalPrice(this.props.currency.value.active);
      return;
    }
    if (prevProps.cart.value.contents !== this.props.cart.value.contents) {
      this.props.calculateTotalPrice(this.props.currency.value.active);
    }
  }
  render() {
    return (
      <>
        ${this.props.currency.value.symbol}
        {Math.round((this.props.cart.value.totalPrice + Number.EPSILON) * 100) /
          100}
      </>
    );
  }
}

export const TotalPrice = connect(
  (state) => ({
    cart: state.cart,
    currency: state.currency,
  }),
  { calculateTotalPrice }
)(TotalPriceClass);
