import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ProductContext, apiUrl, ApiInterface } from './productContext';
import './App.css';
import { CssBaseline } from '@mui/material';
import humps from 'humps';

function App() {
	const [productContext, setProductContext] = useState<ApiInterface | null>(
		null
	);

	const fetchFromApiToContext = useCallback(
		async (page: string, itemsPerPage: string, idToFilter: string) => {
			const response =
				idToFilter === ''
					? await fetch(
							apiUrl +
								new URLSearchParams({
									per_page: itemsPerPage,
									page,
								})
					  )
					: await fetch(
							apiUrl +
								new URLSearchParams({
									id: idToFilter,
								})
					  );
			const jsonData = await response.json();
			const camelizedJsonData = humps.camelizeKeys(jsonData) as ApiInterface;

			if (!Array.isArray(camelizedJsonData.data)) {
				camelizedJsonData.data = [camelizedJsonData.data];
			}

			setProductContext(camelizedJsonData);
		},
		[]
	);

	return (
		<>
			<CssBaseline />
			<ProductContext.Provider value={productContext}>
				<BrowserRouter>
					<Routes>
						<Route
							path='*'
							element={
								<Navigation fetchFromApiToContext={fetchFromApiToContext} />
							}
						/>
					</Routes>
				</BrowserRouter>
			</ProductContext.Provider>
		</>
	);
}

export default App;
