import React, { Component } from "react";
import { connect } from "react-redux";
import { add } from "../../store/cartStore";

class Product extends Component {
  render() {
    let { name, add } = this.props;
    return <p onClick={() => add(name)}>{name}</p>;
  }
}

export default connect((state) => state.cart, { add })(Product);
