import { Component, createRef } from "react";
import { Cart } from "components/Cart/Cart";
import { logo, cart, arrow } from "../../assets";
import { connect } from "react-redux";
import { assign, select } from "../../store/currencyStore";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";
import { TotalItems } from "./TotalItems";
import { TotalPrice } from "./TotalPrice";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOpen: false,
      bagOpen: false,
    };

    this.utilsRef = createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.handleCurrencyModalClick = this.handleCurrencyModalClick.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);

    this.foo = this.foo.bind(this);
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

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

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e) {
    // if (this.utilsRef && this.utilsRef.current.contains(e.target)) return;
    // this.setState({ currencyOpen: false, bagOpen: false });
    "";
  }

  handleCurrencyModalClick() {
    this.setState((state) => ({
      bagOpen: false,
      currencyOpen: !state.currencyOpen,
    }));
  }

  foo() {
    this.setState((state) => ({
      currencyOpen: false,
      bagOpen: !state.bagOpen,
    }));
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
        {/* // */}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {/* // */}
        <div className="utils-wrapper">
          <div
            className={`utils ${
              this.state.currencyOpen ? "currency-open" : ""
            }`}
            ref={this.utilsRef}
          >
            <div className="currency" onClick={this.handleCurrencyModalClick}>
              <p>{this.props.value?.active.symbol}</p>
              <img src={arrow} alt="arrow" />
            </div>
            <div className="minicart" onClick={this.foo}>
              <img src={cart} alt="minicart" />
            </div>
            <ul className="modal currency-modal">
              {this.props.value?.currencies.map((e, i) => (
                <li key={i} onClick={() => this.handleCurrencySelect(e)}>
                  <h3>{e.symbol}</h3>
                  <h3>{e.label}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`modal minicart-modal ${this.state.bagOpen ? "open" : ""}`}
        >
          <div className="minicart-modal__items-count">
            <h2>
              <span>My Bag, </span>
              <TotalItems />
            </h2>
          </div>
          <div className={`minicart-modal__bag`}>
            <Cart />
          </div>
          <div className="minicart-modal__conclusion">
            <div className="total-price">
              <h2>Total</h2>
              <h2>
                <TotalPrice />
              </h2>
            </div>
            <div className="action-buttons">
              <div>View bag</div>
              <div>Checkout</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state) => state.currency, { assign, select })(Navbar);
