// eslint-disable-next-line react/prop-types
export default function FormInput({ updateSignRef }) {
	const handleClick = (e) => updateSignRef(e.target.value);

	return (
		<div className='container form-container'>
			choose your sign: <br />
			<label htmlFor='x-sign'>
				X:
				<input
					onChange={handleClick}
					id='x-sign'
					type='radio'
					name='sign'
					value='X'
				/>
			</label>
			<label htmlFor='o-sign'>
				O:
				<input
					onChange={handleClick}
					id='o-sign'
					type='radio'
					name='sign'
					value='O'
				/>
			</label>
		</div>
	);
}
