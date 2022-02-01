import React, { Component } from "react";
import { connect } from "react-redux";
import { add } from "../../store/cartStore";
import "./styles.sass";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }
  render() {
    return (
      <div className="cart">
        <h3>cart</h3>
        <div>
          <Link to="/category/all">Home</Link>
        </div>
      </div>
    );
  }
}

export default connect((state) => state.cart, { add })(Cart);
