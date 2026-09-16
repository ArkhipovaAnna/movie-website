import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import type { Staff } from '../../../entities/movie/interfaces';

interface ActorCardProps {
    person: Staff;
}

const ActorCard = ({ person }: ActorCardProps) => {
    return (
        <Card
            sx={{
                width: 110,
                m: 1,
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={person.posterUrl}
                    alt={person.nameRu || person.nameEn}
                    sx={{
                        aspectRatio: '2 / 3',
                        objectFit: 'cover',
                    }}
                />
                <CardContent sx={{ p: 1 }}
                >
                    <p style={{
                        fontFamily: 'Tahoma',
                        color: 'white',
                        fontSize: '0.8rem',
                        textAlign: 'center',
                    }}>
                        {person.nameRu || person.nameEn}
                    </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ActorCard;
