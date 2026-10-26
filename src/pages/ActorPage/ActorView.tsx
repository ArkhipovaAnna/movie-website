import type { Actor } from "@/entities/movie/interfaces";
import Filmography from "@/widgest/Filmography/Filmography";
import dateFormatted from "@/shared/helpers/dateFormatted";
import SafeImage from "@/shared/ui/SafeImage/SafeImage";
import { ACTOR_PLACEHOLDER_SRC } from "@/shared/config/images";
import styles from './ActorView.module.scss';

interface ActorViewProps {
    data: Actor;
}

const ActorView = ({ data }: ActorViewProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.flexbox}>
                <SafeImage className={styles.photo} src={data.posterUrl} fallback={ACTOR_PLACEHOLDER_SRC} alt='Photo of the actor' />
                <div>
                    <dl className={styles.descriptionList}>
                        <dt>Имя</dt>
                        <dd>{data.nameRu}</dd>
                        <dt>Карьера</dt>
                        <dd>{data.profession}</dd>
                        <dt>Возраст</dt>
                        <dd>{(data.age === 0 || data.age === null) ? 'Неизвестно' : data.age}</dd>
                        <dt>Дата рождения</dt>
                        <dd>{data.birthday === null ? 'Неизвестно' : dateFormatted(data.birthday)}</dd>
                        <dt>Место рождения</dt>
                        <dd>{data.birthplace === null ? 'Неизвестно' : data.birthplace}</dd>
                        <dt>Рост</dt>
                        <dd>{(data.growth === 0 || data.growth === null) ? 'Неизвестно' : `${data.growth} см`}</dd>
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
    );
};

export default ActorView;
