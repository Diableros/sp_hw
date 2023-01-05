import React, { useState } from 'react';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';

const App: React.FC = () => {
	console.log('Render App');
	const [diff, setDiff] = useState<number>(0);

	const setDifficult = (value: number): void => {
		setDiff(value);
	};

	return (
		<main className="main">
			{diff === 0 ? (
				<StartScreen setDifficult={setDifficult} />
			) : (
				<GameScreen diff={diff} restart={setDifficult} />
			)}
		</main>
	);
};

export default App;
