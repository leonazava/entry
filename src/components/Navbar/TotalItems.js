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
      <>
        {length} {this.foo(length)}
      </>
    );
  }
}

export const TotalItems = connect((state) => state.cart)(TotalItemsClass);
