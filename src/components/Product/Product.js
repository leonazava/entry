import { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { cart } from "assets";
import { CurrencyDisplay } from "./CurrencyDisplay";
import fetchGraphQL from "components/fetchGraphQL";
import "./styles.sass";
import Options from "./Options";
import Gallery from "./Gallery";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", data: {}, selectedOption: 0 };
    this.descriptionRef = createRef();
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  async componentDidMount() {
    const [response, error] = await fetchGraphQL(`
    query {
      product(id: "${this.props.id}") {
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
    this.setState({ data: response.data.product });
  }
  componentDidUpdate() {
    // console.log(this.state);
    this.descriptionRef.current.innerHTML = this.state.data.description;
  }
  render() {
    if (!this.state.data?.name) return "";
    return (
      <div className={`product ${this.state.data.inStock ? "in-stock" : ""}`}>
        <div className="product__images">
          <Gallery images={this.state.data.gallery} />
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              this.state.add(this.state.data.name);
            }}
          >
            <img src={cart} alt="icon" />
          </button>
          <h2>OUT OF STOCK</h2>
        </div>

        <div className="product__info">
          <div className="product__title">
            <h1 className="product__title-brand">{this.state.data.brand}</h1>
            <h1 className="product__title-name">{this.state.data.name}</h1>
          </div>
          <div className="product__options">
            {/* {this.state.data.attributes && (
              <>
                <h2>{this.state.data.attributes[0].name.toUpperCase()}</h2>
                <Options
                  type={this.state.data.attributes[0].type}
                  items={this.state.data.attributes[0].items}
                  selectedOption={this.state.selectedOption}
                  handleOptionClick={this.handleOptionClick}
                />
              </>
            )} */}
          </div>
          <div className="product__price">
            <h2>PRICE</h2>
            <h3>
              <CurrencyDisplay prices={this.state.data.prices} />
            </h3>
          </div>
          <div className="product__add-to-cart">
            <p>ADD TO CART</p>
          </div>
          <div ref={this.descriptionRef} className="product__description" />
        </div>
      </div>
    );
  }
  handleOptionClick(i) {
    this.setState({ selectedOption: i });
  }
}

export default Product;
