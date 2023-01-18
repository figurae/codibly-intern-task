import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../product-context';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface PaginationProps {
	currentPage: number;
}

function Pagination(props: PaginationProps) {
	const { currentPage } = props;
	const productContext = useContext(ProductContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (productContext) {
			if (currentPage < 1 || currentPage > productContext.totalPages) {
				navigate('/');
			}
		}
	});

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
