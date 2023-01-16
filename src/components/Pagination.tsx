import { useContext } from 'react';
import { ProductContext } from '../productContext';
import './Pagination.css';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function Pagination() {
	const productContext = useContext(ProductContext);

	return (
		<MuiPagination
			count={productContext?.totalPages}
			color='primary'
			renderItem={(item) => (
				<PaginationItem
					slots={{ previous: ArrowBack, next: ArrowForward }}
					{...item}
				/>
			)}
		/>
	);
}

export default Pagination;
