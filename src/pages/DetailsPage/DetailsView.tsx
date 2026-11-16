import type { Details } from "@/entities/movie/interfaces";
import InfoResult from "@/widgest/ResultWidget/InfoResult";
import Poster from "@/widgest/ResultWidget/Poster";
import Staff from "@/widgest/ResultWidget/Staff";
import TrailerPlayer from "@/widgest/TrailerPlayer/TrailerPlayer";
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
            <TrailerPlayer key={data.kinopoiskId} filmId={data.kinopoiskId} />
        </div>
    )
}

export default DetailsView