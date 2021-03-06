import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/Logo1.png";

import api from "../../services/api";

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    departamento: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { name, email, password, departamento } = this.state;
    if (!name || !email || !password || !departamento) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/signUp", { name, email, password, departamento });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="TOTVS logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <select 
            value={this.state.value} 
            onChange={e => this.setState({ departamento: e.target.value })}
            placeholder="Departamento"
            >
            <option value="" disabled selected color="#999">Departamento</option>
            <option value="financeiro">Financeiro</option>
            <option value="faturamento">Faturamento</option>
            <option value="fiscal">Fiscal</option>
            <option value="compras">Compras</option>
          </select>
          <button type="submit">Cadastrar</button>
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);