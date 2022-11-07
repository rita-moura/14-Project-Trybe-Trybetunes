import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, handleChange, trackId, checkboxControl } = this.props;
    return (
      <div>
        <div>
          <h3>{ trackName }</h3>
        </div>

        <div>
          <img src={ previewUrl } alt={ trackName } />
        </div>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>

        <label htmlFor="favo-input">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="favo-input"
            type="checkbox"
            name={ trackName }
            checked={ checkboxControl }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
