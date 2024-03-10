import { useEffect, useRef, useState } from 'react';
import FormInput from './components/FormInput';
import { signOptions } from './input-data';

export default function App() {
	const [gameState, setGameState] = useState([
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
		{ sign: '', colorValue: '' },
	]);

	const [isUserTurn, setUserTurn] = useState(true);

	const signRef = useRef('');

	const updateSignRef = (userInput) => (signRef.current = userInput);

	function handleClick(e) {
		if (!isUserTurn) return;
		if (signRef.current === '') return;
		if (gameState.every(({ sign }) => sign !== '')) return;

		const itemIndex = e.target.dataset.index;
		gameState[itemIndex].sign = signRef.current;
		gameState[itemIndex].colorValue = signRef.current === 'X' ? 'red' : 'blue';
		setGameState([...gameState]);
		signRef.current = signRef.current === 'X' ? 'O' : 'X';
		setUserTurn(false);
	}

	useEffect(() => {
		if (isUserTurn) return;
		if (gameState.every(({ sign }) => sign !== '')) return;
		let computerChoice;
		do {
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice].sign !== '');

		setTimeout(() => {
			gameState[computerChoice].sign = signRef.current;
			gameState[computerChoice].colorValue =
				signRef.current === 'X' ? 'red' : 'blue';
			setGameState([...gameState]);
			signRef.current = signRef.current === 'X' ? 'O' : 'X';
			setUserTurn(true);
		}, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserTurn]);

	return (
		<>
			<FormInput formLabel="choose a sign:" updateInfo={updateSignRef} options={signOptions} />
			<div className='container'>
				{gameState.map(({ sign, colorValue }, index) => (
					<div
						onClick={handleClick}
						className='item'
						data-index={index}
						key={index}
						style={{ color: colorValue }}
					>
						{sign}
					</div>
				))}
			</div>
		</>
	);
}
