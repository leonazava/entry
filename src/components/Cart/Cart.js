import { CurrencyDisplay } from "components/Product";
import { Component, createRef } from "react";
import { connect } from "react-redux";
import "./styles.sass";

class CartClass extends Component {
  componentDidUpdate() {
    console.log(this.props.value);
  }
  render() {
    return (
      <div className="cart">
        {this.props.value.contents.map((el) => (
          <Product data={el} key={el.name} />
        ))}
      </div>
    );
  }
}

class Product extends Component {
  renderOptions(options, attributes) {
    let keys = Object.keys(options);
    let selected = [];
    for (let i = 0; i < keys.length; i++) {
      selected.push(attributes[i].items[options[keys[i]]].value);
    }
    return selected;
  }
  render() {
    let { name, brand, prices, options, attributes } = this.props.data;
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
            {/* {Object.keys(options).map((el) => (
              <div className="options-box" key={el}>
                {options[el]}
              </div>
            ))} */}
            {this.renderOptions(options, attributes).map((el, i) => (
              <div key={i} className="options-box">
                {el}
              </div>
            ))}
          </div>
        </div>
        <div className="product__quantity"></div>
        <div className="product__gallery"></div>
      </div>
    );
  }
}

export const Cart = connect((state) => state.cart)(CartClass);
