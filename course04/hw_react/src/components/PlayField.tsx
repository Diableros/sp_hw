import React from 'react';
import { IGame } from '../types/game';
import PlayCard from './PlayCard';

interface IPlayField {
	game: IGame;
}

const PlayField: React.FC<IPlayField> = (props) => {
	const { game } = props;

	console.log(game);

	const cardsMultiplierForCalc = 2;

	const calcGridColumns = Math.floor(
		Math.sqrt(game.cards.length * cardsMultiplierForCalc)
	);

	return (
		<div
			className="playfield__box"
			style={{
				gridTemplateColumns: `repeat(${calcGridColumns}, 1fr)`,
			}}
		>
			{game.cards.map((card, index) => (
				<PlayCard key={index} card={card} />
			))}
		</div>
	);
};

export default PlayField;
