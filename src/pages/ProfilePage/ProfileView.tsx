import type { Profile } from '@/entities/user/schemas';
import FavoritesList from '@/widgest/FavoritesList/FavoritesList';
import formatDate from '@/shared/helpers/formatDate';
import styles from './ProfileView.module.scss';

interface ProfileViewProps {
    profile: Profile;
    previousVisit: string | null;
}

const ProfileView = ({ profile, previousVisit }: ProfileViewProps) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.nickname}>{profile.nickname}</h1>

            <dl className={styles.info}>
                <div className={styles.row}>
                    <dt>Дата регистрации</dt>
                    <dd>
                        <time dateTime={profile.createdAt}>{formatDate(profile.createdAt)}</time>
                    </dd>
                </div>
                <div className={styles.row}>
                    <dt>Последнее посещение</dt>
                    <dd>
                        {previousVisit
                            ? <time dateTime={previousVisit}>{formatDate(previousVisit)}</time>
                            : '—'}
                    </dd>
                </div>
            </dl>

            <section>
                <h2 className={styles.heading}>Избранное</h2>
                <FavoritesList />
            </section>
        </div>
    );
};

export default ProfileView;
