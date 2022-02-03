import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PLP, Navbar } from "components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  render() {
    return (
      <>
        <Navbar />
        <Router>
          <Switch>
            {" "}
            <Route path="/category/:category" component={PLP} />
            {/* <Route path="/cart" component={Cart} /> */}
            {/* <Route to="*"></Route> */}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
