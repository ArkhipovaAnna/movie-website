import type { Details } from "@/entities/movie/interfaces";
import InfoResult from "@/widgest/ResultWidget/InfoResult";
import Poster from "@/widgest/ResultWidget/Poster";
import Staff from "@/widgest/ResultWidget/Staff";
import styles from './DetailsView.module.scss'

interface DetailsViewprops {
    data: Details;
}

const DetailsView = ({ data }: DetailsViewprops) => {
    return (
        <div className={styles.wrapper}>
            <Poster url={data.posterUrl} />
            <InfoResult data={data} />
            <Staff id={data.kinopoiskId} />
            <div style={{
                gridColumn: '1 / -1',
                height: 100,
                borderWidth: 2,
                borderColor: 'orange',
                borderStyle: 'solid',
            }}>
                Trailer
            </div>
        </div>
    )
}

export default DetailsView