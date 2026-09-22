import { useParams } from "react-router";
import useSearchDetails from "../../features/search/useSearchDetails";
import InfoResult from "../../widgest/ResultWidget/InfoResult";
import Poster from "../../widgest/ResultWidget/Poster";
import Staff from "../../widgest/ResultWidget/Staff";
import ContentWrapper from "../../shared/ui/ContentWrapper/ContentWrapper";
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {

    const { id } = useParams();

    if (id === undefined) return;

    const { data, isLoading, isError } = useSearchDetails(Number(id));

    const status =
        isLoading ? 'loading' :
            isError ? 'fail' :
                'success';

    console.log(data);

    return (
        <ContentWrapper status={status}>
            <div className={styles.wrapper}>
                <Poster url={data?.posterUrl} />
                <InfoResult data={data} />
                <Staff id={data?.kinopoiskId} />
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
        </ContentWrapper>
    )
}

export default DetailsPage