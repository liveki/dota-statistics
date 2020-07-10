import styled, { css } from 'styled-components';

interface MatchResultProps {
  winner: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #282727;

  display: flex;
  flex-direction: column;

  align-items: center;

  padding-bottom: 15px;

  > img {
    border-radius: 50%;
    border: 7px solid #282727;
    margin-top: -92px;
  }

  h3 {
    margin-top: 5px;
    font-weight: normal;
  }

  h4 {
    margin-top: 50px;
    margin-bottom: 10px;
    font-weight: normal;
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 178px;
  border-bottom: 1px solid #fff;

  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;

    color: #fff;

    margin-left: 35px;

    svg {
      margin-right: 15px;
    }
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  background: #403f3f;
  border-radius: 5px;

  th {
    font-size: 15px;
    text-align: left;
    font-weight: normal;
    padding: 15px 50px 15px 15px;
    border-bottom: 1px solid #626262;
  }

  tr + tr {
    border-top: 1px solid #626262;
  }

  td {
    text-align: left;
    padding: 10px 50px 10px 15px;
  }
`;

export const Hero = styled.td`
  display: flex;
  flex-direction: row;
`;

export const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  color: #66bbff;

  span + span {
    color: #fff;
    opacity: 0.6;
  }
`;

export const GameMode = styled.div`
  opacity: 0.6;
  display: flex;
  flex-direction: column;
`;
export const GameDuration = styled.div`
  opacity: 0.6;
  display: flex;
  flex-direction: column;
`;

export const MatchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 18px;

  span + span {
    color: #fff;
  }
`;

export const MatchResult = styled.span<MatchResultProps>`
  ${props =>
    props.winner &&
    css`
      color: #66bb6a;
    `}

  ${props =>
    !props.winner &&
    css`
      color: #ff4c4c;
    `}
`;
export const MatchMode = styled.span`
  opacity: 0.6;
`;

export const KDAMatch = styled.span`
  opacity: 0.6;
`;
