import React, { Component } from "react";
import { logo, cart, arrow } from "../../assets";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav>
        <div className="sex">
          <h3 className="active">WOMEN</h3>
          <h3>MEN</h3>
          <h3>KIDS</h3>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="utils">
          <div className="currency">
            <p>$</p>
            <img src={arrow} alt="arrow" />
          </div>
          <div className="minicart">
            <img src={cart} alt="minicart" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
