import './NumberInput.css';

interface FilterProps {
	idToFilter: string;
	setIdToFilter: (id: string) => void;
}

function NumberInput(props: FilterProps) {
	const { idToFilter, setIdToFilter } = props;

	return (
		<div className='number-input'>
			<form className='number-input-field' onSubmit={(e) => e.preventDefault()}>
				<label htmlFor='filter-by-id'>Filter by id:</label>
				<input
					id='filter-by-id'
					type='text'
					maxLength={2}
					value={idToFilter}
					onChange={(e) => {
						const numbersOnlyRegex = /^[0-9\b]+$/;
						const value = e.target.value;

						if (value === '' || numbersOnlyRegex.test(value)) {
							setIdToFilter(value);
						}
					}}
				/>
			</form>
		</div>
	);
}

export default NumberInput;
