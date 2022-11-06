import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  state = {
    nameInput: '',
    isButtonValid: false,
  };

  validButton = () => {
    const { nameInput } = this.state;
    const MIN_CARACTER = 2;
    this.setState({ isButtonValid: nameInput.length >= MIN_CARACTER });
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, (this.validButton));
  };

  render() {
    const { nameInput, isButtonValid } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search-artist-input"
            name="nameInput"
            value={ nameInput }
            onChange={ this.handleChangeInput }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ !isButtonValid }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
