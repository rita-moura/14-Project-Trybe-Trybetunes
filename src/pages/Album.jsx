import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    artist: {},
    musics: [],
    favorites: '',
    loading: false,
    checkboxControl: {},
  };

  async componentDidMount() {
    this.fetchMusic();
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const getFavorites = await getFavoriteSongs();
    if (getFavorites) {
      getFavorites.forEach(({ trackName }) => (
        this.setState((prev) => ({
          checkboxControl: { ...prev.checkboxControl, [trackName]: true },
        }))));
    }
  };

  handleChange = ({ target }) => {
    const LIMIT = 100;
    const { name, checked } = target;
    const { musics } = this.state;
    addSong();
    this.setState({ loading: true });
    setTimeout(() => {
      if (checked) {
        const getmusic = musics.find((music) => music.trackName === name);
        addSong(getmusic);
      }
      this.setState((prev) => ({
        checkboxControl: { ...prev.checkboxControl, [name]: checked },
        loading: false,
      }));
    }, LIMIT);
  };

  fetchMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const getMusic = await getMusics(id);
    const copyArray = [...getMusic];
    this.setState({
      artist: copyArray.shift(),
      musics: copyArray,
    });
  };

  render() {
    const { musics, artist, favorites, loading, checkboxControl } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />

        <h4 data-testid="artist-name">{ artist.artistName }</h4>

        <h5 data-testid="album-name">{ artist.collectionName }</h5>

        { musics.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ Math.random() }
            trackName={ trackName }
            previewUrl={ previewUrl }
            favorites={ favorites }
            handleChange={ this.handleChange }
            trackId={ trackId }
            checkboxControl={ checkboxControl[trackName] }
          />
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default Album;
