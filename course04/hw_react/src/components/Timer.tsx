import React from 'react';

interface ITimer {
	setGameTime: (time: string) => void;
}

const Timer: React.FC<ITimer> = () => {
	return (
		<section className="game-screen__timer timer">
			<div className="timer__titles">
				<div className="timer__title">min</div>
				<div className="timer__title">sec</div>
			</div>
			<div className="timer__digits">00.00</div>
		</section>
	);
};

export default Timer;
