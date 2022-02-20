import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assign } from "store/categoryStore";
import fetchGraphQL from "components/fetchGraphQL";

class CategorySelectorClass extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  async componentDidMount() {
    // fetch the existing selectable categories
    const [response, error] = await fetchGraphQL(`query {categories { name }}`);
    if (error) {
      console.log("error");
      return;
    }
    this.setState({ value: response.data.categories });
  }

  componentDidUpdate(prevProps) {
   this.props.initialCategory && this.props.assign(this.props.initialCategory())
  }

  componentWillUnmount() {
    this.props.assign("");
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        {" "}
        {this.state.value.map(({ name }) => (
          <div
            key={name}
            className={this.props.category.value === name ? "active" : ""}
          >
            <Link to={`/category/${name}`}>
              <h3>{name.toUpperCase()}</h3>
            </Link>
          </div>
        ))}
      </>
    );
  }

}

export const CategorySelector = connect(
  (state) => ({ category: state.category }),
  {
    assign,
  }
)(CategorySelectorClass);
