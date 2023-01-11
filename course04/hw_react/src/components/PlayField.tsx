import { useState } from 'react';
import { IGame } from '../types/game';
import PlayCard from './PlayCard';
import getCards from '../helpers/getCards';
import Modal from './Modal';

const cardsMultiplierForCalc = 2;

type PlayFieldType = {
	diff: number;
	restart: () => void;
	gameTime: string;
	stopTimer: (value: boolean) => void;
};

type GameStatusType = 'game' | 'win' | 'lose';

const PlayField = ({
	diff,
	restart,
	gameTime,
	stopTimer,
}: PlayFieldType): JSX.Element => {
	console.log('render PlayField');

	const [gameStatus, setGameStatus] = useState<GameStatusType>('game');

	let game: IGame = {
		cards: getCards(diff),
		cardsOpen: 0,
		prevCard: undefined,
	};

	const calcGridColumns = Math.floor(
		Math.sqrt(game.cards.length * cardsMultiplierForCalc)
	);

	const setMove = (clickedCard: string): void => {
		// если открытой карты не было
		if (!game.prevCard) {
			game = {
				// то устанавливаем
				...game,
				prevCard: clickedCard,
				cardsOpen: game.cardsOpen + 1,
			};
		} else if (game.prevCard === clickedCard) {
			// если предущая карта задана и равна текущей
			// чистим предудущую карту
			game = { ...game, prevCard: undefined, cardsOpen: game.cardsOpen + 1 };
			// проверяем, если все карты открыты, то меняем стэйт
			if (game.cards.length === game.cardsOpen) setGameStatus('win');
		} else {
			setGameStatus('lose'); // если карты не равны, то ставим проигрыш
		}
	};

	return (
		<div
			className="playfield__box"
			style={{
				gridTemplateColumns: `repeat(${calcGridColumns}, 1fr)`,
			}}
		>
			{game.cards.map((card, index) => (
				<PlayCard key={index} card={card} setMove={setMove} />
			))}
			{gameStatus !== 'game' ? (
				<Modal
					restart={restart}
					gameTime={gameTime}
					gameStatus={gameStatus}
					stopTimer={stopTimer}
				/>
			) : null}
		</div>
	);
};

export default PlayField;
