import { useEffect } from 'react';
import RestartButton from './RestartButton';

type ModalPropsType = {
	restart: () => void;
	gameTime: string;
	gameStatus: 'win' | 'lose';
	stopTimer: (value: boolean) => void;
};

type GameStatusDecodeType = {
	win: string;
	lose: string;
};

const Modal = ({
	restart,
	gameTime,
	gameStatus,
	stopTimer,
}: ModalPropsType): JSX.Element => {
	useEffect(() => {
		stopTimer(true);
	});

	const backgroundImage: GameStatusDecodeType = {
		win: 'win.png',
		lose: 'lose.png',
	};

	const endGameTitle: GameStatusDecodeType = {
		win: 'Вы выиграли!',
		lose: 'Вы проиграли!',
	};

	return (
		<div className="modal">
			<div className="modal__content-box">
				<div
					className="modal__img"
					style={{
						background: `url(../../img/${backgroundImage[gameStatus]})`,
					}}
				/>
				<h1 className="modal__title">{endGameTitle[gameStatus]}</h1>
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
