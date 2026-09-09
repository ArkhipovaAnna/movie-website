import MuiRating from '@mui/material/Rating';

interface RatingProps {
    rating: number | string;
}

const Rating = ({ rating }: RatingProps) => {

    if (rating === 'null') {
        return <p>Нет оценок</p>;
    }

    const numberRating = Number(rating);
    const value = Number((numberRating / 2).toFixed(1));

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
