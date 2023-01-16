import { useEffect, useState } from 'react';
import './App.css';
import NumberInput from './components/NumberInput';
import Pagination from './components/Pagination';
import Table from './components/Table';
import { ProductContext, apiUrl, ApiInterface } from './productContext';
import humps from 'humps';

const ITEMS_PER_PAGE = 5;

function App() {
	const [productContext, setProductContext] = useState<ApiInterface | null>(
		null
	);

	const fetchFromApiToContext = async () => {
		const response = await fetch(
			apiUrl + new URLSearchParams({ per_page: ITEMS_PER_PAGE.toString() })
		);
		const jsonData = await response.json();
		const camelizedJsonData = humps.camelizeKeys(jsonData) as ApiInterface;

		setProductContext(camelizedJsonData);
	};

	useEffect(() => {
		fetchFromApiToContext();
	}, []);

	return (
		<ProductContext.Provider value={productContext}>
			<NumberInput />
			<Table />
			<Pagination />
		</ProductContext.Provider>
	);
}

export default App;
