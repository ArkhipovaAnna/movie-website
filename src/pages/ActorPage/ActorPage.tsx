import { useParams } from "react-router";
import useSearchActor from "../../features/search/useSearchActor";
import ContentWrapper from "../../shared/ui/ContentWrapper/ContentWrapper";
import dateFormatted from "../../shared/helpers/dateFormatted";
import styles from './ActorPage.module.scss';

const ActorPage = () => {

    const { id } = useParams();

    if (id === undefined) return;

    const { data, isLoading, isError } = useSearchActor(Number(id));

    console.log(data);

    const status =
        isLoading ? 'loading' :
            isError ? 'fail' :
                'success';

    if (data === undefined) return;

    return (
        <ContentWrapper status={status}>
            <div className={styles.wrapper}>
                <div className={styles.flexbox}>
                    <img className={styles.photo} src={data.posterUrl} alt='Photo of the actor' />
                    <div className={styles.information}>
                        <p>Имя: {data.nameRu}</p>
                        <p>Карьера: {data.profession}</p>
                        <p>Возраст: {data.age}</p>
                        <p>Дата рождения: {dateFormatted(data.birthday)}</p>
                        <p>Место рождения: {data.birthplace}</p>
                        <p>Рост: {data.growth} см</p>
                        {data.death && <p>Дата смерти: {dateFormatted(data.death)}</p>}
                        {data.deathplace && <p>Место смерти: {data.deathplace}</p>}
                        {data.facts.length !== 0 && (
                            <div className={styles.facts}>
                                <h5>Факты об актере:</h5>
                                <ul>
                                    {data.facts.map(fact => (
                                        <li key={fact}>{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContentWrapper>
    )
}

export default ActorPage