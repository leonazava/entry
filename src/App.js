import React, { Component } from "react";
import fetchGraphQL from "./components/fetchGraphQL";
import "./App.css";

const query = `
        query {
          categories {
            name
          }
        }
`;

class App extends Component {
  state = { data: "" };

  async componentDidMount() {
    let data;
    data = await fetchGraphQL(query);
    console.log(data);
    this.setState({ ...data });
  }
  componentDidUpdate() {
    console.log(this.state.data);
  }
  render() {
    return (
      <ul>
        {this.state.data?.categories?.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
        {/* {console.log(this.state)} */}
      </ul>
    );
  }
}

export default App;
