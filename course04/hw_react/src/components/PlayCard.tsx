import React from 'react';

interface IPlayCard {
	card: string;
}

const PlayCard: React.FC<IPlayCard> = (props): JSX.Element => {
	const { card } = props;
	return (
		<div
			className="playfield__card"
			style={{
				background: `url(../../img/${card}.svg)`,
			}}
		></div>
	);
};

export default PlayCard;
