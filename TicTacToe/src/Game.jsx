import { useEffect, useState } from 'react';
import FormInput from './components/FormInput';
import { modeOptions, signOptions, turnsOptions } from './input-data';
import { checkGameStatus, testColumns, testDiagonals, testRows } from './util';

export default function Game() {
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

	// const [result, setResult] = useState();

	const updateSettings = (userInput) =>
		setSettings({ ...settings, ...userInput });

	function handleClick({ target: { innerText, dataset } }) {
		const { mode, sign, userTurn } = settings;

		if (gameState.every(({ sign }) => sign !== '')) return;
		if (innerText !== '') return;

		if (mode === '') return;

		if (mode === 'single-player') {
			if (!userTurn) return;
		}
		if (sign === '') return;

		const itemIndex = dataset.index;
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
		const { mode, sign, userTurn } = settings;

		if (gameState.every(({ sign }) => sign !== '')) return;

		if (mode !== 'single-player') return;
		if (sign === '') return;
		if (userTurn) return;

		let computerChoice;
		do {
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice].sign !== '');

		const timer = setTimeout(() => {
			gameState[computerChoice].sign = sign;
			gameState[computerChoice].colorValue = sign === 'X' ? 'red' : 'blue';
			setGameState([...gameState]);
			setSettings({
				...settings,
				sign: sign === 'X' ? 'O' : 'X',
				userTurn: true,
			});
		}, 400);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	useEffect(() => {
		if (gameState.every(({ sign }) => sign === '')) return;
		if (!checkGameStatus(gameState)) return;
		console.log(
			testColumns(gameState),
			testDiagonals(gameState),
			testRows(gameState)
		);
	}, [gameState]);

	return (
		<>
			<FormInput
				formLabel='choose a play mode:'
				options={modeOptions}
				updateSettings={updateSettings}
			/>
			{settings.mode === 'single-player' && (
				<FormInput
					formLabel='Do you want to go first?:'
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
