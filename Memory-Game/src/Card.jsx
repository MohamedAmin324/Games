/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { alreadyClicked, isEqual } from './data';

export default function Card({ imgUrl, matchObj, updateMatchState }) {
	const { firstCard, secondCard } = matchObj;
	const divRef = useRef(null);
	const [isHidden, setIsHidden] = useState(true);

	useEffect(() => {
		setIsHidden(divRef.current?.classList.contains('hidden'));
	}, [matchObj]);

	return (
		<div
			className={isHidden ? 'hidden' : ''}
			ref={divRef}
			onClick={({ target }) => {
				if (alreadyClicked(target, firstCard, secondCard)) return;

				setIsHidden((prev) => !prev);
				const initialValue = firstCard;

				const obj1 = {
					imgUrl: initialValue.imgUrl ?? imgUrl,
					element: initialValue.element ?? target,
				};

				const firstCardEqualStatus = isEqual(obj1, initialValue);

				const updatedStatus = {
					firstCard: obj1,
					secondCard: {
						imgUrl: firstCardEqualStatus ? imgUrl : null,
						element: firstCardEqualStatus ? target : null,
					},
				};

				updateMatchState({ ...updatedStatus });
			}}
		>
			<img width='80px' src={imgUrl} />
		</div>
	);
}
