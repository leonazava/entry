import { Component } from "react";
import { CurrencyDisplay, Quantity } from "components/Product";
import { connect } from "react-redux";
import "./styles.sass";

class CartClass extends Component {
  render() {
    let { contents } = this.props.value;
    if (contents.length === 0) return <h1 className="cart-empty">EMPTY</h1>;
    return (
      <div className="cart">
        {this.props.value.contents.map((el, i) => (
          <Product data={el} index={i} key={`${el.name}-${i}`} />
        ))}
      </div>
    );
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryIndex: 0 };
  }
  renderOptions(options, attributes) {
    let keys = Object.keys(options);
    let selected = [];
    for (let i = 0; i < keys.length; i++) {
      selected.push({
        name: attributes[i].name,
        value: attributes[i].items[options[keys[i]]].value,
      });
    }
    return selected;
  }

  deriveOptionOutput(option) {
    if (option.value === "Yes") return <p>{option.name}</p>;
    if (option.value === "No") return;
    if (option.value.includes("#"))
      return <div className="swatch-option" style={{ "--bg": option.value }} />;
    return <p>{option.value}</p>;
  }

  render() {
    let { name, brand, prices, options, attributes, gallery } = this.props.data;
    return (
      <div className="product">
        <div className="product__overview">
          <div className="product__title">
            <h1>{brand}</h1>
            <h1>{name}</h1>
          </div>
          <div className="price">
            <h3>
              <CurrencyDisplay prices={prices} />
            </h3>
          </div>
          <div className="selected-options">
            {this.renderOptions(options, attributes).map((el, i) => {
              if (el.value === "No") return "";
              return (
                <div
                  key={i}
                  className={`options-box selected ${
                    el.value.includes("#") ? "swatch" : ""
                  }`}
                >
                  {this.deriveOptionOutput(el)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="product__quantity">
          <Quantity index={this.props.index} />
        </div>
        <div className="product__gallery">
          <img src={gallery[this.state.galleryIndex]} alt="product" />
          {/* left */}
          <div
            className={`selector ${
              this.state.galleryIndex === 0 ? "hidden" : ""
            }`}
            onClick={() =>
              this.setState((state) => {
                return { galleryIndex: state.galleryIndex - 1 };
              })
            }
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* right */}
          <div
            className={`selector ${
              this.state.galleryIndex === gallery.length - 1 ? "hidden" : ""
            }`}
            onClick={() =>
              this.setState((state) => {
                return { galleryIndex: state.galleryIndex + 1 };
              })
            }
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export const Cart = connect((state) => state.cart)(CartClass);
