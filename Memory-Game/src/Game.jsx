import { generateGameList } from './data';

export default function Game() {
	return <button onClick={() => console.log(generateGameList())}>click</button>;
}
