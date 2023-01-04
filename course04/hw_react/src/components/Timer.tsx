import React, { useEffect, useState } from 'react';
import getPadTime from '../helpers/getPadTime';

interface ITimer {
	setGameTime: (time: string) => void;
}

const MAX_GAME_TIME_MINUTES = 59;
const MAX_GAME_TIME_SECONDS = 59;

const maxGameTime = MAX_GAME_TIME_MINUTES * 60 + MAX_GAME_TIME_SECONDS;

const Timer: React.FC<ITimer> = () => {
	// console.log('Render Timer');
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((time) => (time < maxGameTime ? time + 1 : 0));
		}, 1000);
		return () => {
			clearInterval(interval);
			console.log('Timer was cleared');
		};
	}, []);

	const min = getPadTime(Math.floor(time / 60));
	const sec = getPadTime(time % 60);

	return (
		<section className="game-screen__timer timer">
			<div className="timer__titles">
				<div className="timer__title">min</div>
				<div className="timer__title">sec</div>
			</div>
			<div className="timer__digits">
				{min}.{sec}
			</div>
		</section>
	);
};

export default Timer;
