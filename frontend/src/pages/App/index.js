import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/Logo1.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import MiniDrawer from "../Menu/index"

class App extends Component {
  render() {
    return (
      <MiniDrawer departamento={this.props.location.state.depto}/>
    )
    }
}

export default withRouter(App);