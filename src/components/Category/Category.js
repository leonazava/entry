import React, { Component } from "react";
import fetchGraphQL from "../fetchGraphQL";
import { Link, matchPath } from "react-router-dom";
import "./styles.sass";
import categoryStore from "../../store/categoryStore";

class Category extends Component {
  constructor(props) {
    super(props);

    //!!TODO:
    //  make this dynamic, move the current property to a redux store

    this.state = { current: "all", categories: [], data: [] };
  }

  async componentDidMount() {
    categoryStore.subscribe(this.render);
    let urlmatch;
    this.unlisten = this.props.history.listen(() => {
      // prevent listener from running before unmount
      if (!this.props.history.location.pathname.includes("category")) return;
      // get fresh URL parameters
      urlmatch = matchPath(this.props.history.location.pathname, {
        path: this.props.match.path,
      });
      // set state category to the currently selected category
      this.setState({ current: urlmatch.params.category });
    });
    // fetch the endpoint using the state
    let [response, error] = await fetchGraphQL(`
    query {
      categories { name },
      category(input: {title: "${categoryStore.getState().value}"} ) {
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
    if (prevState.current === this.state.current) return;
    const [response, error] = await fetchGraphQL(`
    query {
    category(input: {title: "${this.state.current}"} ) {
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

export default Category;
