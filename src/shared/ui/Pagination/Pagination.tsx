import MuiPagination from '@mui/material/Pagination';
import { useCurrentPage, handleSetCurrentPage } from '@/app/stores/use-currentPage-store';


interface PaginationProps {
    count: number;
}

const Pagination = ({ count }: PaginationProps) => {

    const currentPage = useCurrentPage();
    const setCurrentPage = handleSetCurrentPage();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    return (
        <MuiPagination
            count={count}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            size="large"
            sx={{
                '& .MuiPaginationItem-root': {
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                },
            }}
        />
    )
}

export default Pagination