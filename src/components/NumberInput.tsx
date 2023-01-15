import { useState } from 'react';
import './NumberInput.css';

function NumberInput() {
	const [idToFilter, setIdToFilter] = useState('');

	return (
		<div className='number-input'>
			<form className='number-input-field'>
				<label htmlFor='filter-by-id'>Filter by id:</label>
				<input
					id='filter-by-id'
					type='text'
					value={idToFilter}
					onChange={(event) => setIdToFilter(event.target.value)}
				/>
			</form>
		</div>
	);
}

export default NumberInput;
