import { useContext } from 'react';
import { ProductContext } from '../productContext';
import './Table.css';

function Table() {
	const productContext = useContext(ProductContext);

	const itemNodes = [];

	if (productContext !== null) {
		for (const item of productContext.data) {
			const itemNode = (
				<tr key={item.id} style={{ backgroundColor: item.color }}>
					<td>{item.id}</td>
					<td>{item.name}</td>
					<td>{item.year}</td>
				</tr>
			);

			itemNodes.push(itemNode);
		}
	}

	return (
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>year</th>
				</tr>
			</thead>
			<tbody>{itemNodes}</tbody>
		</table>
	);
}

export default Table;
