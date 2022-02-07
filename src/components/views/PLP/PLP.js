import { Component } from "react";
import { CategorySelector } from "./CategorySelector";
import { ProductList } from "./ProductList";
import "./styles.sass";

class PLP extends Component {
  render() {
    return (
      <div className="PLP">
        <CategorySelector
          history={this.props.history}
          match={this.props.match}
        />
        <ProductList />
      </div>
    );
  }
}

export default PLP;
