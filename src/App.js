import { useState } from 'react';

const MAP__GAME = [...Array(9)].map(() => 0);

const PATTERN__WIN = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],

  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],

  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
];
const App = () => {
  const [map, setMap] = useState(MAP__GAME);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const [lineWinner, setLineWinner] = useState([]);
  const [isEndGame, setIsEndGame] = useState(false);
  const handleTick = (index, el) => {
    if (isEndGame) {
      reset();
      return;
    }
    if (el) {
      return;
    }
    const newMap = [...map.slice(0, index), player, ...map.slice(index + 1)];
    setMap(newMap);
    setPlayer((player) => (player === 1 ? 2 : 1));
    const mapPlayer = newMap.map((el) => el === player);
    const pattern = PATTERN__WIN.find((pattern) => handleWinner(pattern, mapPlayer));
    if (pattern) {
      handleLineWinner(pattern);
      setWinner((winner) => (winner = player));
      setIsEndGame(true);
      return;
    }
    const endGame = newMap.every((cell) => cell !== 0);
    setIsEndGame(endGame);
  };
  const handleLineWinner = (pattern) => {
    pattern.forEach((el, index) => {
      if (el) {
        setLineWinner((lineWinner) => [...lineWinner, index]);
      }
    });
  };
  const handleWinner = (pattern, currentMap) => {
    for (let i = 0; i < 9; i++) {
      if (pattern[i] && !currentMap[i]) {
        return false;
      }
    }
    return true;
  };
  const reset = () => {
    setMap(MAP__GAME);
    setPlayer(1);
    setWinner(0);
    setLineWinner([]);
    setIsEndGame(false);
  };
  return (
    <div className='container'>
      <header>
        <h2 className={`${player === 1 && 'active'}`}>Player 1</h2>
        <h2>{isEndGame ? (winner ?'winner:' + winner : 'Draw') : ''}</h2>
        <h2 className={`${player === 2 && 'active'}`}>Player 2</h2>
      </header>
      <div className='board'>
        {map.map((el, index) => {
          return (
            <button className={`btn btn--tick ${lineWinner.includes(index) && 'win'}`} key={index} onClick={() => handleTick(index, el)}>
              {el !== 0 ? (el === 1 ? 'X' : 'O') : ''}
            </button>
          );
        })}
        <button className='btn--reset' onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
