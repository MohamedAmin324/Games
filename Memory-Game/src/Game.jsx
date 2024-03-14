import { useState } from 'react';
import { generateGameList } from './data';

export default function Game() {
	const [list, setList] = useState(generateGameList);

	return (
		<>
			{list.map((img, index) => (
				<div className='hidden' key={index}>
					<img width='80px' src={img} />
				</div>
			))}
		</>
	);
}
