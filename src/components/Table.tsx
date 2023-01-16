import { useContext } from 'react';
import { ProductContext } from '../productContext';
import './Table.css';

function Table() {
	const productContext = useContext(ProductContext);

	const itemNodes = [];

	if (productContext !== null) {
		for (const item of productContext.data) {
			const itemNode = <p>{item.name}</p>;

			itemNodes.push(itemNode);
		}
	}

	return <>{itemNodes}</>;
}

export default Table;
