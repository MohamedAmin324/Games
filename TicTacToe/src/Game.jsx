import { useEffect, useRef, useState } from 'react';
import FormInput from './components/FormInput';

import {
	DEFAULT_SETTINGS,
	INITIAL_GAME_STATE,
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
	const [clicked, setClicked] = useState(false);

	const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

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
			console.log(computerChoice);
			computerChoice = Math.floor(Math.random() * 8);
		} while (gameState[computerChoice].sign !== '');

		const timer = setTimeout(() => {
			gameState[computerChoice].sign = userSign.current === 'X' ? 'O' : 'X';
			gameState[computerChoice].colorValue =
				gameState[computerChoice].sign === 'X' ? 'red' : 'blue';
			setGameState([...gameState]);
			setSettings({
				...settings,
				userTurn: !userTurn,
			});
		}, 400);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	useEffect(() => {
		if (gameState.every(({ sign }) => sign === '')) return;
		if (gameState.every(({ sign }) => sign !== '') && result !== '') return;
		if (!checkGameStatus(gameState)) return;
		const rowsStatus = testRows(gameState);
		const columnsStatus = testColumns(gameState);
		const diagonalStatus = testDiagonals(gameState);

		columnsStatus.forEach((winnerSign) => {
			if (winnerSign) {
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
			}

			if (
				result === '' &&
				checkLineStatus(columnsStatus) &&
				checkLineStatus(rowsStatus) &&
				checkLineStatus(diagonalStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
				return;
			}
		});

		diagonalStatus.forEach((winnerSign) => {
			if (winnerSign) {
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
				return;
			}

			if (
				result === '' &&
				checkLineStatus(diagonalStatus) &&
				checkLineStatus(rowsStatus) &&
				checkLineStatus(diagonalStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
			}
		});

		rowsStatus.forEach((winnerSign) => {
			if (winnerSign) {
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
			}

			if (
				result === '' &&
				checkLineStatus(rowsStatus) &&
				checkLineStatus(rowsStatus) &&
				checkLineStatus(diagonalStatus) &&
				gameState.every(({ sign }) => sign !== '')
			) {
				setResult('It is a Draw');
				setSettings(DEFAULT_SETTINGS);
			}
		});
	}, [gameState]);

	useEffect(() => {
		if (!clicked) return;
		const formInputs = document.querySelectorAll('input');
		formInputs.forEach((input) => (input.checked = false));
		setClicked(false);
	}, [clicked]);

	return (
		<>
			<div>
				<h1 className='oswald'>Tic Tac Toe</h1>
				<FormInput
					formLabel='Number of players:'
					options={modeOptions}
					updateSettings={updateSettings}
				/>
				{settings.mode === 'single-player' && (
					<FormInput
						formLabel='Go first?:'
						options={turnsOptions}
						updateSettings={updateSettings}
					/>
				)}
				<FormInput
					formLabel='Choose a sign:'
					setUserSign={setUserSign}
					updateSettings={updateSettings}
					options={signOptions}
				/>
				<p className='result-panel'>{result}</p>
				<ul className='info-panel'>
					<li>All the options must be filled before the game can begin</li>
					<li>
						You can choose between 2 players & 1 player, going with 1 player
						will make you play against the computer
					</li>
					<li>The game may inaccurate final results</li>
					<li>
						In 2 players mode, Whoever chooses a sign is automatically the 1
						player
					</li>
				</ul>
			</div>

			<div className='container grid-container'>
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
				<div className='final-item'>
					<button
						className='reset-btn'
						onClick={() => {
							userSign.current = '';
							setSettings(DEFAULT_SETTINGS);
							setGameState([
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
							setResult('');
							setClicked(true);
						}}
					>
						Reset Game
					</button>
				</div>
			</div>
		</>
	);
}
