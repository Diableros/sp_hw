import { useEffect, useState } from 'react';
import getPadTime from '../helpers/getPadTime';

const MAX_GAME_TIME_MINUTES = 59;
const MAX_GAME_TIME_SECONDS = 59;

const maxGameTime = MAX_GAME_TIME_MINUTES * 60 + MAX_GAME_TIME_SECONDS;

type TimerType = {
	getTime: (time: string) => void;
	timerStop: boolean;
};

const Timer = ({ getTime, timerStop }: TimerType) => {
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			!timerStop && setTime((time) => (time < maxGameTime ? time + 1 : 0));
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [timerStop]);

	const min = getPadTime(Math.floor(time / 60));
	const sec = getPadTime(time % 60);

	useEffect(() => {
		if (timerStop) {
			getTime(min + '.' + sec);
		}
	});

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
