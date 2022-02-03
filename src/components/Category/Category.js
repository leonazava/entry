import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import { assign } from "../../store/categoryStore";
import { add } from "../../store/cartStore";
import { cart } from "../../assets";
import Cart from "../Cart/Cart";
import Product from "./CategoryProduct";
import "./styles.sass";

class Category extends Component {
  constructor(props) {
    super(props);
    //move this data to global state
    this.state = { categories: [], data: [] };
  }

  // derive currently selected category from the URL params
  getParams() {
    let { category } = matchPath(this.props.history.location.pathname, {
      path: this.props.match.path,
    }).params;
    return category;
  }

  async componentDidMount() {
    // fetch different data on initial mount depending on the starting URL
    this.props.assign(this.getParams());
    // use react router listen function to react to route changes
    this.unlisten = this.props.history.listen(() => {
      // prevent listener from running on unmount
      if (!this.props.history.location.pathname.includes("category")) return;
      // get currently selected category from the URL parameters & use it to update the corresponding state property
      this.props.assign(this.getParams());
    });
    // fetch the endpoint using the state
    let [response, error] = await fetchGraphQL(`
    query {
      categories { name },
      category(input: {title: "${this.props.category.value}"} ) {
        products {
          gallery, 
          name,
          inStock,
          prices {
            currency {
              label
            },
            amount
          }
        }
      }
    }
      `);
    if (error) {
      console.log(error);
      return;
    }
    // set state data to the response
    this.setState({
      categories: response.data.categories,
      data: response.data.category.products,
    });
  }

  // fetch new data on rerender
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.category.value === this.props.category.value) return;
    // is there a way to optimize this by querying less data/reusing old data?
    const [response, error] = await fetchGraphQL(`
      query {
      category(input: {title: "${this.props.category.value}"} ) {
        products {
          name,
          gallery,
          inStock,
          prices {
            currency {
              label
            },
            amount
          }
        }
      }
    }
      `);
    if (error) {
      console.log(error);
      return;
    }
    this.setState({ data: response.data.category.products });
  }

  // remove history listener on unmount
  componentWillUnmount() {
    this.unlisten();
  }

  getCurrency(el) {
    let res;
    for (let i = 0; i < el.length; i++) {
      if (el[i].currency.label === this.props.currency.value.active.label) {
        res = el[i];
        return res;
      }
    }
  }

  render() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <div className="PLP">
        <ul className="PLP__selector">
          {this.state.categories?.map(({ name }) => (
            <li key={name}>
              <Link to={`/category/${name}`}>
                <h1
                  className={this.props.category.value === name ? "active" : ""}
                >
                  {capitalize(name)}
                </h1>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="PLP__container">
          {this.state.data?.map(({ name, gallery, inStock, prices }) => (
            // Componentize + reuse all of this vvv
            // <Product key={name} name={name} />
            <li
              key={name}
              className={`PLP__product ${inStock ? "in-stock" : ""}`}
            >
              <div className="PLP__product-image-container">
                <img src={gallery[0]} alt="product image" />
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.add(name);
                  }}
                >
                  <img src={cart} alt="icon" />
                </button>
                <h2>OUT OF STOCK</h2>
              </div>
              <div className="PLP__product-description">
                <h2>{name}</h2>
                <h2>
                  {this.props.currency.value.active.symbol}
                  {this.getCurrency(prices).amount}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({ category: state.category, currency: state.currency }),
  {
    assign,
    add,
  }
)(Category);
