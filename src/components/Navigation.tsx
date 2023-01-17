import NumberInput from './NumberInput';
import Table from './Table';
import Pagination from './Pagination';
import './Navigation.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 5;

interface FetchProps {
	fetchFromApiToContext: (
		page: string,
		itemsPerPage: string,
		idToFilter: string
	) => void;
}

function Navigation(props: FetchProps) {
	const { fetchFromApiToContext } = props;
	const [idToFilter, setIdToFilter] = useState('');

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const currentPage = Number(query.get('page') || '1');

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
			<Table />
			<Pagination currentPage={currentPage} />
		</>
	);
}

export default Navigation;
