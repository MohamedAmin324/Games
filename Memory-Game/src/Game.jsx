import { useEffect, useState } from 'react';
import { INITIAL_MATCH_STATUS, generateGameList } from './util';
import Card from './Card';

export default function Game() {
	const [list, setList] = useState(() => generateGameList());
	const [moves, setMoves] = useState(0);
	const [matchObj, setMatchObj] = useState(INITIAL_MATCH_STATUS);
	const [forceReset, setForceReset] = useState(false);

	const updateMatchState = (newState) =>
		setMatchObj((prev) => {
			return { ...prev, ...newState };
		});

	useEffect(() => {
		if (!matchObj.firstCard.element || !matchObj.secondCard.element) return;
		setForceReset(false);
		if (
			matchObj.firstCard.element.classList.contains('hidden') ||
			matchObj.secondCard.element.classList.contains('hidden')
		)
			return;

		let timer = setTimeout(() => {
			const matchFound =
				matchObj.firstCard.imgUrl === matchObj.secondCard.imgUrl;
			matchObj.firstCard.element.classList.toggle('hidden', !matchFound);
			matchObj.secondCard.element.classList.toggle('hidden', !matchFound);

			matchObj.firstCard.element.classList.toggle('invisible', matchFound);
			matchObj.secondCard.element.classList.toggle('invisible', matchFound);

			setMatchObj({ ...INITIAL_MATCH_STATUS });
			setMoves((prev) => prev + 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [matchObj]);

	return (
		<>
			<h1>Memory Game</h1>
			<div className='game-container'>
				{list.map((img, index) => (
					<Card
						matchObj={matchObj}
						key={index}
						imgUrl={img}
						updateMatchState={updateMatchState}
						forceReset={forceReset}
					/>
				))}
			</div>
			<p className='moves-panel'>Number of Moves: {moves}</p>
			<button
				className='reset-btn'
				onClick={() => {
					setList(generateGameList());
					setMatchObj(INITIAL_MATCH_STATUS);
					setMoves(0);
					setForceReset(true);
				}}
			>
				Reset
			</button>
		</>
	);
}
