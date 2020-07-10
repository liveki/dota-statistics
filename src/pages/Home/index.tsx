import React, { useCallback, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.png';

const Home: React.FC = () => {
  const [steamID, setSteamID] = useState('');

  const history = useHistory();

  const handleFindProfile = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      history.push('dashboard', { steamID });
    },
    [history, steamID],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo" />
        <form onSubmit={e => handleFindProfile(e)}>
          <input
            value={steamID}
            onChange={e => setSteamID(e.target.value)}
            type="text"
            placeholder="SteamID"
          />
          <button type="submit">Pesquisar</button>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default Home;
