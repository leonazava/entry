import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cart } from "assets";
import { CurrencyDisplay } from "./CurrencyDisplay";
import fetchGraphQL from "components/fetchGraphQL";
import getParams from "components/getParams";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", data: {} };
  }

  async componentDidMount() {
    console.log(this.props.id);
    const [response, error] = await fetchGraphQL(`
    query {
      product(id: "${this.props.id}") {
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
          }
          amount
        }
        brand
      }
    }
    `);

    if (error) {
      console.log(error);
      return;
    }
    this.setState({ data: response.data.product });
  }
  render() {
    if (!this.state.data?.name) return "";
    return (
      <li
        className={`product PLP__product ${
          this.state.data.inStock ? "in-stock" : ""
        }`}
      >
        <div className="PLP__product-image-container">
          <img src={this.state.data.gallery[0]} alt="product image" />
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              this.state.add(this.state.data.name);
            }}
          >
            <img src={cart} alt="icon" />
          </button>
          <h2>OUT OF STOCK</h2>
        </div>
        <div className="PLP__product-description">
          <h2>{this.state.data.name}</h2>
          <h2>
            <CurrencyDisplay prices={this.state.data.prices} />
          </h2>
        </div>
      </li>
    );
  }
}

export default Product;
