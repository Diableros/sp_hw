const ranks: string[] = ['6', '7', '8', 'T', 'Q', 'K', 'J', 'A'];
const suits: string[] = ['H', 'C', 'S', 'D'];
const diffMultiplier: number = 3;

const getCards = (diff: number): string[] => {
	const pairsQty: number = diff * diffMultiplier;

	const allCards: string[] = ranks
		.map((rank) => suits.map((suit) => rank + suit))
		.flat();

	const playerPairs: Set<string> = new Set();

	while (playerPairs.size < pairsQty) {
		const currentCard: string =
			allCards[Math.floor(Math.random() * allCards.length)];

		playerPairs.add(currentCard);
	}

	const playerCards: string[] = [];

	Array.from(playerPairs, (elem) => playerCards.push(elem, elem));

	const shuffledPlayerCards: string[] = playerCards.sort(
		() => Math.random() - 0.5
	);

	return shuffledPlayerCards;
};

export default getCards;
