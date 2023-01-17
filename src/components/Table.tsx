import { useContext } from 'react';
import { ProductContext } from '../productContext';
import './Table.css';

function Table() {
	const productContext = useContext(ProductContext);

	return (
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>year</th>
				</tr>
			</thead>
			<tbody>
				{productContext?.data.map((item) => {
					return (
						<tr key={item.id} style={{ backgroundColor: item.color }}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.year}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Table;
