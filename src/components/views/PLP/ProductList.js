import { Component, createRef } from "react";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { add } from "store/cartStore";
import Options from "components/Product/Options";
import { CurrencyDisplay, AddToCartBtn } from "components/Product";
import { cart } from "assets";

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
      category(input: { title: "${this.props.value}" }) {
        products {
          id
          name
          brand
          inStock
          gallery
          prices {
            amount
            currency {
              label
            }
          }
          attributes {
            name 
            type 
            items {
              value
              displayValue
            }
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
            handleClick={() => this.props.handleClick(el.id)}
          />
        ))}
      </ul>
    );
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: 0 };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  render() {
    let { name, brand, gallery, prices, inStock } = this.props.data;
    return (
      <div
        className={`product ${inStock ? "in-stock" : ""}`}
        onClick={() => {
          if (!inStock) return;
          this.props.handleClick();
        }}
      >
        {" "}
        <div className="image">
          <img src={gallery[0]} alt="product" />
          <h2>OUT OF STOCK</h2>
          <div className="btn-wrapper">
            <AddToCartBtn>
              <img src={cart} alt="icon" />
            </AddToCartBtn>
            {/* shadow */}
            <div className="btn-clone" />
          </div>
        </div>
        <div>
          <div className="product__title">
            <h1 className="product__title-brand">{brand}</h1>
            <h1 className="product__title-name">{name}</h1>
          </div>
          <div className="product__price">
            <h3>
              <CurrencyDisplay prices={prices} />
            </h3>
          </div>
        </div>
      </div>
    );
  }

  handleOptionClick(i) {
    this.setState({ selectedOption: i });
  }
}

export const ProductList = connect((state) => state.category, { add })(
  ProductListClass
);
