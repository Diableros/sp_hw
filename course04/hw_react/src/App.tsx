import React, { useState } from 'react';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';

const App: React.FC = () => {
	const [game, setGame] = useState({});

	const setDifficult = (value: number): void => {
		console.log(`Difficulty ${value} selected`);

		if (value) setGame({ ...game, difficult: value });
	};

	return (
		<main className="main">
			{game.hasOwnProperty('difficult') ? (
				<GameScreen />
			) : (
				<StartScreen setDifficult={setDifficult} />
			)}
		</main>
	);
};

export default App;
