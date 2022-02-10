import { Component, createRef } from "react";
import Cart from "components/Cart/Cart";
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
    this.wrapperRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCurrencyModalClick = this.handleCurrencyModalClick.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
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

  handleCurrencyModalClick() {
    this.setState((state) => ({ currencyOpen: !state.currencyOpen }));
  }

  handleCurrencySelect(el) {
    this.props.select(el);
    this.setState({ currencyOpen: false });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ currencyOpen: false, bagOpen: false });
    }
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
            ref={this.wrapperRef}
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
              {this.props.value?.currencies.map((e, i) => (
                <li key={i} onClick={() => this.handleCurrencySelect(e)}>
                  <h3>{e.symbol}</h3>
                  <h3>{e.label}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="modal minicart-modal">
          <div className="minicart-modal__items-count">
            <h2>
              <span>My Bag, </span>2 items
            </h2>
          </div>
          <div className="minicart-modal__bag">
            <Cart />
          </div>
          <div className="minicart-modal__conclusion">
            <div className="total-price">
              <h2>Total</h2>
              <h2>$100.00</h2>
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
