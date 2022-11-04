import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    nameUser: '',
    loading: true,
  };

  async componentDidMount() {
    const getNameUser = await getUser();
    const { name } = getNameUser;
    this.setState({ nameUser: name, loading: false });
  }

  render() {
    const { nameUser, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ nameUser }</h1>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
