import { useEffect, useRef, useState } from 'react';
import FormInput from './components/FormInput';

export default function App() {
	const [gameState, setGameState] = useState([
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	]);

	const [isUserTurn, setUserTurn] = useState(true);

	const signRef = useRef('');

	const updateSignRef = (userInput) => (signRef.current = userInput);

	function handleClick(e) {
		if (!isUserTurn) return;
		if (signRef.current === '') return;
		if (gameState.every((signValue) => signValue !== '')) return;

		const itemIndex = e.target.dataset.index;
		gameState[itemIndex] = signRef.current;
		setGameState([...gameState]);
		signRef.current = signRef.current === 'X' ? 'O' : 'X';
		setUserTurn(false);
	}

	useEffect(() => {
		if (isUserTurn) return;
		if (gameState.every((signValue) => signValue !== '')) return;
		let computerChoice;
		do {
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice] !== '');

		setTimeout(() => {
			gameState[computerChoice] = signRef.current;
			setGameState([...gameState]);
			signRef.current = signRef.current === 'X' ? 'O' : 'X';
			setUserTurn(true);
		}, 500);
	}, [isUserTurn]);

	return (
		<>
			<FormInput updateSignRef={updateSignRef} />
			<div className='container'>
				{gameState.map((value, index) => (
					<div
						onClick={handleClick}
						className='item'
						data-index={index}
						key={index}
					>
						{value}
					</div>
				))}
			</div>
		</>
	);
}
