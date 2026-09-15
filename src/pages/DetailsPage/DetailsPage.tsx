import { useParams } from "react-router";
import useSearchDetails from "../../features/search/useSearchDetails";
import Loader from "../../shared/ui/Loader/Loader";
import InfoResult from "../../widgest/ResultWidget/InfoResult";
import Poster from "../../widgest/ResultWidget/Poster";
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {

    const { id } = useParams();

    if (id === undefined) return;

    const { data, isLoading, isError } = useSearchDetails(Number(id));

    if (isLoading) {
        return (
            <Loader />
        )
    } else if (isError) {

        return (
            <h2>Что-то пошло не так🤔</h2>
        )

    } else {

        return (
            <div className={styles.wrapper}>
                <Poster data={data} />
                <InfoResult data={data} />
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

}

export default DetailsPage