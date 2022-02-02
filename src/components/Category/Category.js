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
    // fetch different data depending on the starting URL
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
      category(input: {title: "${this.props.value}"} ) {
        products {
          gallery, 
          name,
          inStock
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
    if (prevProps.value === this.props.value) return;
    const [response, error] = await fetchGraphQL(`
      query {
      category(input: {title: "${this.props.value}"} ) {
        products {
          name,
          gallery,
          inStock
        }
      }
    }
      `);
    // console.log(response.data.category.products);
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
                <h1 className={this.props.value === name && "active"}>
                  {capitalize(name)}
                </h1>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="PLP__container">
          {this.state.data?.map(({ name, gallery, inStock }) => (
            // <Product key={name} name={name} />
            <li key={name} className={`PLP__product ${inStock && "in-stock"}`}>
              <div className="PLP__image-container">
                <img src={gallery[0]} alt="product image" />
                <button
                  className="add-to-cart-btn"
                  onClick={() => this.props.add(name)}
                >
                  <img src={cart} alt="icon" />
                </button>
                <h2>OUT OF STOCK</h2>
              </div>
              <div className="description">
                <h2>{name}</h2>
                <h2>$50</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect((state) => state.category, { assign, add })(Category);
