import { useParams } from "react-router";
import useSearchActor from "../../features/search/useSearchActor";
import ContentWrapper from "../../shared/ui/ContentWrapper/ContentWrapper";
import Filmography from "../../shared/ui/Filmography/Filmography";
import dateFormatted from "../../shared/helpers/dateFormatted";
import styles from './ActorPage.module.scss';

const ActorPage = () => {

    const { id } = useParams();

    if (id === undefined) return;

    const { data, isLoading, isError } = useSearchActor(Number(id));

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
                    <div>
                        <dl className={styles.descriptionList}>
                            <dt>Имя</dt>
                            <dd>{data.nameRu}</dd>
                            <dt>Карьера</dt>
                            <dd>{data.profession}</dd>
                            <dt>Возраст</dt>
                            <dd>{data.age === 0 ? 'Неизвестно' : data.age}</dd>
                            <dt>Дата рождения</dt>
                            <dd>{data.birthday === null ? 'Неизвестно' : dateFormatted(data.birthday)}</dd>
                            <dt>Место рождения</dt>
                            <dd>{data.birthplace === null ? 'Неизвестно' : data.birthplace}</dd>
                            <dt>Рост</dt>
                            <dd>{data.growth === 0 ? 'Неизвестно' : `${data.growth} см`}</dd>
                            {data.death &&
                                <>
                                    <dt>Дата смерти</dt>
                                    <dd>{dateFormatted(data.death)}</dd>
                                </>
                            }
                            {data.deathplace &&
                                <>
                                    <dt>Место смерти</dt>
                                    <dd>{data.deathplace}</dd>
                                </>
                            }
                            {data.facts.length !== 0 && (
                                <>
                                    <dt>Факты об актере</dt>
                                    <div className={styles.facts}>
                                        {data.facts.map(fact => (
                                            <dd key={fact}>{fact}</dd>
                                        ))}
                                    </div>
                                </>
                            )}
                        </dl>
                    </div>
                </div>
                <Filmography films={data.films} />
            </div>
        </ContentWrapper>
    )
}

export default ActorPage

