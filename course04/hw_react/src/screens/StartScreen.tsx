import { useState } from 'react';

type StartScreenType = {
	setDifficult: (value: number) => void;
};

const difficultButtonsArr: number[] = [1, 2, 3];

const StartScreen = ({ setDifficult }: StartScreenType): JSX.Element => {
	const [diffButton, setDiffButton] = useState<number>(0);

	const clickStartButtonHandler = (): void => {
		if (diffButton === 0) return;
		setDifficult(diffButton);
	};

	return (
		<div className="start-screen">
			<h1 className="start-screen__header">Выбери сложность</h1>
			<div className="start-screen__difficult-box">
				{difficultButtonsArr.map((btn) => {
					return (
						<div
							className="start-screen__difficult-button"
							key={btn}
							onClick={() => setDiffButton(btn)}
						>
							{diffButton === btn ? (
								<div
									className={'start-screen__difficult-button--active'}
								></div>
							) : null}
							{btn}
						</div>
					);
				})}
			</div>
			<button
				className="start-screen__start-button"
				onClick={() => clickStartButtonHandler()}
			>
				Старт
			</button>
		</div>
	);
};

export default StartScreen;
