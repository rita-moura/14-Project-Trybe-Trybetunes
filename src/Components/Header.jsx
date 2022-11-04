import React, { Component } from 'react';
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
        <h1>Header</h1>
        <p data-testid="header-user-name">{ nameUser }</p>
      </header>
    );
  }
}

export default Header;
