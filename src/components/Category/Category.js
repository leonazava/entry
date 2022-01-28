import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import { assign } from "../../store/categoryStore";
import "./styles.sass";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], data: [] };
  }

  // derive currently selected category from the URL params
  getParams() {
    let { category } = matchPath(this.props.history.location.pathname, {
      path: this.props.match.path,
    }).params;
    return category;
  }

  async componentDidMount() {
    // fetch different data depending on the starting URL
    this.props.assign(this.getParams());
    // use react router listen function to react to route changes
    this.unlisten = this.props.history.listen(() => {
      // prevent listener from running on unmount
      if (!this.props.history.location.pathname.includes("category")) return;
      // get currently selected category from the URL parameters & use it to update the corresponding state property
      this.props.assign(this.getParams());
    });
    // fetch the endpoint using the state
    let [response, error] = await fetchGraphQL(`
    query {
      categories { name },
      category(input: {title: "${this.props.value}"} ) {
        products {
          name
        }
      }
    }
      `);
    if (error) {
      console.log(error);
      return;
    }
    // set state data to the response
    this.setState({
      categories: response.data.categories,
      data: response.data.category.products,
    });
  }

  // fetch new data on rerender
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value === this.props.value) return;
    const [response, error] = await fetchGraphQL(`
      query {
      category(input: {title: "${this.props.value}"} ) {
        products {
          name,
        }
      }
    }
      `);
    if (error) {
      console.log(error);
      return;
    }
    this.setState({ data: response.data.category.products });
  }

  // remove history listener on unmount
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <>
        <h3>category</h3>
        <ul>
          {this.state.categories?.map(({ name }) => (
            <li key={name}>
              <Link to={`/category/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
        <ul style={{ marginTop: "1rem" }}>
          {this.state.data?.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { assign })(Category);
