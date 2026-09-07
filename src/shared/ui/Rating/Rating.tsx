import MuiRating from '@mui/material/Rating';

interface RatingProps {
    rating: number;
}

const Rating = ({ rating }: RatingProps) => {

    const value = Number((rating / 2).toFixed(1));

    return (
        <MuiRating
            defaultValue={value}
            precision={0.1}
            readOnly
            sx={{
                alignSelf: 'flex-end',
                '& .MuiRating-iconFilled svg': {
                    fill: '#ffb703 !important',
                },
            }}
        />
    )
}

export default Rating
