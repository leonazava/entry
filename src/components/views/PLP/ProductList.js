import { Component } from "react";
import fetchGraphQL from "components/fetchGraphQL";
import { connect } from "react-redux";
import { addToCart } from "store/cartStore";
import Options from "components/Product/Options";
import { CurrencyDisplay, AddToCartBtn } from "components/Product";
import { cart } from "assets";

class ProductListClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
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
  //  fetch  on initial load
  async componentDidMount() {
    this.fetchData();
  }

  //  fetch new data based on selected category change
  async componentDidUpdate(prevProps) {
    if (prevProps.value === this.props.value) return;
    this.fetchData();
  }

  render() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <>
        <div className="category-indicator">
          <h1>{capitalize(this.props.value)}</h1>
        </div>
        <ul className="PLP__container">
          {this.state.value?.map((el, i) => (
            <Product
              key={el.name}
              data={el}
              handleClick={() => this.props.handleClick(el.id)}
            />
          ))}
        </ul>
      </>
    );
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { optionsOpen: false, options: {} };
    this.toggle = this.toggle.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    let { name, brand, gallery, prices, inStock, attributes } = this.props.data;
    return (
      <div
        className={`product ${inStock ? "in-stock" : ""}`}
        onClick={() => {
          // if (!inStock) return;
          this.props.handleClick();
        }}
      >
        {" "}
        <div className="image">
          <img src={gallery[0]} alt="product" />
          <h2>OUT OF STOCK</h2>
          <div className="btn-wrapper">
            <div
              className="add-to-cart-btn stage"
              onClick={(e) => {
                e.stopPropagation();
                this.toggle();
              }}
            >
              <img src={cart} alt="icon" />
            </div>
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
        <div
          className={`options-wrapper ${this.state.optionsOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="options-container">
            <div>
              <Options
                attributes={attributes}
                options={this.state.options}
                setOptions={this.setOptions}
                handleClick={this.handleClick}
              />
            </div>
            <AddToCartBtn
              data={{ ...this.props.data, options: this.state.options }}
              toggle={this.toggle}
            >
              <p>ADD TO CART</p>
            </AddToCartBtn>
            <button
              className="close-btn"
              onClick={(e) => {
                e.preventDefault();
                this.toggle();
              }}
            >
              <p>close</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
  // handle an option click, set the selected option
  handleClick(attr, i) {
    this.setState((state) => ({ options: { ...state.options, [attr]: i } }));
  }
  // on initial load, populate the state option field with a property for each attribute
  setOptions(attributes) {
    let obj = {};
    attributes.map((el) => (obj = { ...obj, [el.name]: 0 }));
    this.setState({ options: obj });
  }
  // open-close the options window
  toggle() {
    this.setState((prev) => ({ optionsOpen: !prev.optionsOpen }));
  }
}

export const ProductList = connect((state) => state.category, { addToCart })(
  ProductListClass
);
