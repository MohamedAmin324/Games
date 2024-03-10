import { useEffect, useState } from 'react';
import FormInput from './components/FormInput';
import { modeOptions, signOptions, turnsOptions } from './input-data';

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

	const [settings, setSettings] = useState({
		mode: '',
		userTurn: true,
		sign: '',
	});

	const updateSettings = (userInput) =>
		setSettings({ ...settings, ...userInput });


	function handleClick(e) {
		const { mode, sign, userTurn: isUserTurn } = settings;

		if (mode === 'single-player') {
			if (!isUserTurn) return;
		}
		if (sign === '') return;
		if (gameState.every(({ sign }) => sign !== '')) return;

		const itemIndex = e.target.dataset.index;
		gameState[itemIndex].sign = sign;
		gameState[itemIndex].colorValue = sign === 'X' ? 'red' : 'blue';
		setGameState([...gameState]);
		setSettings({
			...settings,
			sign: sign === 'X' ? 'O' : 'X',
			userTurn: false,
		});
	}

	useEffect(() => {
		const { mode, sign, userTurn: isUserTurn } = settings;

		if (mode !== 'single-player') return;
		if (sign === '') return;
		if (isUserTurn) return;
		if (gameState.every(({ sign }) => sign !== '')) return;
		
		let computerChoice;
		do {
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice].sign !== '');

		setTimeout(() => {
			gameState[computerChoice].sign = sign;
			gameState[computerChoice].colorValue = sign === 'X' ? 'red' : 'blue';
			setGameState([...gameState]);
			setSettings({
				...settings,
				sign: sign === 'X' ? 'O' : 'X',
				userTurn: true,
			});
		}, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	return (
		<>
			<FormInput
				formLabel='choose a play mode'
				options={modeOptions}
				updateSettings={updateSettings}
			/>
			{settings.mode === 'single-player' && (
				<FormInput
					formLabel='Go First'
					options={turnsOptions}
					updateSettings={updateSettings}
				/>
			)}
			<FormInput
				formLabel='choose a sign:'
				updateSettings={updateSettings}
				options={signOptions}
			/>
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
