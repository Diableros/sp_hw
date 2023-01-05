import React, { useState, useEffect } from 'react';

interface IPlayCard {
	card: string;
	setMove: (card: string) => void;
}

const PlayCard: React.FC<IPlayCard> = (props): JSX.Element => {
	const { card, setMove } = props;

	const [showCard, setShowCard] = useState(true);

	useEffect(() => {
		setTimeout(() => setShowCard(false), 5000);
	}, []);

	return (
		<div
			className="playfield__card"
			style={{
				background: `url(../../img/${card}.svg)`,
			}}
			onClick={() => {
				setShowCard(true);
				setMove(card);
			}}
		>
			{!showCard && <div className="playfield__card-shirt"></div>}
		</div>
	);
};

export default PlayCard;
