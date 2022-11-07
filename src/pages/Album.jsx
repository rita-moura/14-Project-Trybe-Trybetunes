import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    artist: {},
    musics: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

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
    const { artist, musics } = this.state;
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">{ artist.artistName }</h4>
        <h5 data-testid="album-name">{ artist.collectionName }</h5>
        { musics.map((music) => (
          <MusicCard
            key={ music.artistId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
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
