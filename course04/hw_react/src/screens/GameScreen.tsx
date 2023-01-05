import React, { useState } from 'react';
import PlayField from '../components/PlayField';
import RestartButton from '../components/RestartButton';
import Timer from '../components/Timer';

interface IGameScreen {
	diff: number;
	restart: (value: number) => void;
}

const GameScreen: React.FC<IGameScreen> = (props) => {
	const { diff, restart } = props;

	const [timerStop, setTimerStop] = useState(false);
	const [gameTime, setGameTime] = useState('');

	const getTime = (time: string): void => {
		setGameTime(time);
	};

	const stopTimer = (value: boolean) => {
		setTimerStop(value);
	};

	return (
		<div className="game-screen">
			<header className="game-screen__header">
				<Timer getTime={getTime} timerStop={timerStop} />
				<RestartButton restart={restart} title={'Начать заново'} />
			</header>
			<section className="game-screen__playfield">
				<PlayField
					diff={diff}
					restart={restart}
					gameTime={gameTime}
					stopTimer={stopTimer}
				/>
			</section>
		</div>
	);
};

export default GameScreen;
