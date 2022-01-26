import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h3>cart</h3>
        <div>
          <Link to="/">Home</Link>;
        </div>
      </>
    );
  }
}

export default Cart;
