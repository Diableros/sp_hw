const getCards = (diff: number): string[] => {
	const diffMultiplier: number = 3;
	const pairsQty: number = diff * diffMultiplier;

	// Массив рангов
	// T - Ten (чтоб всегда было два символа)
	const ranks: string[] = ['6', '7', '8', 'T', 'Q', 'K', 'J', 'A'];
	// Массив мастей
	// H - Hearts (червы)
	// C - Clubs (кресты)
	// S - Spades (пики)
	// D - Diamonds (бубны)
	const suits: string[] = ['H', 'C', 'S', 'D'];

	const allCards: string[] = [];

	for (let rank = 0; rank < ranks.length; rank++) {
		for (let suit = 0; suit < suits.length; suit++) {
			allCards.push(ranks[rank] + suits[suit]);
		}
	}

	const playerPairs: Set<string> = new Set();

	// генерим случайный набор неповторяющихся карт
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
