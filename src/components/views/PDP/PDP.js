import { Component } from "react";
import getParams from "components/getParams";
import {
  Gallery,
  CurrencyDisplay,
  Options,
  Description,
  AddToCartBtn,
} from "components/Product";
import fetchGraphQL from "components/fetchGraphQL";
import "./styles.sass";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = { value: {}, options: {} };
  }
  async componentDidMount() {
    let id = this.getId();
    const [response, error] = await fetchGraphQL(`
    query {
      product(id: "${id}") {
        name
        inStock
        gallery
        description
        attributes {
          name
          type
          items {
            value
            displayValue
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
    this.setState({ value: response.data.product });
  }
  render() {
    if (!this.state.value?.name) return "";
    return (
      <div className="PDP">
        <Product data={this.state.value} />
      </div>
    );
  }

  getId() {
    let id = getParams(
      this.props.history.location.pathname,
      this.props.match.path
    ).id;
    return id;
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
    this.setOptions = this.setOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    let { attributes, brand, name, prices, description, inStock, gallery } =
      this.props.data;
    return (
      <div className={`product ${inStock ? "in-stock" : ""}`}>
        <div className="product__images">
          <Gallery images={gallery} />
        </div>

        <div className="product__info">
          <div className="product__title">
            <h1 className="product__title-brand">{brand}</h1>
            <h1 className="product__title-name">{name}</h1>
          </div>
          <div className="product__options">
            {attributes && (
              <>
                <Options
                  attributes={attributes}
                  options={this.state.options}
                  setOptions={this.setOptions}
                  handleClick={this.handleClick}
                />
              </>
            )}
          </div>
          <div className="product__price">
            <h2>PRICE:</h2>
            <h3>
              <CurrencyDisplay prices={prices} />
            </h3>
          </div>
          <AddToCartBtn
            data={{ ...this.props.data, options: this.state.options }}
          >
            {inStock ? <p>ADD TO CART</p> : <p>OUT OF STOCK</p>}
          </AddToCartBtn>
          <Description body={description} />
        </div>
      </div>
    );
  }

  handleClick(attr, i) {
    this.setState((state) => ({ options: { ...state.options, [attr]: i } }));
  }
  // on initial load, populate the state option field with a property for each attribute
  setOptions(attributes) {
    let obj = {};
    attributes.map((el) => (obj = { ...obj, [el.name]: 0 }));
    this.setState({ options: obj });
  }
}

export default PDP;
