import React, { Component } from "react";
import fetchGraphQL from "./components/fetchGraphQL";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Category, Cart } from "./components";
import { createBrowserHistory } from "history";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            {" "}
            <Route path="/category/:category" component={Category} />
            <Route path="/cart" component={Cart} />
            {/* <Route to="*"></Route> */}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
