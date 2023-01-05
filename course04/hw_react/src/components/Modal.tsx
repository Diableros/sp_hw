import React, { useEffect } from 'react';
import RestartButton from './RestartButton';

interface IModal {
	restart: (value: number) => void;
	gameTime: string;
	gameStatus: string;
	stopTimer: (value: boolean) => void;
}

const Modal: React.FC<IModal> = (props) => {
	const { restart, gameTime, gameStatus, stopTimer } = props;

	useEffect(() => {
		stopTimer(true);
	});

	return (
		<div className="modal">
			<div className="modal__content-box">
				<div
					className="modal__img"
					style={{ background: `url(../../img/${gameStatus}.png)` }}
				/>
				<h1 className="modal__title">
					{gameStatus === 'win' ? 'Вы выиграли!' : 'Вы проиграли!'}
				</h1>
				<div className="modal__time-box">
					<h1 className="modal__time-title">Затраченное время:</h1>
					<p className="modal__time">{gameTime}</p>
				</div>
				<RestartButton restart={restart} title={'Играть снова'} />
			</div>
		</div>
	);
};

export default Modal;
