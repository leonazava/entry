import { Component, createRef } from "react";
import { CategorySelector } from "./CategorySelector";
import { Cart } from "components/Cart/Cart";
import { TotalItems } from "./TotalItems";
import { TotalPrice } from "./TotalPrice";
import { logo, cart, arrow } from "../../assets";
import { connect } from "react-redux";
import { assign, select } from "../../store/currencyStore";
import { Link } from "react-router-dom";
import fetchGraphQL from "../fetchGraphQL";
import "./styles.sass";

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
    this.curtain = document.querySelector(".curtain");

    if (!this.state.currencyOpen || !this.state.bagOpen) {
      this.curtain.classList.remove("open");
    }
    this.curtain.addEventListener("mousedown", this.handleClickOutside);
    if (this.props.value.currencies.length === 0) {
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currencyOpen || this.state.bagOpen) {
      if (this.curtain.classList.contains("open")) return;
      this.curtain.classList.add("open");
      return;
    }
    this.curtain.classList.remove("open");
  }
  componentWillUnmount() {
    this.curtain.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e) {
    // if (this.utilsRef && this.utilsRef.current.contains(e.target)) return;
    this.setState({ currencyOpen: false, bagOpen: false });
  }

  handleCurtain() {
    this.curtain.classList.contains("open")
      ? this.curtain.classList.remove("open")
      : this.curtain.classList.add("open");
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
    this.handleCurtain();
    this.props.select(el);
    this.setState({ currencyOpen: false });
  }

  render() {
    return (
      <div className="nav-container">
        <nav>
          <div className="categories">
            <CategorySelector initialCategory={this.props.initialCategory} />
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
                <TotalItems />
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
            className={`modal minicart-modal ${
              this.state.bagOpen ? "open" : ""
            }`}
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
                <ActionButton content="VIEW BAG" path="/bag" close={this.foo} />
                <ActionButton content="CHECKOUT" path="/" close={this.foo} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

class ActionButtonClass extends Component {
  isDisabled() {
    return this.props.value.contents.length === 0;
  }
  render() {
    let { content, path, close } = this.props;
    return (
      <button
        disabled={this.isDisabled()}
        className={`${this.isDisabled() ? "disabled" : ""}`}
        onClick={() => {
          if (this.isDisabled()) return;
          close();
        }}
      >
        <Link to={path}>
          <p>{content}</p>
        </Link>
      </button>
    );
  }
}

const ActionButton = connect((state) => state.cart)(ActionButtonClass);

export default connect((state) => state.currency, { assign, select })(Navbar);
