import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="PDP">Product</div>;
  }
}

export default Product;
