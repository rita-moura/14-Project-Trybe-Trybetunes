import React, { Component } from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import Albuns from '../Components/Albuns';

class Search extends Component {
  state = {
    nameInput: '',
    isButtonValid: false,
    loading: false,
    musics: [],
    searchName: '',
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

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { nameInput } = this.state;
    const response = await searchAlbumsAPI(nameInput);
    this.setState({
      nameInput: '',
      loading: false,
      musics: response,
      searchName: nameInput,
    });
  };

  render() {
    const { nameInput, isButtonValid, loading, searchName, musics } = this.state;

    if (loading) return <Loading />;

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
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { musics.length > 0 ? <p>{ `Resultado de álbuns de: ${searchName}` }</p>
          : <p>Nenhum álbum foi encontrado</p> }
        { musics.length > 0
        && musics.map((album) => <Albuns key={ album.collectionId } { ...album } />) }
      </div>
    );
  }
}

export default Search;
