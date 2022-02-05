import React, { Component } from "react";
import Product from "components/Product/Product";
import "./styles.sass";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  render() {
    return (
      <div className="PDP">
        pdp
        {/* <Product /> */}
      </div>
    );
  }
}

export default PDP;
