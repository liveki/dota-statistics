import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fromUnixTime } from 'date-fns';
import { FiArrowLeft } from 'react-icons/fi';
import api from 'axios';
import { differenceInMinutes } from 'date-fns/esm';
import game_mode_list from '../../json/game_mode.json';
import lobby_type_list from '../../json/lobby_type.json';

import {
  Container,
  Header,
  Hero,
  HeroInfo,
  Table,
  GameMode,
  GameDuration,
  MatchResultContainer,
  MatchResult,
  MatchMode,
  KDAMatch,
} from './styles';

interface Profile {
  account_id: number;
  personaname: string;
  avatarfull: string;
}

interface PlayerResponse {
  profile: Profile;
}

interface Match {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  kills: number;
  deaths: number;
  assists: number;
}

interface Params {
  steamID: number;
}

interface Hero {
  avatar_url?: string;
  name: string;
  localized_name: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [matches, setMatches] = useState<Match[]>();
  const [heroes, setHeroes] = useState<Hero[]>();

  const params = useLocation<Params>();

  const { steamID } = params.state;

  useEffect(() => {
    async function loadProfile(): Promise<void> {
      const response = await api.get<PlayerResponse>(
        `https://api.opendota.com/api/players/${steamID}`,
      );

      const { profile: newProfile } = response.data;

      setProfile(newProfile);
    }

    loadProfile();
  }, [steamID]);

  useEffect(() => {
    async function loadHeroes(): Promise<void> {
      const response = await api.get<Hero[]>(
        'https://api.opendota.com/api/heroes/',
      );

      const newHeroes: Hero[] = response.data.map(hero => {
        const { id, name, localized_name } = hero;
        const parsedName = name.replace('npc_dota_hero_', '');
        const avatar_url = `https://steamcdn-a.akamaihd.net/apps/dota2/images/heroes/${parsedName}_sb.png`;

        return {
          localized_name,
          id,
          name,
          avatar_url,
        };
      });

      setHeroes(newHeroes);
    }

    loadHeroes();
  }, []);

  useEffect(() => {
    async function loadMatches(): Promise<void> {
      const response = await api.get<Match[]>(
        `https://api.opendota.com/api/players/${steamID}/recentMatches`,
      );

      const newMatches = response.data.map(match => {
        const {
          assists,
          deaths,
          duration,
          game_mode,
          hero_id,
          kills,
          lobby_type,
          player_slot,
          radiant_win,
          start_time,
          match_id,
        } = match;

        return {
          assists,
          deaths,
          duration,
          game_mode,
          hero_id,
          kills,
          lobby_type,
          player_slot,
          radiant_win,
          start_time,
          match_id,
        };
      });

      setMatches(newMatches);
    }

    loadMatches();
  }, [steamID]);

  const formattedData = useMemo(() => {
    return matches?.map(match => {
      const formattedHero = heroes?.find(
        findHero => findHero.id === match.hero_id,
      );

      const parsedMinutes = Math.round(match.duration / 60);

      const parsedSeconds = match.duration % 60;

      const formattedDuration = `${parsedMinutes}:${parsedSeconds}`;

      const finalTime = fromUnixTime(match.start_time);
      const parsedStartTime = differenceInMinutes(new Date(), finalTime);

      let formattedStartTime;

      if (parsedStartTime < 60) {
        formattedStartTime = `${parsedStartTime} minutos atrás`;
      } else {
        formattedStartTime = `${
          Math.round(parsedStartTime / 60) - 1
        } horas atrás`;
      }

      const isRadiant = !!(match.player_slot <= 127);

      const winner = isRadiant === match.radiant_win;

      const formattedGameResult = winner
        ? 'Venceu a partida'
        : 'Perdeu a partida';

      const formattedGameMode = game_mode_list.find(
        findGameMode => findGameMode.id === match.game_mode,
      )?.formattedName;

      const formattedLobbyType = lobby_type_list.find(
        findLobby => findLobby.id === match.lobby_type,
      )?.formattedName;

      const formattedTeam = isRadiant ? 'Iluminados' : 'Temidos';

      return {
        formattedHero,
        formattedStartTime,
        formattedGameResult,
        formattedLobbyType,
        formattedGameMode,
        formattedDuration,
        formattedTeam,
        kills: match.kills,
        deaths: match.deaths,
        assists: match.assists,
        winner,
        match_id: match.match_id,
      };
    });
  }, [heroes, matches]);

  return (
    <Container>
      <Header>
        <Link to="/">
          <FiArrowLeft size={35} color="#fff" />
          Voltar
        </Link>
      </Header>

      <img src={profile.avatarfull} alt={profile.personaname} />
      <h3>{profile.personaname}</h3>

      <h4>Últimas partidas</h4>
      <Table>
        <thead>
          <tr>
            <th>HERÓI</th>
            <th>RESULTADO</th>
            <th>MODO DE JOGO</th>
            <th>DURAÇÃO</th>
            <th>K</th>
            <th>M</th>
            <th>A</th>
          </tr>
        </thead>

        <tbody>
          {formattedData?.map(match => (
            <tr key={match.match_id}>
              <Hero>
                <img
                  src={match.formattedHero?.avatar_url}
                  alt={match.formattedHero?.name}
                />

                <HeroInfo>
                  <span>{match.formattedHero?.localized_name}</span>
                  <span>{match.formattedStartTime}</span>
                </HeroInfo>
              </Hero>

              <td>
                <MatchResultContainer>
                  <MatchResult winner={match.winner}>
                    {match.formattedGameResult}
                  </MatchResult>
                  <MatchMode>{match.formattedLobbyType}</MatchMode>
                </MatchResultContainer>
              </td>

              <td>
                <GameMode>
                  <span>{match.formattedGameMode}</span>
                  <span>Habilidade Normal</span>
                </GameMode>
              </td>

              <td>
                <GameDuration>
                  <span>{match.formattedDuration}</span>
                  <span>{match.formattedTeam}</span>
                </GameDuration>
              </td>

              <td>
                <KDAMatch>{match.kills}</KDAMatch>
              </td>
              <td>
                <KDAMatch>{match.deaths}</KDAMatch>
              </td>
              <td>
                <KDAMatch>{match.assists}</KDAMatch>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
