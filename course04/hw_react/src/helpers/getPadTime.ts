const getPadTime = (time: number): string => {
	return time.toString().padStart(2, '0');
};

export default getPadTime;
