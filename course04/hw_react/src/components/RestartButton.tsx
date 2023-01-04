import React from 'react';

interface IButton {
	restart: (diff: number) => void;
}

const RestartButton: React.FC<IButton> = ({ restart }) => {
	return (
		<button className="game-screen__restart" onClick={() => restart(0)}>
			Начать заново
		</button>
	);
};

export default RestartButton;
