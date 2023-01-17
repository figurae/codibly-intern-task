import { Button, Stack, TextField } from '@mui/material';
import './NumberInput.css';

interface FilterProps {
	idToFilter: string;
	setIdToFilter: (id: string) => void;
}

function NumberInput(props: FilterProps) {
	const { idToFilter, setIdToFilter } = props;

	return (
		<Stack direction='row' spacing={2}>
			<TextField
				id='filter-by-id'
				type='text'
				inputProps={{ maxLength: 2 }}
				value={idToFilter}
				label='Filter by ID'
				autoFocus={true}
				onChange={(e) => {
					const numbersOnlyRegex = /^[0-9\b]+$/;
					const value = e.target.value;

					if (value === '' || numbersOnlyRegex.test(value)) {
						setIdToFilter(value);
					}
				}}
			/>
			<Button variant='contained' onClick={() => setIdToFilter('')}>
				Clear
			</Button>
		</Stack>
	);
}

export default NumberInput;
