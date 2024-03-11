/* eslint-disable react/prop-types */
export default function FormInput({
	formLabel,
	options,
	updateSettings,
	setUserSign,
}) {
	const handleClick = ({ target: { name, value } }) => {
		const selectedSettings = ['true', 'false'].includes(value)
			? value === 'true'
			: value;
		const changedParameter = name;
		const updatedInfo = {
			[changedParameter]: selectedSettings,
		};
		updateSettings(updatedInfo);

		name === 'sign' && setUserSign(value);
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
