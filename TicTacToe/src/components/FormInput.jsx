// eslint-disable-next-line react/prop-types
export default function FormInput({ formLabel, options, updateSettings }) {
	const handleClick = (e) => {
		const selectedSettings = ['true', 'false'].includes(e.target.value)
			? e.target.value === 'true'
			: e.target.value;
		const changedParameter = e.target.name;
		const updatedInfo = {};
		updatedInfo[changedParameter] = selectedSettings;
		updateSettings(updatedInfo);
	};

	return (
		<div className='container form-container'>
			{formLabel}
			<br />
			{/* eslint-disable-next-line react/prop-types*/}
			{options.map(({ htmlFor, labelText, ...inputSettings }, index) => (
				<label key={index} htmlFor={htmlFor}>
					{labelText}
					<input onChange={handleClick} type='radio' {...inputSettings} />
				</label>
			))}
		</div>
	);
}
