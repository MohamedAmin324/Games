import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<h1>Memory Game</h1>
		<Game />
	</React.StrictMode>
);
