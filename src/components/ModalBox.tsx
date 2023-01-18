import { forwardRef } from 'react';
import { ProductData } from '../product-context';
import Box from '@mui/material/Box';
import {
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableRow,
} from '@mui/material';
import './ModalBox.css';

interface ModalProps {
	product: ProductData | undefined;
}

// ref is required by parent Modal
const ModalBox = forwardRef((props: ModalProps, ref) => {
	const { product } = props;

	const rightBorderStyle = {
		borderRight: 5,
		borderRightColor: product?.color,
	};

	return (
		<Box
			ref={ref}
			tabIndex={-1}
			className='modal-box'
			sx={{ borderColor: product?.color, boxShadow: 12 }}
		>
			<Table
				sx={{
					// this removes all horizontal lines
					[`& .${tableCellClasses.root}`]: {
						borderBottom: 'none',
					},
				}}
			>
				<TableBody>
					<TableRow>
						<TableCell variant='head' sx={rightBorderStyle}>
							ID
						</TableCell>
						<TableCell>{product?.id}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant='head' sx={rightBorderStyle}>
							Name
						</TableCell>
						<TableCell sx={{ textTransform: 'capitalize' }}>
							{product?.name}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant='head' sx={rightBorderStyle}>
							Year
						</TableCell>
						<TableCell>{product?.year}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant='head' sx={rightBorderStyle}>
							Color
						</TableCell>
						<TableCell>{product?.color}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant='head' sx={rightBorderStyle}>
							Pantone Value
						</TableCell>
						<TableCell>{product?.pantoneValue}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
});

export default ModalBox;
