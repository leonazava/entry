import { Component } from "react";
import { connect } from "react-redux";

class TotalItemsClass extends Component {
  foo(length) {
    if (length === 1) return "item";
    return "items";
  }
  render() {
    let { totalItems } = this.props.value;
    return (
      <span className={`total-items ${totalItems === 0 ? "hidden" : ""}`}>
        {totalItems} <span>{this.foo(totalItems)}</span>
      </span>
    );
  }
}

export const TotalItems = connect((state) => state.cart)(TotalItemsClass);
