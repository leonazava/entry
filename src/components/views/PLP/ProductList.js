import React, { Component } from "react";
import Product from "components/Product/Product";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { add } from "store/cartStore";

class ProductListClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    // fetch the endpoint using the active category value from redux store
    let [response, error] = await fetchGraphQL(`
    query {
      category(input: {title: "${this.props.value}"} ) {
        products {
          id, 
          gallery, 
          name,
          inStock,
          brand, 
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
        {this.state.value?.map((el, i) => (
          <Product
            key={i}
            data={el}
            history={this.props.history}
            match={this.props.match}
          />
        ))}
      </ul>
    );
  }
}

export const ProductList = connect((state) => state.category, { add })(
  ProductListClass
);
