import { render, screen } from '@testing-library/react';
import ModalBox from '../components/ModalBox';

describe('ModalBox component', () => {
	const testItem = {
		id: 999,
		name: 'test name',
		year: 1346,
		color: '#ABCDEF',
		pantoneValue: 'test value',
	};

	render(<ModalBox product={testItem} />);

	it('should contain all fields of a single item from the API', () => {
		const id = screen.getByText(/999/);
		const name = screen.getByText(/test name/);
		const year = screen.getByText(/1346/);
		const color = screen.getByText(/#ABCDEF/);
		const pantoneValue = screen.getByText(/test value/);

		expect(id).toBeInTheDocument();
		expect(name).toBeInTheDocument();
		expect(year).toBeInTheDocument();
		expect(color).toBeInTheDocument();
		expect(pantoneValue).toBeInTheDocument();
	});
});
