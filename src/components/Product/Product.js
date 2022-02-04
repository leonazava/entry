import React, { Component } from "react";
import { Link, matchPath } from "react-router-dom";
import { cart } from "assets";
import { CurrencyDisplay } from "./CurrencyDisplay";
import fetchGraphQL from "components/fetchGraphQL";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", data: {} };
  }

  async componentDidMount() {
    // console.log(this.props);
  }
  render() {
    return (
      <li
        className={`product PLP__product ${
          this.props.data.inStock ? "in-stock" : ""
        }`}
      >
        <div className="PLP__product-image-container">
          <img src={this.props.data.gallery[0]} alt="product image" />
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              this.props.add(this.props.data.name);
            }}
          >
            <img src={cart} alt="icon" />
          </button>
          <h2>OUT OF STOCK</h2>
        </div>
        <div className="PLP__product-description">
          <h2>{this.props.data.name}</h2>
          <h2>
            <CurrencyDisplay prices={this.props.data.prices} />
          </h2>
        </div>
      </li>
    );
  }

  getParams() {
    let { category } = matchPath(this.props.history.location.pathname, {
      path: this.props.match.path,
    }).params;
    return category;
  }
}

export default Product;
