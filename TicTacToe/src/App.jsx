import { useRef, useState } from 'react';
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

	const signRef = useRef('');

	const updateSignRef = (userInput) => (signRef.current = userInput);

	function handleClick(e) {
		const itemIndex = e.target.dataset.index;
		if (signRef.current === '') return;
		if (gameState.every((signValue) => signValue !== '')) return;
		gameState[itemIndex] = signRef.current;
		setGameState([...gameState]);
		signRef.current = signRef.current === 'X' ? 'O' : 'X';
	}

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
