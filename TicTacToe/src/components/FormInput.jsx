// eslint-disable-next-line react/prop-types
export default function FormInput({ formLabel, options, updateInfo }) {
	const handleClick = (e) => updateInfo(e.target.value);

	return (
		<div className='container form-container'>
			{formLabel}
			<br />
			{/* eslint-disable-next-line react/prop-types*/}
			{options.map(({ htmlFor, labelText, ...inputSettings }, index) => (
				<label key={index} htmlFor={htmlFor}>
					{labelText}
					<input onChange={handleClick} type="radio" {...inputSettings} />
				</label>
			))}
		</div>
	);
}
