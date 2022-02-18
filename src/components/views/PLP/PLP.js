import { Component } from "react";
import { Navbar } from "components";
import getParams from "components/getParams";
import { ProductList } from "./ProductList";
import "./styles.sass";

class PLP extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <>
        <Navbar
          initialCategory={() =>
            this.getCategory(
              this.props.history.location.pathname,
              this.props.match.path
            )
          }
        />
        <div className="PLP">
          <ProductList handleClick={this.handleClick} />
        </div>
      </>
    );
  }
  handleClick(id) {
    this.props.history.push(`/product/${id}`);
  }

  getCategory(pathname, path) {
    let { category } = getParams(pathname, path);
    return category;
  }
}

export default PLP;
