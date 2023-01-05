import React from 'react';

interface IButton {
	restart: (diff: number) => void;
	title: string;
}

const RestartButton: React.FC<IButton> = ({ restart, title }) => {
	return (
		<button className="game-screen__restart" onClick={() => restart(0)}>
			{title}
		</button>
	);
};

export default RestartButton;
