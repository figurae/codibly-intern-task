import { useCallback, useState } from 'react';
import { ProductContext, apiUrl, ApiInterface } from './productContext';
import './App.css';
import { CssBaseline } from '@mui/material';
import humps from 'humps';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
	const [productContext, setProductContext] = useState<ApiInterface | null>(
		null
	);

	const fetchFromApiToContext = useCallback(
		async (page: string, itemsPerPage: string) => {
			const response = await fetch(
				apiUrl +
					new URLSearchParams({
						per_page: itemsPerPage,
						page,
					})
			);
			const jsonData = await response.json();
			const camelizedJsonData = humps.camelizeKeys(jsonData) as ApiInterface;

			console.log(`object`);
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
