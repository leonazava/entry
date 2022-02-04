import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cart } from "assets";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { add } from "store/cartStore";

class ProductListClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    console.log(this.props);
    // fetch the endpoint using the active category value from redux store
    let [response, error] = await fetchGraphQL(`
    query {
      category(input: {title: "${this.props.value}"} ) {
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
      value: response.data.category.products,
    });
  }

  // refetch new data based on selected category change
  async componentDidUpdate(prevProps) {
    if (prevProps.value === this.props.value) return;
    const [response, error] = await fetchGraphQL(`
      query {
      category(input: {title: "${this.props.value}"} ) {
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
    this.setState({ value: response.data.category.products });
  }

  render() {
    return (
      <ul className="PLP__container">
        {this.state.value?.map(({ name, gallery, inStock, prices }) => (
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
                {/* {this.props.currency.value.active.symbol}
                {this.getCurrency(prices).amount} */}
              </h2>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  // getCurrency(el) {
  //   let res;
  //   for (let i = 0; i < el.length; i++) {
  //     if (el[i].currency.label === this.props.currency.value.active.label) {
  //       res = el[i];
  //       return res;
  //     }
  //   }
  // }
}

export const ProductList = connect((state) => state.category, { add })(
  ProductListClass
);
