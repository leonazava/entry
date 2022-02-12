import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PLP, Navbar, PDP } from "components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="views">
          <Router>
            <Switch>
              {" "}
              <Route path="/category/:category" component={PLP} />
              <Route path="/product/:id" component={PDP} />
              {/* <Route to="*"></Route> */}
            </Switch>
          </Router>
          <div className="curtain" />
        </div>
      </div>
    );
  }
}

export default App;
