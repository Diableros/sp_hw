import React, { useState } from 'react';

interface IStartScreen {
	setDifficult: (value: number) => void;
}

const StartScreen: React.FC<IStartScreen> = ({ setDifficult }) => {
	const [diffButton, setDiffButton] = useState<number>(0);

	const buttonsArr: number[] = [1, 2, 3];

	const clickDiffButtonHandler = (btn: number): void => {
		setDiffButton(btn);
	};

	const clickStartButtonHandler = (): void => {
		if (diffButton === 0) return;
		setDifficult(diffButton);
	};

	return (
		<div className="start-screen">
			<h1 className="start-screen__header">Выбери сложность</h1>
			<div className="start-screen__difficult-box">
				{buttonsArr.map((btn) => {
					return (
						<div
							className="start-screen__difficult-button"
							key={btn}
							onClick={() => clickDiffButtonHandler(btn)}
						>
							{diffButton === btn && (
								<div
									className={'start-screen__difficult-button--active'}
								></div>
							)}
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
