import { useState, useEffect } from 'react';

type PlayCardType = {
	card: string;
	setMove: (card: string) => void;
};

const PlayCard = ({ card, setMove }: PlayCardType): JSX.Element => {
	const [showCard, setShowCard] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShowCard(false), 5000);
		return () => clearTimeout(timer);
	}, []);

	const onClickCardHandler = (): void => {
		setShowCard(true);
		setMove(card);
	};

	return (
		<div className="playfield__card">
			<div
				className="playfield__card-face"
				style={{
					background: `url(../../img/${card}.svg)`,
				}}
			/>
			{!showCard ? (
				<div
					className="playfield__card-shirt"
					onClick={onClickCardHandler}
				/>
			) : null}
		</div>
	);
};

export default PlayCard;
