import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import type { Staff } from '@/entities/movie/interfaces';
import styles from './ActorCard.module.scss';

interface ActorCardProps {
    person: Staff;
}

const ActorCard = ({ person }: ActorCardProps) => {
    return (
        <Card className={styles.card} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={person.posterUrl}
                    alt={person.nameRu || person.nameEn}
                    className={styles.cardMedia} />
                <CardContent>
                    <p className={styles.name}>
                        {person.nameRu || person.nameEn}
                    </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ActorCard;
