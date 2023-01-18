import NumberInput from './NumberInput';
import Table from './Table';
import Pagination from './Pagination';
import './Navigation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search);

	const queriedPage = Number(query.get('page'));
	const currentPage = isNaN(queriedPage) || queriedPage === 0 ? 1 : queriedPage;

	const queriedId = query.get('id');

	useEffect(() => {
		fetchFromApiToContext(
			currentPage.toString(),
			ITEMS_PER_PAGE.toString(),
			idToFilter.toString()
		);
	}, [idToFilter, currentPage, fetchFromApiToContext]);

	useEffect(() => {
		if (queriedId !== null && !isNaN(Number(queriedId))) {
			setIdToFilter(queriedId);
		}

		if (idToFilter !== '') {
			window.history.pushState({}, '', `/?id=${idToFilter}`);
		} else if (idToFilter === '' && queriedPage === 0) {
			navigate('/');
		} else if (idToFilter === '' && queriedPage !== 0) {
			navigate(`/?page=${currentPage}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idToFilter]);

	return (
		<Stack alignItems={'center'} paddingTop={2} spacing={2}>
			<NumberInput idToFilter={idToFilter} setIdToFilter={setIdToFilter} />

			{errorMessage !== null ? (
				<Alert severity='error'>{errorMessage}</Alert>
			) : (
				<Table />
			)}

			<Pagination currentPage={currentPage} />
		</Stack>
	);
}

export default Navigation;
