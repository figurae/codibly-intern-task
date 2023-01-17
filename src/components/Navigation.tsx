import NumberInput from './NumberInput';
import Table from './Table';
import Pagination from './Pagination';
import './Navigation.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 5;

interface FetchProps {
	fetchFromApiToContext: (page: string, itemsPerPage: string) => void;
}

function Navigation(props: FetchProps) {
	const { fetchFromApiToContext } = props;
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const currentPage = parseInt(query.get('page') || '1');

	useEffect(() => {
		fetchFromApiToContext(currentPage.toString(), ITEMS_PER_PAGE.toString());
	}, [currentPage, fetchFromApiToContext]);

	return (
		<>
			<NumberInput />
			<Table />
			<Pagination currentPage={currentPage} />
		</>
	);
}

export default Navigation;
