import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ProductContext, apiUrl, ApiInterface } from './product-context';
import './App.css';
import { CssBaseline } from '@mui/material';
import humps from 'humps';

function App() {
	const [productContext, setProductContext] = useState<ApiInterface | null>(
		null
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fetchFromApiToContext = useCallback(
		async (page: string, itemsPerPage: string, idToFilter: string) => {
			const searchParams =
				idToFilter === ''
					? new URLSearchParams({
							per_page: itemsPerPage,
							page,
					  })
					: new URLSearchParams({ id: idToFilter });

			try {
				const response = await fetch(apiUrl + searchParams);

				if (response.status >= 400) {
					throw new Error(
						`Error ${response.status} received while fetching data!`
					);
				}

				const jsonData = await response.json();
				const camelizedJsonData = humps.camelizeKeys(jsonData) as ApiInterface;

				if (!Array.isArray(camelizedJsonData.data)) {
					camelizedJsonData.data = [camelizedJsonData.data];
				}

				setProductContext(camelizedJsonData);

				setErrorMessage(null);
			} catch (err) {
				let message = 'Unexpected error!';

				if (err instanceof Error) {
					message = err.message;
				}

				setErrorMessage(message);
			}
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
								<Navigation
									fetchFromApiToContext={fetchFromApiToContext}
									errorMessage={errorMessage}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ProductContext.Provider>
		</>
	);
}

export default App;
