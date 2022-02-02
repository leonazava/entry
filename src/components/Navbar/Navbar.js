import React, { Component } from "react";
import { logo, cart, arrow } from "../../assets";
import { connect } from "react-redux";
import { assign, select } from "../../store/currencyStore";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOpen: false,
      bagOpen: false,
    };
    this.handleCurrencyModalClick = this.handleCurrencyModalClick.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
  }

  async componentDidMount() {
    const [response, error] = await fetchGraphQL(`query {
      currencies {
        label,
        symbol
      }
    }`);
    if (error) {
      console.log(error);
      return;
    }
    this.props.assign(response.data.currencies);
  }

  handleCurrencyModalClick() {
    this.setState((state) => ({ currencyOpen: !state.currencyOpen }));
  }

  handleCurrencySelect(el) {
    this.props.select(el);
    this.setState({ currencyOpen: false });
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
        <div className="utils-wrapper">
          <div
            className={`utils ${
              this.state.currencyOpen ? "currency-open" : ""
            }`}
          >
            <div className="currency" onClick={this.handleCurrencyModalClick}>
              <p>{this.props.value?.active.symbol}</p>
              <img src={arrow} alt="arrow" />
            </div>
            <div className="minicart">
              <img src={cart} alt="minicart" />
            </div>
            <ul className="modal currency-modal">
              {this.props.value?.currencies.map((e) => (
                <li onClick={() => this.handleCurrencySelect(e)}>
                  <h3>{e.symbol}</h3>
                  <h3>{e.label}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state) => state.currency, { assign, select })(Navbar);
