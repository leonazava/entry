import { Component } from "react";
import Product from "components/Product/Product";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { add } from "store/cartStore";

class ProductListClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  //  fetch new data based on selected category change
  async componentDidUpdate(prevProps) {
    if (prevProps.value === this.props.value) return;
    const [response, error] = await fetchGraphQL(`
      query {
      category(input: {title: "${this.props.value}"} ) {
        products {
          id,
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
        {this.state.value?.map(({ id }, i) => (
          <li
            key={i}
            className="PLP__product"
            onClick={() => this.props.handleClick(id)}
          >
            <Product key={id} id={id} />
          </li>
        ))}
      </ul>
    );
  }
}

export const ProductList = connect((state) => state.category, { add })(
  ProductListClass
);
