import React, { Component } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query {
    categories {
      name
    }
  }
`;

const withUseQuery = (Component) => {
  return function WrappedApp(props) {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <Component {...props} data={data} />;
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.data,
    };
  }
  componentDidMount() {
    console.log(this.state);
  }
  render() {
    return <h1>hello world</h1>;
  }
}

export default withUseQuery(App);
