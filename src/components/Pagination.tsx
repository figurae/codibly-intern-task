import { useContext } from 'react';
import { ProductContext } from '../productContext';
import { Link } from 'react-router-dom';
import './Pagination.css';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface PaginationProps {
	currentPage: number;
}

function Pagination(props: PaginationProps) {
	const { currentPage } = props;
	const productContext = useContext(ProductContext);

	return (
		<MuiPagination
			page={currentPage}
			count={productContext?.totalPages}
			color='primary'
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
					slots={{ previous: ArrowBack, next: ArrowForward }}
					{...item}
				/>
			)}
		/>
	);
}

export default Pagination;
