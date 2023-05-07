import '../styles/main.styles.css';
import GameSquares from './game.squares.component'
import Scoreboard from './scoreboard.coponent';
import GameMode from '../functions/game.mode';
import { useState, useEffect } from 'react';

const defaultSquares = () => (new Array(9)).fill(null);

const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];


const Gameboard = () => {

    const [squares, setSquares] = useState(defaultSquares());
    const [winner, setWinner] = useState(null);
    const [playerScore, setPlayerScore] = useState([])
    const [uid, setUid] = useState(0)


    useEffect(() => {
        const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
        const linesThatAre = (a, b, c) => {
            return lines.filter(squareIndexes => {
                const squareValues = squareIndexes.map(index => squares[index]);
                return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
            });
        };
        const emptyIndexes = squares
            .map((square, index) => square === null ? index : null)
            .filter(val => val !== null);
        const playerWon = linesThatAre('x', 'x', 'x').length > 0;
        const computerWon = linesThatAre('o', 'o', 'o').length > 0;
        if (playerWon) {
            setWinner('x');
            if (winner != null) {
                setUid(uid + 1)
                setPlayerScore(current => [...current, {
                    id: uid,
                    value: 'win',
                    player: 'Tyson'
                }
                ])
                setPlayerScore(current => [...current, {
                    id: uid,
                    value: 'loss',
                    player: 'AI'
                }
                ])
            }
        }
        if (computerWon) {
            setWinner('o');
            setUid(uid + 1)
            setPlayerScore(current => [...current, {
                id: uid,
                value: 'win',
                player: 'AI'
            }
            ])
            setPlayerScore(current => [...current, {
                id: uid,
                value: 'loss',
                player: 'Tyson'
            }
            ])
        }

        const putComputerAt = index => {
            let newSquares = squares;
            newSquares[index] = 'o';
            setSquares([...newSquares]);
        };
        if (isComputerTurn) {

            const winingLines = linesThatAre('o', 'o', null);
            if (winingLines.length > 0) {
                const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
                putComputerAt(winIndex);
                return;
            }

            const linesToBlock = linesThatAre('x', 'x', null);
            if (linesToBlock.length > 0) {
                const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
                putComputerAt(blockIndex);
                return;
            }

            const linesToContinue = linesThatAre('o', null, null);
            if (linesToContinue.length > 0) {
                putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
                return;
            }

            const randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
            putComputerAt(randomIndex);
        }
    }, [squares]);

    const handleSquareClick = (index) => {
        const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
        if (isPlayerTurn) {
            let newSquares = squares;
            newSquares[index] = 'x';
            setSquares([...newSquares]);
        }

        const findNullValues = squares.find(x => x == null)

        if (findNullValues === undefined) {
            setUid(uid + 1)
            setPlayerScore(current => [...current, {
                id: uid,
                value: 'draw',
                player: 'AI/Tyson'
            }
            ])
        }
    }

    return (
        <main>
            <GameMode>
                {squares.map((square, index) =>
                    <GameSquares
                        x={square === 'x' ? 1 : 0}
                        o={square === 'o' ? 1 : 0}
                        onClick={() => handleSquareClick(index)} />
                )}
            </GameMode>
            <div className='score-board-contianer'>
                <Scoreboard score={playerScore} />
                <button onClick={() => { setSquares(defaultSquares()); setWinner(null) }}>Restart Game</button>
            </div>

            {!!winner && winner === 'x' && (
                <div className="result green">
                    You WON!
                </div>
            )}
            {!!winner && winner === 'o' && (
                <div className="result red">
                    You LOST!
                </div>
            )}

        </main>
    );

}

export default Gameboard