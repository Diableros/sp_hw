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
		<div className="playfield__card">
			<div
				className="playfield__card-face"
				style={{
					background: `url(../../img/${card}.svg)`,
				}}
			/>
			{!showCard && (
				<div
					className="playfield__card-shirt"
					onClick={() => {
						setShowCard(true);
						setMove(card);
						console.log('Click by card!');
					}}
				/>
			)}
		</div>
	);
};

export default PlayCard;
