import React, { useState } from 'react';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';

const App: React.FC = () => {
	console.log('Render App');
	const [diff, setDiff] = useState<number>(0);

	return (
		<main className="main">
			{diff ? (
				<GameScreen diff={diff} restart={() => setDiff(0)} />
			) : (
				<StartScreen setDifficult={setDiff} />
			)}
		</main>
	);
};

export default App;
