import { useEffect, useRef, useState } from 'react';
import FormInput from './components/FormInput';

import {
	DEFAULT_SETTINGS,
	modeOptions,
	signOptions,
	turnsOptions,
} from './input-data';

import {
	checkGameStatus,
	checkLineStatus,
	testColumns,
	testDiagonals,
	testRows,
} from './util';

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

	const [settings, setSettings] = useState(DEFAULT_SETTINGS);

	const userSign = useRef('');
	const setUserSign = (dataInput) => (userSign.current = dataInput);

	const [result, setResult] = useState('');

	const updateSettings = (userInput) =>
		setSettings({ ...settings, ...userInput });

	function handleClick({ target: { innerText, dataset } }) {
		const { mode, userTurn } = settings;

		if (gameState.every(({ sign }) => sign !== '')) return;
		if (innerText !== '') return;

		if (mode === '') return;

		if (mode === 'single-player') {
			if (!userTurn) return;
		}
		if (userSign.current === '') return;

		const itemIndex = dataset.index;
		gameState[itemIndex].sign = userTurn
			? userSign.current
			: userSign.current === 'X'
			? 'O'
			: 'X';
		gameState[itemIndex].colorValue =
			gameState[itemIndex].sign === 'X' ? 'red' : 'blue';
		setGameState([...gameState]);
		setSettings({
			...settings,
			userTurn: !userTurn,
		});
	}

	useEffect(() => {
		const { mode, userTurn } = settings;

		if (gameState.every(({ sign }) => sign !== '')) return;

		if (mode === '2-players') return;
		if (userSign.current === '') return;
		if (userTurn) return;

		let computerChoice;
		do {
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice].sign !== '');

		const timer = setTimeout(() => {
			gameState[computerChoice].sign = userSign.current === 'X' ? 'O' : 'X';
			gameState[computerChoice].colorValue =
				gameState[computerChoice].sign === 'X' ? 'red' : 'blue';
			setGameState([...gameState]);
			setSettings({
				...settings,
				userTurn: true,
			});
		}, 400);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	useEffect(() => {
		if (gameState.every(({ sign }) => sign === '')) return;
		if (!checkGameStatus(gameState)) return;
		const rowsStatus = testRows(gameState);
		const columnsStatus = testColumns(gameState);
		const diagonalStatus = testDiagonals(gameState);

		columnsStatus.forEach((winnerSign) => {
			if (
				result === '' &&
				checkLineStatus(columnsStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
				return;
			}

			if (!winnerSign) return;

			setResult(
				`${
					winnerSign === userSign.current
						? settings.mode === 'single-player'
							? 'You win'
							: 'Player 1 wins'
						: settings.mode === 'single-player'
						? 'computer wins'
						: 'player 2 wins'
				}`
			);

			setSettings(DEFAULT_SETTINGS);
		});

		diagonalStatus.forEach((winnerSign) => {
			if (
				result === '' &&
				checkLineStatus(columnsStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
				return;
			}

			if (!winnerSign) return;

			setResult(
				`${
					winnerSign === userSign.current
						? settings.mode === 'single-player'
							? 'You win'
							: 'Player 1 wins'
						: settings.mode === 'single-player'
						? 'computer wins'
						: 'player 2 wins'
				}`
			);

			setSettings(DEFAULT_SETTINGS);
		});

		rowsStatus.forEach((winnerSign) => {
			if (
				result === '' &&
				checkLineStatus(columnsStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
				return;
			}

			if (!winnerSign) return;

			setResult(
				`${
					winnerSign === userSign.current
						? settings.mode === 'single-player'
							? 'You win'
							: 'Player 1 wins'
						: settings.mode === 'single-player'
						? 'Computer wins'
						: 'Player 2 wins'
				}`
			);

			setSettings(DEFAULT_SETTINGS);
		});
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
				setUserSign={setUserSign}
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
			<p>{result}</p>
		</>
	);
}
