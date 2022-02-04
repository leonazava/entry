import React, { Component } from "react";
import { connect } from "react-redux";

class CurrencyDisplayClass extends Component {
  getCurrency(el) {
    let res;
    for (let i = 0; i < el.length; i++) {
      if (el[i].currency.label === this.props.value.active.label) {
        res = el[i];
        return res;
      }
    }
  }
  render() {
    return (
      <>
        {this.props.value.active.symbol}
        {this.getCurrency(this.props.prices).amount}
      </>
    );
  }
}

export const CurrencyDisplay = connect((state) => state.currency)(
  CurrencyDisplayClass
);
