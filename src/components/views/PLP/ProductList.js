import React, { Component } from "react";
import PLPProduct from "components/Product/PLPProduct";
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
        {this.state.value?.map((el, i) => (
          <PLPProduct key={i} data={el} />
        ))}
      </ul>
    );
  }
}

export const ProductList = connect((state) => state.category, { add })(
  ProductListClass
);
