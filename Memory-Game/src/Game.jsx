import { useEffect, useState } from 'react';
import { INITIAL_MATCH_STATUS, generateGameList } from './data';
import Card from './Card';

export default function Game() {
	const [list, setList] = useState(() => generateGameList());
	const [matchObj, setMatchObj] = useState(INITIAL_MATCH_STATUS);

	const updateMatchState = (newState) =>
		setMatchObj((prev) => {
			return { ...prev, ...newState };
		});

	useEffect(() => {
		if (!matchObj.firstCard.element || !matchObj.secondCard.element) return;
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
		}, 1000);

		return () => clearTimeout(timer);
	}, [matchObj]);

	return (
		<div className='game-container'>
			{list.map((img, index) => (
				<Card
					matchObj={matchObj}
					key={index}
					imgUrl={img}
					updateMatchState={updateMatchState}
				/>
			))}
		</div>
	);
}
