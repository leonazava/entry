import { Component } from "react";
import { connect } from "react-redux";

class TotalItemsClass extends Component {
  foo(length) {
    if (length === 1) return "item";
    return "items";
  }
  render() {
    let { length } = this.props.value.contents;
    return (
      <span className={`total-items ${length === 0 ? "hidden" : ""}`}>
        {length} <span>{this.foo(length)}</span>
      </span>
    );
  }
}

export const TotalItems = connect((state) => state.cart)(TotalItemsClass);
