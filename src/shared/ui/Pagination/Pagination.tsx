import MuiPagination from '@mui/material/Pagination';

interface PaginationProps {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({ count, page, onChange }: PaginationProps) => {
    return (
        <MuiPagination
            count={count}
            page={page}
            onChange={onChange}
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