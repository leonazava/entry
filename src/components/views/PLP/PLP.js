import { Component } from "react";
import { CategorySelector } from "./CategorySelector";
import { ProductList } from "./ProductList";
import "./styles.sass";

class PLP extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div className="PLP">
        <CategorySelector
          history={this.props.history}
          match={this.props.match}
        />
        <ProductList handleClick={this.handleClick} />
      </div>
    );
  }
  handleClick(id) {
    this.props.history.push(`/product/${id}`);
    console.log("click");
  }
}

export default PLP;
