import { useState } from 'react';
import PlayField from '../components/PlayField';
import RestartButton from '../components/RestartButton';
import Timer from '../components/Timer';

type GameScreenType = {
	diff: number;
	restart: () => void;
};

const GameScreen = ({ diff, restart }: GameScreenType): JSX.Element => {
	const [timerStop, setTimerStop] = useState<boolean>(false);
	const [gameTime, setGameTime] = useState<string>('');

	return (
		<div className="game-screen">
			<header className="game-screen__header">
				<Timer getTime={setGameTime} timerStop={timerStop} />
				<RestartButton restart={restart} title={'Начать заново'} />
			</header>
			<section className="game-screen__playfield">
				<PlayField
					diff={diff}
					restart={restart}
					gameTime={gameTime}
					stopTimer={setTimerStop}
				/>
			</section>
		</div>
	);
};

export default GameScreen;
