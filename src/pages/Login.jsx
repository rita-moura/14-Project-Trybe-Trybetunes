import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isValidButton: false,
      handleChange: this.handleChange,
    };
  }

  validateButton = () => {
    const { name } = this.state;
    const minLength = 2;
    const nameInput = name.length >= minLength;
    return nameInput;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.setState({
      isValidButton: this.validateButton(),
    });
  };

  render() {
    const { name, isValidButton, handleChange } = this.state;
    return (
      <div data-testid="page-login">
        <div>
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              id="login-name-input"
              name="name"
              value={ name }
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ !isValidButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
