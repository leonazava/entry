import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link } from "react-router-dom";
import "./styles.sass";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h3>category</h3>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          <Link to="/">Home</Link>;
        </div>
      </>
    );
  }
}

export default Category;
