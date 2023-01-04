import React, { useState } from 'react';
import PlayField from '../components/PlayField';
import RestartButton from '../components/RestartButton';
import Timer from '../components/Timer';
import getCards from '../helpers/getCards';
import { IGame } from '../types/game';

interface IGameScreen {
	diff: number;
	restart: (value: number) => void;
}

const GameScreen: React.FC<IGameScreen> = (props) => {
	const { diff, restart } = props;

	const [game, setGame] = useState<IGame>({
		cards: getCards(diff),
	});

	console.log(game.cards);

	const setGameTime = (time: string): void => {
		setGame({ ...game, time: time });
	};

	return (
		<div className="game-screen">
			<header className="game-screen__header">
				<Timer setGameTime={setGameTime} />
				<RestartButton restart={restart} />
			</header>
			<section className="game-screen__playfield">
				<PlayField game={game} />
			</section>
		</div>
	);
};

export default GameScreen;
