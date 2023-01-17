import { useContext, useState } from 'react';
import { ProductContext } from '../productContext';
import ModalBox from './ModalBox';
import Modal from '@mui/material/Modal';
import './Table.css';

function Table() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalItemId, setModalItemId] = useState(0);

	const openModal = (id: number) => {
		setIsModalOpen(true);
		setModalItemId(id);
	};
	const closeModal = () => setIsModalOpen(false);

	const productContext = useContext(ProductContext);

	return (
		<>
			<Modal open={isModalOpen} onClose={closeModal}>
				<ModalBox
					product={productContext?.data.find(
						(modalItem) => modalItem.id === modalItemId
					)}
				/>
			</Modal>
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
							<tr
								key={item.id}
								style={{ backgroundColor: item.color }}
								onClick={() => openModal(item.id)}
							>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.year}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Table;
