import NumberInput from './NumberInput';
import Table from './Table';
import Pagination from './Pagination';
import './Navigation.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const ITEMS_PER_PAGE = 5;

interface NavigationProps {
	fetchFromApiToContext: (
		page: string,
		itemsPerPage: string,
		idToFilter: string
	) => void;
	errorMessage: string | null;
}

function Navigation(props: NavigationProps) {
	const { fetchFromApiToContext, errorMessage } = props;
	const [idToFilter, setIdToFilter] = useState('');

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queriedPage = Number(query.get('page'));
	const currentPage = isNaN(queriedPage) || queriedPage === 0 ? 1 : queriedPage;

	useEffect(() => {
		fetchFromApiToContext(
			currentPage.toString(),
			ITEMS_PER_PAGE.toString(),
			idToFilter.toString()
		);
	}, [idToFilter, currentPage, fetchFromApiToContext]);

	return (
		<>
			<NumberInput idToFilter={idToFilter} setIdToFilter={setIdToFilter} />

			{errorMessage !== null ? (
				<Alert severity='error'>{errorMessage}</Alert>
			) : (
				<Table />
			)}

			<Pagination currentPage={currentPage} />
		</>
	);
}

export default Navigation;
