import React, { useEffect, useState } from 'react';
import getPadTime from '../helpers/getPadTime';

interface ITimer {
	setGameTime: (time: string) => void;
}

const Timer: React.FC<ITimer> = () => {
	// console.log('Render Timer');
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((time) => time + 1);
		}, 1000);
		return () => clearInterval(interval);
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
