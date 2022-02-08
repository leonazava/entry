import { Component } from "react";
import getParams from "components/getParams";
import {
  Gallery,
  CurrencyDisplay,
  Options,
  Description,
  AddToCartBtn,
} from "components/Product";
import "./styles.sass";
import fetchGraphQL from "components/fetchGraphQL";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = { value: {} };
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
    console.log(response);
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
    this.state = { selectedOption: 0 };
    this.handleOptionClick = this.handleOptionClick.bind(this);
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
                <h2>{attributes[0].name.toUpperCase()}</h2>
                <Options
                  type={attributes[0].type}
                  items={attributes[0].items}
                  selectedOption={this.state.selectedOption}
                  handleOptionClick={this.handleOptionClick}
                />
              </>
            )}
          </div>
          <div className="product__price">
            <h2>PRICE</h2>
            <h3>
              <CurrencyDisplay prices={prices} />
            </h3>
          </div>
          <AddToCartBtn>
            <p>ADD TO CART</p>
          </AddToCartBtn>
          <Description body={description} />
        </div>
      </div>
    );
  }

  handleOptionClick(i) {
    this.setState({ selectedOption: i });
  }
}

export default PDP;
