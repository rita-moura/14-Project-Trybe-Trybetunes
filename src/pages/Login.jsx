import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isValidButton: false,
      handleChange: this.handleChange,
      loading: false,
    };
  }

  validateButton = () => {
    const { name } = this.state;
    const MIN_LENGTH = 2;
    const nameInput = name.length >= MIN_LENGTH;
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

  onClickButton = (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { name } = this.state;
    const SECOND = 1000;

    createUser({ name });

    this.setState(() => ({ loading: true }));

    setTimeout(() => {
      history.push('/search');
    }, SECOND);
  };

  render() {
    const { name, isValidButton, handleChange, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
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

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ !isValidButton }
          onClick={ this.onClickButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: Proptypes.string.isRequired,
};

export default Login;
