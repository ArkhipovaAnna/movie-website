import { useAuthEmail, useAuthStatus } from '@/app/stores/use-auth-store';
import { getAuthDialogActions } from '@/app/stores/use-auth-dialog-store';
import useProfile from '@/features/auth/useProfile';
import useSignOut from '@/features/auth/useSignOut';
import Button from '@/shared/ui/Button/Button';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
    const status = useAuthStatus();
    const email = useAuthEmail();
    const { data: profile } = useProfile();
    const signOut = useSignOut();

    // Пока проверяем сохранённый вход, ничего не показываем, чтобы не мигала кнопка «Войти».
    if (status === 'loading') return null;

    if (status === 'guest') {
        return (
            <div className={styles.menu}>
                <Button type="button" variant="outlined" onClick={() => getAuthDialogActions().open('signIn')}>
                    Войти
                </Button>
                <Button type="button" variant="contained" onClick={() => getAuthDialogActions().open('signUp')}>
                    Регистрация
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.menu}>
            <span className={styles.nickname}>{profile?.nickname ?? email}</span>
            <Button type="button" variant="outlined" onClick={() => signOut.mutate()}>
                Выйти
            </Button>
        </div>
    );
};

export default UserMenu;
