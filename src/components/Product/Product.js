import { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { cart } from "assets";
import { CurrencyDisplay } from "./CurrencyDisplay";
import fetchGraphQL from "components/fetchGraphQL";

// import "./styles.sass";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: 0 };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  render() {
    let { inStock } = this.props;
    return (
      <div className={`product ${inStock ? "in-stock" : ""}`}>
        {" "}
        {this.props.render(this.state, this.handleOptionClick)}
      </div>
      // <div className={`product ${this.state.data.inStock ? "in-stock" : ""}`}>
      //   <div className="product__images">
      //     <Gallery images={this.state.data.gallery} />
      //     <button
      //       className="add-to-cart-btn"
      //       onClick={(e) => {
      //         e.preventDefault();
      //         this.state.add(this.state.data.name);
      //       }}
      //     >
      //       <img src={cart} alt="icon" />
      //     </button>
      //     <h2>OUT OF STOCK</h2>
      //   </div>

      //   <div className="product__info">
      //     <div className="product__title">
      //       <h1 className="product__title-brand">{brand}</h1>
      //       <h1 className="product__title-name">{name}</h1>
      //     </div>
      //     <div className="product__options">
      //       {this.state.data.attributes && (
      //         <>
      //           <h2>{this.state.data.attributes[0].name.toUpperCase()}</h2>
      //           <Options
      //             type={attributes[0].type}
      //             items={attributes[0].items}
      //             selectedOption={this.state.selectedOption}
      //             handleOptionClick={this.handleOptionClick}
      //           />
      //         </>
      //       )}
      //     </div>
      //     <div className="product__price">
      //       <h2>PRICE</h2>
      //       <h3>
      //         <CurrencyDisplay prices={prices} />
      //       </h3>
      //     </div>
      //     <div className="product__add-to-cart">
      //       <p>ADD TO CART</p>
      //     </div>
      //     <Description body={description} />
      //   </div>
      // </div>
    );
  }

  handleOptionClick(i) {
    this.setState({ selectedOption: i });
  }
}

export default Product;
