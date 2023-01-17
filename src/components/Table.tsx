import { useContext, useState } from 'react';
import { ProductContext } from '../productContext';
import ModalBox from './ModalBox';
import Modal from '@mui/material/Modal';
import './Table.css';
import {
	Table as MuiTable,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { hexStringToHslArray } from '../helpers/color-conversion';
import { clamp } from '../helpers/math';

const TABLE_HEIGHT = 364;

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
			<TableContainer sx={{ height: TABLE_HEIGHT }}>
				<MuiTable
					sx={{
						[`& .${tableCellClasses.root}`]: {
							borderBottom: 'none',
						},
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Year</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productContext?.data.map((item) => {
							const hslArray = hexStringToHslArray(item.color);

							const offset = 10;
							const newH = clamp(hslArray[0] - offset, 0, 360);
							const newS = clamp(hslArray[1] - offset * 2, 0, 100);
							const newL = clamp(hslArray[2] + offset * 3, 0, 100);

							const gradientNode = `hsl(${newH}, ${newS}%, ${newL}%)`;

							return (
								<TableRow
									key={item.id}
									sx={{
										backgroundImage: `linear-gradient(to right, ${gradientNode}, ${item.color})`,
										textShadow: '0.5px 0.5px 2px white',
										cursor: 'pointer',
									}}
									onClick={() => openModal(item.id)}
								>
									<TableCell>{item.id}</TableCell>
									<TableCell
										sx={{
											textTransform: 'capitalize',
										}}
									>
										{item.name}
									</TableCell>
									<TableCell>{item.year}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</>
	);
}

export default Table;
