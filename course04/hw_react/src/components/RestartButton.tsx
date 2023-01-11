type ButtonType = {
	restart: () => void;
	title: string;
};

const RestartButton = ({ restart, title }: ButtonType): JSX.Element => {
	return (
		<button className="game-screen__restart" onClick={restart}>
			{title}
		</button>
	);
};

export default RestartButton;
